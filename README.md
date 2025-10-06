# TaskFlow - Sistema de Gerenciamento de Produtos

Um sistema moderno de gerenciamento de produtos desenvolvido com frontend interativo e backend API REST.

## 🚀 Funcionalidades

### Frontend
- **Interface Moderna**: Design responsivo e intuitivo com tema escuro/claro
- **Dashboard**: Estatísticas em tempo real (total de produtos, valor total, preço médio)
- **CRUD Completo**: Criar, visualizar, editar e deletar produtos
- **Busca**: Sistema de busca em tempo real
- **Notificações**: Toast notifications para feedback do usuário
- **Validações**: Validação de formulários e tratamento de erros
- **Responsivo**: Funciona perfeitamente em desktop, tablet e mobile

### Backend
- **API REST**: Endpoints para gerenciamento de produtos
- **CORS**: Configurado para permitir requisições do frontend
- **Validação**: Validação de dados de entrada
- **Tratamento de Erros**: Respostas de erro padronizadas

## 🛠️ Tecnologias Utilizadas

### Frontend
- **HTML5**: Estrutura semântica
- **CSS3**: Estilos modernos com CSS Grid e Flexbox
- **JavaScript ES6+**: Funcionalidades interativas
- **Font Awesome**: Ícones
- **Google Fonts**: Tipografia (Inter)

### Backend
- **Node.js**: Runtime JavaScript
- **Express.js**: Framework web
- **CORS**: Middleware para Cross-Origin Resource Sharing

## 📦 Instalação e Execução

### Pré-requisitos
- Node.js (versão 14 ou superior)
- npm ou yarn

### Passos para executar

1. **Instalar dependências:**
   ```bash
   npm install
   ```

2. **Executar o servidor:**
   ```bash
   npm start
   ```
   ou para desenvolvimento com auto-reload:
   ```bash
   npm run dev
   ```

3. **Acessar a aplicação:**
   - Backend API: http://localhost:3000
   - Frontend: Abra o arquivo `index.html` no navegador

## 🔗 Endpoints da API

### Produtos
- `GET /api/produtos` - Listar todos os produtos
- `POST /api/produtos` - Criar novo produto
- `PUT /api/produtos/:id` - Atualizar produto
- `DELETE /api/produtos/:id` - Deletar produto

### Exemplo de uso da API

**Criar produto:**
```bash
curl -X POST http://localhost:3000/api/produtos \
  -H "Content-Type: application/json" \
  -d '{"nome": "Produto Exemplo", "preco": 99.99}'
```

**Listar produtos:**
```bash
curl http://localhost:3000/api/produtos
```

## 🎨 Características do Design

- **Design System**: Cores, tipografia e espaçamentos consistentes
- **Componentes Reutilizáveis**: Botões, cards, modais padronizados
- **Animações Suaves**: Transições e hover effects
- **Acessibilidade**: Contraste adequado e navegação por teclado
- **Mobile First**: Design responsivo otimizado para mobile

## 📱 Responsividade

O sistema é totalmente responsivo e funciona em:
- **Desktop**: Layout em grid com múltiplas colunas
- **Tablet**: Layout adaptado com 2 colunas
- **Mobile**: Layout em coluna única com navegação otimizada

## 🔧 Funcionalidades do Frontend

### Dashboard
- Contador de produtos totais
- Valor total dos produtos
- Preço médio dos produtos

### Gerenciamento de Produtos
- **Adicionar**: Modal com formulário de criação
- **Editar**: Modal com formulário pré-preenchido
- **Deletar**: Confirmação antes da exclusão
- **Buscar**: Filtro em tempo real por nome ou preço

### Validações
- Campos obrigatórios
- Validação de preço (não pode ser negativo)
- Tratamento de erros da API
- Feedback visual para o usuário

## 🚀 Melhorias Futuras

- [ ] Autenticação de usuários
- [ ] Categorias de produtos
- [ ] Upload de imagens
- [ ] Relatórios e gráficos
- [ ] Exportação de dados
- [ ] PWA (Progressive Web App)
- [ ] Testes automatizados
- [ ] Docker containerization

## 📄 Licença

Este projeto está sob a licença ISC.

## 👨‍💻 Desenvolvido por

Sistema desenvolvido com assistência de IA para demonstrar capacidades de desenvolvimento frontend moderno e integração com APIs REST.