const express = require("express");
const path = require("path");

const app = express();
const PORT = 4000;

// Middleware to parse JSON request bodies
app.use(express.json({ type: ["application/csp-report", "application/json"] }));

// Set Content Security Policy (CSP) headers
app.use((req, res, next) => {
  res.setHeader(
    "Content-Security-Policy",
    "default-src 'self';" +
      "frame-src https://pp-demo-trusted-site.glitch.me;" +
      `script-src 'self' 'nonce-randomkey';` +
      "report-uri /csp-violation-report-endpoint;"
  );
  next();
});

// Serve static files from the React build folder
app.use(express.static(path.join(__dirname, "build")));

// CSP violation report endpoint
app.post("/csp-violation-report-endpoint", (req, res) => {
  // Handle the CSP violation report here
  console.log("CSP Violation Report:", req.body);
  res.status(204).end(); // Respond with a 204 status (No Content)
});

// Catch-all route to serve React's index.html (for React Router)
app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

// Start the Node.js server
app.listen(PORT, () => {
  console.log(`🚀 Server started at: http://localhost:${PORT}`);
});
