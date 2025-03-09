const express = require("express");
const cors = require("cors");
const port = 4000;
const path = require("path");

const app = express();

const products = Array.from({ length: 20 }, (_, index) => ({
  product_id: index + 1,
  name: `Product ${index + 1}`,
  quantity: Math.floor(Math.random() * 100) + 1,
}));

app.use(express.json({ type: ["application/json"] }));
app.use(express.urlencoded({ extended: true }));

app.use(cors({ origin: "http://localhost:3000", credentials: true }));

// Serve static files from the React build folder
app.use(express.static(path.join(__dirname, "build")));

app.get("/api/products", (req, res) => {
  res.json(products);
});

app.post("/api/products", (req, res) => {
  console.log(req.body);
  res.sendStatus(200);
});

// Catch-all route to serve React's index.html (for React Router)
app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
