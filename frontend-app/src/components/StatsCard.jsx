import './StatsCard.css'

function StatsCard({ title, value, icon, color, change }) {
  return (
    <div className="stats-card">
      <div className="stats-icon" style={{ backgroundColor: color }}>
        {icon}
      </div>
      <div className="stats-content">
        <h3 className="stats-value">{value}</h3>
        <p className="stats-title">{title}</p>
        <span className={`stats-change ${change.startsWith('+') ? 'positive' : 'negative'}`}>
          {change}
        </span>
      </div>
    </div>
  )
}

export default StatsCard