import { getAllProduct, clearProducts } from "./indexDB";

/* eslint-disable no-restricted-globals */
onmessage = async (event) => {
  try {
    const products = await getAllProduct();

    if (products.length === 0) {
      postMessage("No products to sync.");
      return;
    }

    const response = await fetch("http://localhost:4000/api/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ product: products }),
    });

    if (response.ok) {
      clearProducts();
      postMessage("Products synced with server successfully!");
    } else {
      const error = await response.json();
      postMessage(`Failed to sync products: ${error.message}`);
    }
  } catch (error) {
    postMessage(`Sync failed: ${error.message}`);
  }
};
