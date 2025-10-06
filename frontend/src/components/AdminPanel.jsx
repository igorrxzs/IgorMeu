import React, { useState } from 'react';
import { Plus, X, Save } from 'lucide-react';
import axios from 'axios';

const AdminPanel = ({ onProductAdded, apiBaseUrl }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    nome: '',
    preco: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await axios.post(`${apiBaseUrl}/produtos`, {
        nome: formData.nome,
        preco: parseFloat(formData.preco)
      });

      onProductAdded(response.data);
      setFormData({ nome: '', preco: '' });
      setIsOpen(false);
    } catch (err) {
      setError('Erro ao adicionar produto. Verifique os dados.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <>
      <button 
        className="admin-toggle"
        onClick={() => setIsOpen(true)}
        title="Adicionar Produto"
      >
        <Plus size={20} />
        Admin
      </button>

      {isOpen && (
        <div className="admin-modal-overlay">
          <div className="admin-modal">
            <div className="admin-modal-header">
              <h3>Adicionar Novo Produto</h3>
              <button onClick={() => setIsOpen(false)}>
                <X size={24} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="admin-form">
              {error && (
                <div className="admin-error">
                  {error}
                </div>
              )}

              <div className="form-group">
                <label htmlFor="nome">Nome do Produto</label>
                <input
                  type="text"
                  id="nome"
                  name="nome"
                  value={formData.nome}
                  onChange={handleChange}
                  required
                  placeholder="Ex: Smartphone Premium"
                />
              </div>

              <div className="form-group">
                <label htmlFor="preco">Preço (R$)</label>
                <input
                  type="number"
                  id="preco"
                  name="preco"
                  value={formData.preco}
                  onChange={handleChange}
                  step="0.01"
                  min="0"
                  required
                  placeholder="Ex: 299.99"
                />
              </div>

              <div className="admin-actions">
                <button 
                  type="button" 
                  onClick={() => setIsOpen(false)}
                  className="cancel-button"
                >
                  Cancelar
                </button>
                <button 
                  type="submit" 
                  disabled={loading}
                  className="save-button"
                >
                  <Save size={16} />
                  {loading ? 'Salvando...' : 'Salvar'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default AdminPanel;