import './Header.css'

function Header({ user, darkMode, setDarkMode }) {
  return (
    <header className="header">
      <div className="header-content">
        <div className="logo">
          <h1>🚀 Minha Aplicação</h1>
        </div>

        <div className="header-actions">
          <div className="user-info">
            <span className="user-avatar">{user.avatar}</span>
            <span className="user-name">{user.name}</span>
          </div>

          <button
            className="theme-toggle"
            onClick={() => setDarkMode(!darkMode)}
            aria-label={darkMode ? 'Ativar modo claro' : 'Ativar modo escuro'}
          >
            {darkMode ? '☀️' : '🌙'}
          </button>
        </div>
      </div>
    </header>
  )
}

export default Header