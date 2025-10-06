import { useState, useEffect } from 'react'
import './App.css'
import Header from './components/Header'
import Dashboard from './components/Dashboard'
import Footer from './components/Footer'

function App() {
  const [darkMode, setDarkMode] = useState(false)
  const [user, setUser] = useState({ name: 'Usuário', avatar: '👤' })

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark-mode')
    } else {
      document.body.classList.remove('dark-mode')
    }
  }, [darkMode])

  return (
    <div className="app">
      <Header
        user={user}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
      />

      <main className="main-content">
        <Dashboard />
      </main>

      <Footer />
    </div>
  )
}

export default App