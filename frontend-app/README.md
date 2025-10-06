# 🚀 Minha Aplicação Frontend

Uma aplicação React moderna desenvolvida com Vite, apresentando um dashboard interativo com tema escuro/claro e funcionalidades avançadas.

## ✨ Características

- **Dashboard Responsivo**: Interface moderna e adaptável para diferentes dispositivos
- **Tema Escuro/Claro**: Toggle para alternar entre modos de visualização
- **Cards de Estatísticas**: Exibição visual de métricas importantes
- **Lista de Atividades**: Timeline de atividades recentes com filtros e busca
- **Gráfico de Performance**: Visualização de dados de performance
- **Loading States**: Indicadores visuais durante carregamento de dados
- **Tratamento de Erros**: Interface amigável para estados de erro

## 🛠️ Tecnologias Utilizadas

- **React 18**: Biblioteca para construção da interface
- **Vite**: Build tool rápido e moderno
- **CSS3**: Estilização personalizada com suporte a tema escuro
- **JavaScript ES6+**: Sintaxe moderna e hooks personalizados

## 🚀 Executando o Projeto

### Pré-requisitos

- Node.js (versão 16 ou superior)
- npm ou yarn

### Instalação

1. Clone o repositório:
```bash
git clone <url-do-repositorio>
cd frontend-app
```

2. Instale as dependências:
```bash
npm install
```

3. Execute o servidor de desenvolvimento:
```bash
npm run dev
```

4. Abra seu navegador e acesse `http://localhost:5173`

### Scripts Disponíveis

- `npm run dev` - Inicia o servidor de desenvolvimento
- `npm run build` - Cria uma versão otimizada para produção
- `npm run preview` - Visualiza a versão de produção localmente

## 📁 Estrutura do Projeto

```
src/
├── components/          # Componentes reutilizáveis
│   ├── Header.jsx      # Cabeçalho com toggle de tema
│   ├── Dashboard.jsx   # Dashboard principal
│   ├── Card.jsx        # Componente de card genérico
│   ├── StatsCard.jsx   # Card de estatísticas
│   └── Footer.jsx      # Rodapé da aplicação
├── hooks/              # Hooks personalizados
│   └── useDashboardData.js # Gerenciamento de dados do dashboard
├── styles/             # Arquivos de estilo (se necessário)
├── App.jsx             # Componente raiz da aplicação
├── App.css             # Estilos principais
├── index.css           # Estilos globais
└── main.jsx            # Ponto de entrada da aplicação
```

## 🎨 Recursos Visuais

- **Design System**: Cores e tipografia consistentes
- **Animações**: Transições suaves e interações responsivas
- **Ícones**: Utilização de emojis para representação visual
- **Layout Responsivo**: Adaptação automática para mobile e desktop
- **Acessibilidade**: Contraste adequado e navegação por teclado

## 🔧 Funcionalidades Implementadas

### Dashboard
- Exibição de estatísticas em tempo real
- Lista de atividades recentes com filtros
- Campo de busca para localizar atividades específicas
- Botão de refresh para atualizar dados
- Tratamento de estados de loading e erro

### Tema
- Toggle entre modo claro e escuro
- Persistência automática da preferência
- Transições suaves entre temas

### Interatividade
- Hover effects nos cards
- Animações nos gráficos
- Feedback visual em botões e controles

## 📱 Responsividade

A aplicação é totalmente responsiva e funciona perfeitamente em:
- Desktop (1200px+)
- Tablet (768px - 1199px)
- Mobile (até 767px)

## 🌟 Destaques do Desenvolvimento

Este projeto foi desenvolvido como demonstração das capacidades de desenvolvimento frontend moderno, incluindo:

- **Componentização**: Código modular e reutilizável
- **Gerenciamento de Estado**: Uso eficiente de hooks React
- **Estilização Avançada**: CSS moderno com variáveis e transições
- **Performance**: Otimizações de build com Vite
- **Experiência do Usuário**: Interface intuitiva e responsiva

## 📄 Licença

Este projeto é desenvolvido para fins educacionais e de demonstração.

---

**Desenvolvido com ❤️ usando React e Vite**