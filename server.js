const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());

app.get("/events", (req, res) => {
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");

  setInterval(() => {
    res.write(`data: ${JSON.stringify({ message: "Hello from server!" })}\n\n`);
  }, 2000);
});

app.listen(4000, () => console.log("SSE server running on port 4000"));
