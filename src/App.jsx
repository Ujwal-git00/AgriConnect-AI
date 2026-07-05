import { useEffect, useState } from "react";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import About from "./pages/About.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

function getRoute() {
  return window.location.hash.replace("#", "") || "/";
}

export default function App() {
  const [route, setRoute] = useState(getRoute());
  const [session, setSession] = useState(() => {
    const token = localStorage.getItem("agriconnect_token");
    const user = localStorage.getItem("agriconnect_user");
    return token && user ? { token, user: JSON.parse(user) } : null;
  });

  useEffect(() => {
    const onHashChange = () => setRoute(getRoute());
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  function handleLogin(payload) {
    localStorage.setItem("agriconnect_token", payload.token);
    localStorage.setItem("agriconnect_user", JSON.stringify(payload.user));
    setSession(payload);
    window.location.hash = "/dashboard";
  }

  function handleLogout() {
    localStorage.removeItem("agriconnect_token");
    localStorage.removeItem("agriconnect_user");
    setSession(null);
    window.location.hash = "/";
  }

  let page = <Home />;
  if (route === "/about") page = <About />;
  if (route === "/login") page = <Login apiUrl={API_URL} onLogin={handleLogin} />;
  if (route === "/dashboard") {
    page = session ? (
      <Dashboard apiUrl={API_URL} token={session.token} />
    ) : (
      <Login apiUrl={API_URL} onLogin={handleLogin} notice="Log in to continue to your dashboard." />
    );
  }

  return (
    <div className="app-shell">
      <Navbar user={session?.user} onLogout={handleLogout} />
      <main>{page}</main>
      <Footer />
    </div>
  );
}
