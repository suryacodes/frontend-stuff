import React, { useState, useEffect } from "react";

function MyForm() {
  const [csrfToken, setCsrfToken] = useState("");
  const [name, setName] = useState("");

  // Fetch the CSRF token when the component mounts
  useEffect(() => {
    fetch("http://localhost:3001/csrf-token", { credentials: "include" })
      .then((response) => response.json())
      .then((data) => setCsrfToken(data.csrfToken))
      .catch((error) => console.error("Error fetching CSRF token:", error));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch("http://localhost:3001/submit", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, _csrf: csrfToken }),
    })
      .then((response) => response.text())
      .then((data) => alert(data))
      .catch((error) => console.error("Error submitting form:", error));
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Hidden field to include the CSRF token */}
      <input type="hidden" name="_csrf" value={csrfToken} />
      <label>
        Name:
        <input
          type="text"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </label>
      <button type="submit">Submit</button>
    </form>
  );
}

export default MyForm;
