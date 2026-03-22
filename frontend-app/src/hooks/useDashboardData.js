import { useState, useEffect } from 'react'

// Hook personalizado para gerenciar dados do dashboard
export function useDashboardData() {
  const [stats, setStats] = useState({
    usuarios: 0,
    vendas: 0,
    receitas: 0,
    tarefas: 0
  })

  const [recentActivity, setRecentActivity] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true)
        setError(null)

        // Simulando chamada para API
        await new Promise(resolve => setTimeout(resolve, 1000))

        // Dados mockados
        const mockStats = {
          usuarios: 1247,
          vendas: 89,
          receitas: 45680,
          tarefas: 23
        }

        const mockActivities = [
          { id: 1, text: 'Nova venda realizada', time: '2 minutos atrás', type: 'success' },
          { id: 2, text: 'Usuário registrado', time: '5 minutos atrás', type: 'info' },
          { id: 3, text: 'Tarefa concluída', time: '10 minutos atrás', type: 'warning' },
          { id: 4, text: 'Pagamento recebido', time: '15 minutos atrás', type: 'success' }
        ]

        setStats(mockStats)
        setRecentActivity(mockActivities)
      } catch (err) {
        setError('Erro ao carregar dados do dashboard')
        console.error('Erro:', err)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [])

  const refreshData = async () => {
    setIsLoading(true)
    // Simular refresh
    await new Promise(resolve => setTimeout(resolve, 500))

    // Atualizar com novos dados
    setStats(prev => ({
      ...prev,
      vendas: prev.vendas + Math.floor(Math.random() * 5),
      receitas: prev.receitas + Math.floor(Math.random() * 1000)
    }))

    setIsLoading(false)
  }

  return {
    stats,
    recentActivity,
    isLoading,
    error,
    refreshData
  }
}