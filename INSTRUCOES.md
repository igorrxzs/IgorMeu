# 🚀 Instruções para Executar o TaskFlow

## Pré-requisitos
- Node.js instalado (versão 14 ou superior)
- Navegador web moderno

## Passos para Executar

### 1. Instalar Dependências
```bash
npm install
```

### 2. Iniciar o Servidor Backend
```bash
npm start
```
O servidor será iniciado na porta 3000 (ou outra porta disponível).

### 3. Acessar o Frontend
Abra um dos seguintes arquivos no seu navegador:

- **Sistema Principal**: `index.html`
- **Página de Demo**: `demo.html`
- **Teste da API**: `test-api.html`
- **Cardápio Original**: `Cardapio/mydick.html`

## 🎯 Funcionalidades Disponíveis

### Sistema Principal (index.html)
- ✅ Visualizar todos os produtos
- ✅ Adicionar novos produtos
- ✅ Editar produtos existentes
- ✅ Excluir produtos
- ✅ Buscar produtos em tempo real
- ✅ Ordenar produtos por nome, preço ou ID
- ✅ Dashboard de analytics com estatísticas

### Página de Demo (demo.html)
- ✅ Apresentação do sistema
- ✅ Verificação automática do status do servidor
- ✅ Links para acessar o sistema principal

### Teste da API (test-api.html)
- ✅ Testar todos os endpoints da API
- ✅ Verificar se o servidor está funcionando
- ✅ Debug de problemas de conectividade

## 🔧 Estrutura do Projeto

```
/workspace/
├── index.html          # Frontend principal
├── styles.css          # Estilos CSS
├── script.js           # JavaScript do frontend
├── server.js           # Servidor Node.js/Express
├── package.json        # Dependências do projeto
├── demo.html           # Página de demonstração
├── test-api.html       # Teste da API
├── README.md           # Documentação principal
├── INSTRUCOES.md       # Este arquivo
└── Cardapio/           # Pasta com cardápio original
    ├── mydick.html
    ├── mydick.css
    └── img/
```

## 🐛 Solução de Problemas

### Servidor não inicia
- Verifique se a porta 3000 está disponível
- Execute `npm install` para instalar dependências
- Verifique se o Node.js está instalado

### Frontend não carrega dados
- Verifique se o servidor está rodando
- Abra o console do navegador (F12) para ver erros
- Teste a API usando `test-api.html`

### Problemas de CORS
- O servidor já está configurado com CORS
- Se ainda houver problemas, verifique se está acessando via `http://localhost`

## 📱 Testando em Dispositivos Móveis

1. Inicie o servidor
2. Descubra o IP da sua máquina na rede local
3. Acesse `http://[SEU_IP]:3000` de outros dispositivos
4. O sistema é totalmente responsivo

## 🎨 Personalização

### Cores e Estilos
- Edite as variáveis CSS em `styles.css`
- As cores principais estão definidas no `:root`

### Funcionalidades
- Adicione novos endpoints em `server.js`
- Implemente novas funcionalidades em `script.js`

## 📊 Monitoramento

- O servidor exibe logs no console
- Use `test-api.html` para monitorar a API
- O frontend exibe notificações de sucesso/erro

## 🚀 Próximos Passos

- Implementar autenticação
- Adicionar banco de dados
- Criar sistema de pedidos
- Implementar upload de imagens
- Adicionar relatórios avançados

---

**Desenvolvido com IA** 🤖 - Sistema completo de gerenciamento de produtos com interface moderna e funcionalidades avançadas.