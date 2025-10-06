import React, { useEffect, useRef, useState } from 'react'

export default function Chat() {
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'Olá! Sou seu agente de IA. Como posso ajudar?' }
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const endRef = useRef(null)

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const send = async (e) => {
    e.preventDefault()
    const text = input.trim()
    if (!text) return

    const next = [...messages, { role: 'user', content: text }]
    setMessages(next)
    setInput('')
    setLoading(true)

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: next })
      })
      if (!res.ok) throw new Error('Falha no chat')
      const data = await res.json()
      setMessages([...next, data.reply])
    } catch (err) {
      setMessages([...next, { role: 'assistant', content: 'Desculpe, ocorreu um erro.' }])
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="chat">
      <div className="messages">
        {messages.map((m, i) => (
          <div key={i} className={`msg ${m.role}`}>
            <div className="bubble">{m.content}</div>
          </div>
        ))}
        <div ref={endRef} />
      </div>
      <form className="composer" onSubmit={send}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Pergunte sobre produtos ou peça sugestões"
        />
        <button disabled={loading}>{loading ? '...' : 'Enviar'}</button>
      </form>
    </div>
  )
}
