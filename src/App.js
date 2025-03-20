import { useEffect, useState } from "react";

const App = () => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const eventSource = new EventSource("http://localhost:4000/events");
    eventSource.onmessage = (event) => {
      setMessages((prev) => [...prev, JSON.parse(event.data).message]);
    };

    return () => eventSource.close(); // Cleanup on unmount
  }, []);

  return (
    <div>
      <h2>SSE Messages</h2>
      <ul>
        {messages.map((msg, index) => (
          <li key={index}>{msg}</li>
        ))}
      </ul>
    </div>
  );
};

export default App;
