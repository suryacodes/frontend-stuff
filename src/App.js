import { useState, useEffect } from "react";

const LongPolling = () => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    let isMounted = true;

    const pollServer = async () => {
      try {
        const response = await fetch("http://localhost:4000/poll/?user_id=1");
        if (!response.ok) throw new Error("Server error");

        const data = await response.json();
        if (isMounted) {
          setMessages((prev) => [...prev, data.message]); // Fix: Use single message
          pollServer(); // Recursive polling
        }
      } catch (error) {
        console.error("Polling error:", error);
        if (isMounted) setTimeout(pollServer, 3000); // Retry after 3s
      }
    };

    pollServer();

    return () => {
      isMounted = false; // Cleanup to prevent memory leaks
    };
  }, []);

  const sendMessage = async () => {
    try {
      const response = await fetch("http://localhost:4000/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: "Hello from client!", user_id: 1 }),
      });

      if (!response.ok) throw new Error("Failed to send message");
    } catch (error) {
      console.error("Send message error:", error);
    }
  };

  return (
    <div>
      <h2>Long Polling Chat</h2>
      <button onClick={sendMessage}>Send Message</button>
      <ul>
        {messages.map((msg, index) => (
          <li key={index}>{msg}</li>
        ))}
      </ul>
    </div>
  );
};

export default LongPolling;
