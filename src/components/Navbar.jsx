export default function Navbar({ user, onLogout }) {
  return (
    <header className="navbar">
      <a className="brand" href="#/">
        <span className="brand-mark">A</span>
        <span>AgriConnect AI</span>
      </a>

      <nav className="nav-links" aria-label="Primary navigation">
        <a href="#/">Home</a>
        <a href="#/about">About</a>
        <a href="#/dashboard">Dashboard</a>
      </nav>

      <div className="nav-actions">
        {user ? (
          <>
            <span className="user-chip">{user.name}</span>
            <button className="ghost-button" type="button" onClick={onLogout}>
              Logout
            </button>
          </>
        ) : (
          <a className="primary-button" href="#/login">
            Login
          </a>
        )}
      </div>
    </header>
  );
}
