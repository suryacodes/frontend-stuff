const baseProducts = [
  {
    name: "Laptop",
    price: 1000,
    category: "Electronics",
  },
  {
    name: "Smartphone",
    price: 700,
    category: "Electronics",
  },
  {
    name: "Shoes",
    price: 50,
    category: "Fashion",
  },
  {
    name: "Watch",
    price: 150,
    category: "Fashion",
  },
  {
    name: "Backpack",
    price: 80,
    category: "Accessories",
  },
];

const products = Array.from({ length: 40 }, (_, index) => {
  const base = baseProducts[index % baseProducts.length];
  const name = `${base.name} ${Math.floor(index / 5) + 1}`;
  return {
    id: index + 1,
    name,
    price: base.price,
    category: base.category,
    description:
      "A product description is a piece of writing that tells customers what a product is, its features, and why they should buy it.",
    image:
      "https://assets.tendercuts.in/product/R/M/ae6849a6-0699-4617-a963-382e93cf8940.webp",
  };
});

export default products;
