# TaskFlow - Sistema de Gerenciamento de Produtos

Um sistema moderno de gerenciamento de produtos desenvolvido com Node.js, Express e frontend vanilla JavaScript.

## 🚀 Funcionalidades

- **CRUD Completo**: Criar, ler, atualizar e deletar produtos
- **Interface Moderna**: Design responsivo e intuitivo
- **Busca e Filtros**: Sistema de busca em tempo real e ordenação
- **Analytics**: Dashboard com estatísticas dos produtos
- **Validações**: Validação de dados no frontend e backend
- **Notificações**: Sistema de toast para feedback visual
- **API RESTful**: Endpoints bem estruturados

## 🛠️ Tecnologias Utilizadas

### Backend
- Node.js
- Express.js
- CORS

### Frontend
- HTML5
- CSS3 (com variáveis CSS e Flexbox/Grid)
- JavaScript ES6+
- Font Awesome (ícones)
- Google Fonts (Inter)

## 📦 Instalação

1. Clone o repositório
2. Instale as dependências:
```bash
npm install
```

3. Inicie o servidor:
```bash
npm start
```

4. Acesse o frontend em: `http://localhost:3000` (abrir index.html)

## 🎯 Como Usar

1. **Visualizar Produtos**: A página inicial mostra todos os produtos cadastrados
2. **Adicionar Produto**: Clique em "Adicionar Produto" e preencha os dados
3. **Editar Produto**: Clique em "Editar" no card do produto desejado
4. **Excluir Produto**: Clique em "Excluir" e confirme a ação
5. **Buscar**: Use a barra de busca para filtrar produtos
6. **Ordenar**: Use o dropdown para ordenar por nome, preço ou ID
7. **Analytics**: Acesse a aba "Analytics" para ver estatísticas

## 🔧 API Endpoints

- `GET /api/produtos` - Lista todos os produtos
- `POST /api/produtos` - Cria um novo produto
- `PUT /api/produtos/:id` - Atualiza um produto
- `DELETE /api/produtos/:id` - Remove um produto

## 📱 Responsividade

O sistema é totalmente responsivo e funciona perfeitamente em:
- Desktop
- Tablet
- Mobile

## 🎨 Características do Design

- **Design System**: Cores e espaçamentos consistentes
- **Tipografia**: Hierarquia clara com a fonte Inter
- **Componentes**: Cards, modais, botões e formulários reutilizáveis
- **Estados**: Hover, focus e loading states
- **Acessibilidade**: Contraste adequado e navegação por teclado

## 🚀 Desenvolvido com IA

Este projeto foi desenvolvido utilizando um agente de IA que:
- Criou a estrutura completa do frontend
- Implementou todas as funcionalidades CRUD
- Desenvolveu um design moderno e responsivo
- Integrou frontend e backend de forma eficiente
- Adicionou validações e tratamento de erros
