import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

function Home() {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">
        Home Page {new Date().getFullYear()}
      </h1>
      <p>Welcome to the home page!</p>
      <iframe
        src="https://pp-demo-trusted-site.glitch.me"
        allow="geolocation"
      ></iframe>
    </div>
  );
}

function Profile() {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Profile Page</h1>
      <p>This is your profile page.</p>
    </div>
  );
}

function App() {
  return (
    <Router>
      <div className="p-4">
        <nav className="mb-4">
          <Link to="/" className="mr-4 text-blue-500 hover:underline">
            Home
          </Link>
          <Link to="/profile" className="text-blue-500 hover:underline">
            Profile
          </Link>
        </nav>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
