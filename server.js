const express = require("express");
const helmet = require("helmet");
const path = require("path");

const app = express();
const PORT = 4000;

app.use((req, res, next) => {
  res.setHeader(
    "Permissions-Policy",
    'geolocation=(self "https://pp-demo-trusted-site.glitch.me"), camera=(), microphone=()'
  );
  next();
});

// Serve static files from the React build folder
app.use(express.static(path.join(__dirname, "build")));

// Catch-all route to serve React's index.html (for React Router)
app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

// Start the Node.js server
app.listen(PORT, () => {
  console.log(`🚀 Server started at: http://localhost:${PORT}`);
});
