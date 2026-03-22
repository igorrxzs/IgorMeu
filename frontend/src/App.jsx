import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ShoppingCart, Plus, Minus, Star, Menu, X, Search, Heart } from 'lucide-react';
import AdminPanel from './components/AdminPanel';
import './App.css';
import './components/AdminPanel.css';

const API_BASE_URL = 'http://localhost:3000/api';

function App() {
  const [produtos, setProdutos] = useState([]);
  const [carrinho, setCarrinho] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [menuAberto, setMenuAberto] = useState(false);
  const [carrinhoAberto, setCarrinhoAberto] = useState(false);
  const [busca, setBusca] = useState('');
  const [favoritos, setFavoritos] = useState([]);

  useEffect(() => {
    carregarProdutos();
  }, []);

  const carregarProdutos = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_BASE_URL}/produtos`);
      setProdutos(response.data);
      setError(null);
    } catch (err) {
      setError('Erro ao carregar produtos. Verifique se o servidor está rodando.');
      console.error('Erro:', err);
    } finally {
      setLoading(false);
    }
  };

  const adicionarAoCarrinho = (produto) => {
    setCarrinho(prev => {
      const itemExistente = prev.find(item => item.id === produto.id);
      if (itemExistente) {
        return prev.map(item =>
          item.id === produto.id
            ? { ...item, quantidade: item.quantidade + 1 }
            : item
        );
      }
      return [...prev, { ...produto, quantidade: 1 }];
    });
  };

  const removerDoCarrinho = (produtoId) => {
    setCarrinho(prev => {
      const item = prev.find(item => item.id === produtoId);
      if (item && item.quantidade > 1) {
        return prev.map(item =>
          item.id === produtoId
            ? { ...item, quantidade: item.quantidade - 1 }
            : item
        );
      }
      return prev.filter(item => item.id !== produtoId);
    });
  };

  const toggleFavorito = (produtoId) => {
    setFavoritos(prev =>
      prev.includes(produtoId)
        ? prev.filter(id => id !== produtoId)
        : [...prev, produtoId]
    );
  };

  const handleProductAdded = (novoProduto) => {
    setProdutos(prev => [...prev, novoProduto]);
  };

  const produtosFiltrados = produtos.filter(produto =>
    produto.nome.toLowerCase().includes(busca.toLowerCase())
  );

  const totalCarrinho = carrinho.reduce((total, item) => total + (item.preco * item.quantidade), 0);
  const totalItens = carrinho.reduce((total, item) => total + item.quantidade, 0);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Carregando produtos...</p>
      </div>
    );
  }

  return (
    <div className="app">
      {/* Header */}
      <header className="header">
        <div className="container">
          <div className="header-content">
            <button 
              className="menu-toggle"
              onClick={() => setMenuAberto(!menuAberto)}
            >
              {menuAberto ? <X size={24} /> : <Menu size={24} />}
            </button>
            
            <div className="logo">
              <h1>🛍️ Loja Online</h1>
            </div>

            <div className="header-actions">
              <div className="search-container">
                <Search size={20} />
                <input
                  type="text"
                  placeholder="Buscar produtos..."
                  value={busca}
                  onChange={(e) => setBusca(e.target.value)}
                  className="search-input"
                />
              </div>
              
              <button 
                className="cart-button"
                onClick={() => setCarrinhoAberto(!carrinhoAberto)}
              >
                <ShoppingCart size={24} />
                {totalItens > 0 && <span className="cart-badge">{totalItens}</span>}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation Menu */}
      <nav className={`nav-menu ${menuAberto ? 'open' : ''}`}>
        <ul>
          <li><a href="#home">Início</a></li>
          <li><a href="#produtos">Produtos</a></li>
          <li><a href="#ofertas">Ofertas</a></li>
          <li><a href="#contato">Contato</a></li>
        </ul>
      </nav>

      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <div className="hero-content">
            <h2>Bem-vindo à Nossa Loja!</h2>
            <p>Descubra produtos incríveis com os melhores preços</p>
            <button className="cta-button" onClick={() => document.getElementById('produtos').scrollIntoView()}>
              Ver Produtos
            </button>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <main className="main-content">
        <div className="container">
          <section id="produtos" className="products-section">
            <h2>Nossos Produtos</h2>
            
            {error && (
              <div className="error-message">
                <p>{error}</p>
                <button onClick={carregarProdutos} className="retry-button">
                  Tentar Novamente
                </button>
              </div>
            )}

            <div className="products-grid">
              {produtosFiltrados.map(produto => (
                <div key={produto.id} className="product-card">
                  <div className="product-image">
                    <div className="product-placeholder">
                      📦
                    </div>
                    <button 
                      className={`favorite-button ${favoritos.includes(produto.id) ? 'active' : ''}`}
                      onClick={() => toggleFavorito(produto.id)}
                    >
                      <Heart size={20} />
                    </button>
                  </div>
                  
                  <div className="product-info">
                    <h3>{produto.nome}</h3>
                    <div className="product-rating">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={16} className="star" />
                      ))}
                      <span>(4.5)</span>
                    </div>
                    <p className="product-price">R$ {produto.preco.toFixed(2)}</p>
                    
                    <div className="product-actions">
                      <button 
                        className="add-to-cart"
                        onClick={() => adicionarAoCarrinho(produto)}
                      >
                        <Plus size={20} />
                        Adicionar
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {produtosFiltrados.length === 0 && !loading && (
              <div className="no-products">
                <p>Nenhum produto encontrado.</p>
              </div>
            )}
          </section>
        </div>
      </main>

      {/* Shopping Cart Sidebar */}
      <div className={`cart-sidebar ${carrinhoAberto ? 'open' : ''}`}>
        <div className="cart-header">
          <h3>Carrinho de Compras</h3>
          <button onClick={() => setCarrinhoAberto(false)}>
            <X size={24} />
          </button>
        </div>
        
        <div className="cart-content">
          {carrinho.length === 0 ? (
            <p className="empty-cart">Seu carrinho está vazio</p>
          ) : (
            <>
              <div className="cart-items">
                {carrinho.map(item => (
                  <div key={item.id} className="cart-item">
                    <div className="item-info">
                      <h4>{item.nome}</h4>
                      <p>R$ {item.preco.toFixed(2)}</p>
                    </div>
                    <div className="item-controls">
                      <button onClick={() => removerDoCarrinho(item.id)}>
                        <Minus size={16} />
                      </button>
                      <span>{item.quantidade}</span>
                      <button onClick={() => adicionarAoCarrinho(item)}>
                        <Plus size={16} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="cart-footer">
                <div className="cart-total">
                  <strong>Total: R$ {totalCarrinho.toFixed(2)}</strong>
                </div>
                <button className="checkout-button">
                  Finalizar Compra
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Overlay */}
      {(carrinhoAberto || menuAberto) && (
        <div 
          className="overlay"
          onClick={() => {
            setCarrinhoAberto(false);
            setMenuAberto(false);
          }}
        />
      )}

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-section">
              <h4>Contato</h4>
              <p>📞 (11) 94297-0298</p>
              <p>📧 contato@lojaonline.com</p>
            </div>
            <div className="footer-section">
              <h4>Redes Sociais</h4>
              <p>📱 @lojaonline</p>
              <p>📘 /lojaonline</p>
            </div>
            <div className="footer-section">
              <h4>Endereço</h4>
              <p>📍 Rua das Compras, 123</p>
              <p>São Paulo - SP</p>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; 2024 Loja Online. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>

      {/* Admin Panel */}
      <AdminPanel 
        onProductAdded={handleProductAdded}
        apiBaseUrl={API_BASE_URL}
      />
    </div>
  );
}

export default App;