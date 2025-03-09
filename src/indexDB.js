import Dexie from "dexie";

const dexie = new Dexie("Product");

dexie.version(1).stores({
  product: "&product_id, name, quantity",
});

const addProduct = async (product) => {
  try {
    await dexie.product.add(product);
    console.log("Product added:", product);
  } catch (error) {
    console.error("Failed to add product:", error);
  }
};

const getProduct = async (productId) => {
  return await dexie.product.get(productId);
};

const removeProduct = async (productId) => {
  await dexie.product.delete(productId);
  console.log(`Product with ID ${productId} deleted.`);
};

const clearProducts = async () => {
  await dexie.product.clear();
  console.log(`Products deleted.`);
};

const updateProduct = async (productId, data) => {
  if (productId) {
    await dexie.product.update(productId, data);
    console.log(`Product ID ${productId} quantity updated`);
  } else {
    console.warn(`Product with ID ${productId} not found.`);
  }
};

const getAllProduct = async () => {
  return await dexie.product.toArray();
};

export {
  getProduct,
  getAllProduct,
  removeProduct,
  updateProduct,
  addProduct,
  clearProducts,
};
