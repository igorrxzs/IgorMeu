import React, { useState } from 'react'
import ProductList from './components/ProductList.jsx'
import Chat from './components/Chat.jsx'

export default function App() {
  const [showChat, setShowChat] = useState(true)
  return (
    <div className="container">
      <header className="header">
        <h1>Loja com Agente de IA</h1>
        <button className="toggle" onClick={() => setShowChat(!showChat)}>
          {showChat ? 'Ocultar Chat' : 'Mostrar Chat'}
        </button>
      </header>
      <main className="grid">
        <section className="panel">
          <h2>Produtos</h2>
          <ProductList />
        </section>
        <section className="panel">
          <h2>Assistente</h2>
          {showChat ? <Chat /> : <div className="muted">Chat oculto</div>}
        </section>
      </main>
    </div>
  )
}
