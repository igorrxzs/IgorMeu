import React, { useEffect, useState } from 'react'

export default function ProductList() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch('/api/produtos')
        if (!res.ok) throw new Error('Falha ao carregar produtos')
        const data = await res.json()
        setProducts(data)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    fetchProducts()
  }, [])

  if (loading) return <div className="muted">Carregando produtos...</div>
  if (error) return <div className="error">{error}</div>

  return (
    <ul className="list">
      {products.map((p) => (
        <li key={p.id} className="card">
          <div className="title">{p.nome}</div>
          <div className="price">R$ {p.preco.toFixed(2)}</div>
        </li>
      ))}
    </ul>
  )
}
