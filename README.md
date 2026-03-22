# 🛍️ Loja Online - Front-end Moderno

Uma aplicação completa de e-commerce desenvolvida com React e Node.js, criada por um agente de IA.

## ✨ Funcionalidades

### Front-end (React + Vite)
- 🎨 **Interface moderna e responsiva** com design gradiente
- 🛒 **Carrinho de compras** com funcionalidades completas
- 🔍 **Busca em tempo real** de produtos
- ❤️ **Sistema de favoritos**
- 📱 **Design responsivo** para mobile e desktop
- ⭐ **Sistema de avaliações** (visual)
- 🎯 **Navegação intuitiva** com menu hambúrguer
- 💫 **Animações suaves** e transições

### Back-end (Node.js + Express)
- 🚀 **API RESTful** para gerenciamento de produtos
- 🔄 **CORS habilitado** para integração front-end
- 📊 **Endpoints completos** (GET, POST, DELETE)
- 🛡️ **Validação de dados** de entrada

## 🚀 Como Executar

### Pré-requisitos
- Node.js (versão 16 ou superior)
- npm ou yarn

### 1. Instalar dependências
```bash
# Dependências do servidor
npm install

# Dependências do front-end
cd frontend
npm install
cd ..
```

### 2. Executar a aplicação

#### Opção 1: Script automatizado (Recomendado)
```bash
./start-dev.sh
```
Este script irá:
- ✅ Verificar e instalar dependências automaticamente
- 🖥️ Iniciar o servidor backend na porta 3000
- 🎨 Iniciar o frontend na porta 5173
- 🛑 Parar todos os serviços com Ctrl+C

#### Opção 2: Executar separadamente
```bash
# Terminal 1 - Servidor (porta 3000)
npm run dev

# Terminal 2 - Front-end (porta 5173)
npm run frontend
```

#### Opção 3: Scripts individuais
```bash
npm start          # Inicia apenas o servidor
npm run dev        # Inicia o servidor em modo desenvolvimento
npm run frontend   # Inicia apenas o front-end
npm run build      # Faz build do front-end para produção
```

### 3. Acessar a aplicação
- **Front-end**: http://localhost:5173
- **API**: http://localhost:3000/api/produtos

## 🎯 Como Usar

### Para Usuários
1. **Navegar produtos**: Explore os produtos na página principal
2. **Buscar**: Use a barra de busca no header para encontrar produtos específicos
3. **Adicionar ao carrinho**: Clique no botão "Adicionar" nos produtos desejados
4. **Gerenciar carrinho**: Clique no ícone do carrinho para ver, adicionar ou remover itens
5. **Favoritar**: Clique no coração para adicionar produtos aos favoritos

### Para Administradores
1. **Adicionar produtos**: Clique no botão "Admin" no canto inferior direito
2. **Preencher dados**: Insira nome e preço do novo produto
3. **Salvar**: O produto aparecerá imediatamente na loja

## 🏗️ Estrutura do Projeto

```
├── server.js              # Servidor Express.js
├── package.json           # Dependências do servidor
├── frontend/              # Aplicação React
│   ├── src/
│   │   ├── App.jsx       # Componente principal
│   │   ├── App.css       # Estilos principais
│   │   └── main.jsx      # Entry point
│   ├── package.json      # Dependências do front-end
│   └── vite.config.js    # Configuração do Vite
└── README.md             # Este arquivo
```

## 🎨 Tecnologias Utilizadas

### Front-end
- **React 19** - Biblioteca para interfaces
- **Vite** - Build tool moderna e rápida
- **Axios** - Cliente HTTP para API calls
- **Lucide React** - Ícones modernos
- **CSS3** - Estilos com gradientes e animações

### Back-end
- **Node.js** - Runtime JavaScript
- **Express.js** - Framework web
- **CORS** - Middleware para Cross-Origin Resource Sharing

## 📱 Funcionalidades Detalhadas

### Carrinho de Compras
- ➕ Adicionar produtos
- ➖ Remover produtos
- 🔢 Controle de quantidade
- 💰 Cálculo automático do total
- 💾 Persistência durante a sessão

### Interface do Usuário
- 🎨 Design moderno com gradientes
- 📱 Totalmente responsivo
- 🌙 Sidebar do carrinho deslizante
- 🔍 Busca instantânea
- ❤️ Botão de favoritos interativo
- ⭐ Sistema de avaliações visual

### API Endpoints
- `GET /api/produtos` - Lista todos os produtos
- `POST /api/produtos` - Adiciona novo produto
- `DELETE /api/produtos/:id` - Remove produto

## 🎯 Próximas Funcionalidades

- [ ] Sistema de autenticação
- [ ] Checkout completo
- [ ] Integração com pagamento
- [ ] Histórico de pedidos
- [ ] Sistema de reviews real
- [ ] Categorias de produtos
- [ ] Filtros avançados
- [ ] Modo escuro

## 🤖 Desenvolvido por IA

Esta aplicação foi completamente desenvolvida por um agente de IA, demonstrando:
- Arquitetura moderna de aplicações web
- Boas práticas de desenvolvimento
- Design responsivo e acessível
- Código limpo e bem estruturado
- Integração front-end/back-end

## 📄 Licença

Este projeto está sob a licença ISC.

---

**Desenvolvido com ❤️ por um Agente de IA**