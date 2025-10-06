import './Dashboard.css'
import Card from './Card'
import StatsCard from './StatsCard'
import { useDashboardData } from '../hooks/useDashboardData'

function Dashboard() {
  const { stats, recentActivity, isLoading, error, refreshData } = useDashboardData()
  const [searchTerm, setSearchTerm] = useState('')
  const [filterType, setFilterType] = useState('all')

  // Filtrar atividades baseado na busca e tipo
  const filteredActivities = recentActivity.filter(activity => {
    const matchesSearch = activity.text.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = filterType === 'all' || activity.type === filterType
    return matchesSearch && matchesType
  })

  if (error) {
    return (
      <div className="dashboard">
        <div className="error-state">
          <p>❌ {error}</p>
          <button onClick={refreshData} className="retry-button">
            Tentar Novamente
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h2>Dashboard</h2>
        <p>Bem-vindo ao seu painel de controle</p>

        <div className="dashboard-controls">
          <button
            onClick={refreshData}
            disabled={isLoading}
            className="refresh-button"
          >
            {isLoading ? '🔄 Atualizando...' : '🔄 Atualizar Dados'}
          </button>
        </div>
      </div>

      <div className="stats-grid">
        <StatsCard
          title="Usuários"
          value={stats.usuarios.toLocaleString()}
          icon="👥"
          color="#3b82f6"
          change="+12%"
        />
        <StatsCard
          title="Vendas"
          value={stats.vendas}
          icon="🛒"
          color="#10b981"
          change="+8%"
        />
        <StatsCard
          title="Receitas"
          value={`R$ ${stats.receitas.toLocaleString()}`}
          icon="💰"
          color="#f59e0b"
          change="+15%"
        />
        <StatsCard
          title="Tarefas"
          value={stats.tarefas}
          icon="✅"
          color="#8b5cf6"
          change="-3%"
        />
      </div>

      <div className="dashboard-content">
        <Card title="Atividade Recente">
          <div className="activity-controls">
            <input
              type="text"
              placeholder="Buscar atividades..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="filter-select"
            >
              <option value="all">Todos os tipos</option>
              <option value="success">Sucesso</option>
              <option value="info">Informação</option>
              <option value="warning">Aviso</option>
            </select>
          </div>

          <div className="activity-list">
            {isLoading ? (
              <p className="loading">Carregando atividades...</p>
            ) : filteredActivities.length === 0 ? (
              <p className="no-results">Nenhuma atividade encontrada</p>
            ) : (
              filteredActivities.map(activity => (
                <div key={activity.id} className={`activity-item ${activity.type}`}>
                  <span className="activity-text">{activity.text}</span>
                  <span className="activity-time">{activity.time}</span>
                </div>
              ))
            )}
          </div>
        </Card>

        <Card title="Gráfico de Performance">
          <div className="chart-placeholder">
            <div className="chart-bars">
              {[65, 80, 45, 90, 70, 85, 60].map((height, index) => (
                <div key={index} className="chart-bar" style={{ height: `${height}%` }}>
                  <span className="bar-value">{height}%</span>
                </div>
              ))}
            </div>
            <p className="chart-label">Performance dos últimos 7 dias</p>
          </div>
        </Card>
      </div>
    </div>
  )
}

export default Dashboard