const express = require("express");
const csrf = require("csrf");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const path = require("path");

const app = express();
const tokens = new csrf();

app.use(cookieParser());
app.use(express.json({ type: ["application/csp-report", "application/json"] }));
app.use(express.urlencoded({ extended: true }));

// CORS configuration: note that when using credentials, you should specify an exact origin instead of "*"
app.use(cors({ origin: "http://localhost:3000", credentials: true }));

// --- API Endpoints ---

// Endpoint to generate and send a CSRF token
app.get("/csrf-token", (req, res) => {
  // Generate a new secret and token
  const secret = tokens.secretSync();
  const token = tokens.create(secret);
  // Store the secret in an HTTP-only cookie
  res.cookie("csrfSecret", secret, { httpOnly: true });
  res.json({ csrfToken: token });
});

// Endpoint to handle form submission
app.post("/submit", (req, res) => {
  const secret = req.cookies.csrfSecret;
  const token = req.body._csrf;

  if (!secret) {
    return res.status(403).send("Missing CSRF secret.");
  }

  // Verify the token using the secret from the cookie
  if (tokens.verify(secret, token)) {
    // Token is valid; process the form data here
    res.send("Form submission successful!");
  } else {
    res.status(403).send("Invalid CSRF token.");
  }
});

// --- Serve React Build ---

// Serve static files from the React build folder
app.use(express.static(path.join(__dirname, "build")));

// Catch-all route to serve index.html for any non-API GET request (ensure this is placed after API routes)
app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

app.listen(3001, () => {
  console.log("Express server listening on port 3001");
});
