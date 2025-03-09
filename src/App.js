import React, { useState, useEffect } from "react";
import { addProduct, getAllProduct, updateProduct } from "./indexDB";
const worker = new Worker(new URL("worker.js", import.meta.url), {
  type: "module",
});

const products = Array.from({ length: 20 }, (_, index) => ({
  product_id: index + 1,
  name: `Product ${index + 1}`,
  quantity: Math.floor(Math.random() * 100) + 1,
}));

const ProductGrid = () => {
  const [cart, setCart] = useState([]);
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  // Load offline cart from IndexedDB
  useEffect(() => {
    if (!isOnline) {
      getAllProduct().then((offlineCart) => setCart(offlineCart));
    }
    if (isOnline) {
      worker.postMessage("sync with server");
    }
    try {
      worker.onmessage = function (event) {
        console.log("Main thread received:", event.data);
      };
    } catch (err) {
      console.log("worker", err);
    }
  }, [isOnline]);

  const addToCart = async (product) => {
    const existingItem = cart.find(
      (item) => item.product_id === product.product_id
    );

    if (existingItem) {
      const updatedCart = cart.map((item) =>
        item.product_id === product.product_id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
      setCart(updatedCart);
      if (!isOnline)
        await updateProduct(existingItem.product_id, {
          quantity: existingItem.quantity + 1,
        });
    } else {
      const newProduct = { ...product, quantity: 1 };
      setCart([...cart, newProduct]);
      if (!isOnline) await addProduct(newProduct);
    }
  };

  return (
    <div className="container py-4">
      <h1 className="h2 mb-4">Product Grid</h1>
      <div className="row g-4">
        {products.map((product) => (
          <div key={product.product_id} className="col-md-4">
            <div className="card">
              <div className="card-body">
                <h2 className="h5">{product.name}</h2>
                <p>Stock: {product.quantity}</p>
                <button
                  className="btn btn-primary mt-2"
                  onClick={() => addToCart(product)}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <h2 className="h3 mt-5">Cart ({isOnline ? "Online" : "Offline"})</h2>
      <ul className="list-group mt-3">
        {cart.map((item) => (
          <li key={item.product_id} className="list-group-item">
            {item.name} - Quantity: {item.quantity}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductGrid;

// Let me know if you want any improvements, like cart item removal or syncing offline data when back online! 🚀
