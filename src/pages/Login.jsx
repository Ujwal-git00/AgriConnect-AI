import { useState } from "react";

export default function Login({ apiUrl, onLogin, notice }) {
  const [mode, setMode] = useState("login");
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const isSignup = mode === "signup";

  function switchMode(nextMode) {
    setMode(nextMode);
    setError("");
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      const endpoint = isSignup ? "/api/signup" : "/api/login";
      const body = isSignup ? { name, email, password, location } : { email, password };

      const response = await fetch(`${apiUrl}${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || (isSignup ? "Could not create account" : "Login failed"));
      }

      onLogin(data);
    } catch (err) {
      if (err instanceof TypeError) {
        setError(
          `Can't reach the server at ${apiUrl}. Make sure the backend is running (npm run backend) and try again.`
        );
      } else {
        setError(err.message);
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="login-page">
      <form className="login-card" onSubmit={handleSubmit}>
        <p className="eyebrow">{isSignup ? "Join AgriConnect AI" : "Welcome back"}</p>
        <h1>{isSignup ? "Create your account" : "Login to your account"}</h1>
        <p className="login-subtitle">
          {isSignup
            ? "Set up your farmer profile to unlock the dashboard."
            : "Enter your details to access your farmer dashboard."}
        </p>

        <div className="auth-toggle" role="tablist" aria-label="Login or create account">
          <button
            type="button"
            className={!isSignup ? "active" : ""}
            onClick={() => switchMode("login")}
            role="tab"
            aria-selected={!isSignup}
          >
            Login
          </button>
          <button
            type="button"
            className={isSignup ? "active" : ""}
            onClick={() => switchMode("signup")}
            role="tab"
            aria-selected={isSignup}
          >
            Create Account
          </button>
        </div>

        {notice && <p className="notice">{notice}</p>}

        {isSignup && (
          <label>
            Full name
            <input
              value={name}
              onChange={(event) => setName(event.target.value)}
              type="text"
              placeholder="e.g. Anita Rao"
              required
            />
          </label>
        )}

        <label>
          Email
          <input
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            type="email"
            placeholder="you@example.com"
            required
          />
        </label>

        {isSignup && (
          <label>
            Farm location
            <input
              value={location}
              onChange={(event) => setLocation(event.target.value)}
              type="text"
              placeholder="e.g. Mysuru, Karnataka"
            />
          </label>
        )}

        <label>
          Password
          <input
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            type="password"
            placeholder={isSignup ? "At least 4 characters" : "Your password"}
            required
          />
        </label>

        {error && <p className="error">{error}</p>}

        <button className="primary-button full-width" type="submit" disabled={loading}>
          {loading ? (isSignup ? "Creating account..." : "Logging in...") : isSignup ? "Create Account" : "Login"}
        </button>

        <p className="muted auth-switch">
          {isSignup ? (
            <>
              Already have an account?{" "}
              <button type="button" className="link-button" onClick={() => switchMode("login")}>
                Log in
              </button>
            </>
          ) : (
            <>
              New to AgriConnect AI?{" "}
              <button type="button" className="link-button" onClick={() => switchMode("signup")}>
                Create an account
              </button>
            </>
          )}
        </p>
      </form>
    </section>
  );
}
