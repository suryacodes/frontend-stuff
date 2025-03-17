const express = require("express");
const cors = require("cors");
const port = 4000;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors({ origin: "http://localhost:3000", credentials: true }));

let clients = [];

app.get("/poll", (req, res) => {
  const userId = req.query.user_id;
  if (!userId) {
    return res.status(400).json({ error: "user_id is required" });
  }

  clients.push({ userId: Number(userId), client: res });

  res.on("close", () => {
    clients = clients.filter((client) => client.userId !== userId);
  });
});

app.post("/send", (req, res) => {
  const { user_id, message } = req.body;
  if (!user_id || !message) {
    return res.status(400).json({ error: "user_id and message are required" });
  }

  clients = clients.filter((client) => {
    if (client.userId === user_id) {
      client.client.status(200).json({ message });
      return false; // Remove the client after responding
    }
    return true;
  });

  res.sendStatus(200);
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
