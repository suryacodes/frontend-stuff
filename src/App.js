import { useEffect, useState } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:4000", {
  reconnection: true,
  reconnectionAttempts: 10,
  reconnectionDelay: 5000,
});

const App = () => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const user1 = localStorage.getItem("user1");

    // Register user when the component mounts
    if (user1) {
      socket.emit("register", user1);
    }

    // Listen for incoming messages
    socket.on("receiveMessage", (data) => {
      setMessages((prev) => [...prev, `${data.from}: ${data.message}`]);
    });

    // Cleanup event listener on unmount
    return () => {
      socket.off("receiveMessage");
    };
  }, []);

  // Send message function
  const sendMessage = () => {
    const user1 = localStorage.getItem("user1");
    const user2 = localStorage.getItem("user2");

    if (!message.trim() || !user1 || !user2) return;

    socket.emit("sendMessage", { userId: user1, toUserId: user2, message });
    setMessage(""); // Clear input field
  };

  return (
    <div>
      <h2>Socket.IO Chat - {localStorage.getItem("user1")}</h2>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type a message..."
      />
      <button onClick={sendMessage}>Send</button>
      <ul>
        {messages.map((msg, index) => (
          <li key={index}>{msg}</li>
        ))}
      </ul>
    </div>
  );
};

export default App;
