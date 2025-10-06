#!/bin/bash

echo "🚀 Iniciando Loja Online - Desenvolvimento"
echo "=========================================="

# Cores para output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Função para limpar processos ao sair
cleanup() {
    echo -e "\n${YELLOW}🛑 Parando serviços...${NC}"
    kill $SERVER_PID 2>/dev/null
    kill $FRONTEND_PID 2>/dev/null
    exit 0
}

# Capturar Ctrl+C
trap cleanup SIGINT

# Verificar se as dependências estão instaladas
echo -e "${BLUE}📦 Verificando dependências...${NC}"

if [ ! -d "node_modules" ]; then
    echo -e "${YELLOW}⚠️  Instalando dependências do servidor...${NC}"
    npm install
fi

if [ ! -d "frontend/node_modules" ]; then
    echo -e "${YELLOW}⚠️  Instalando dependências do frontend...${NC}"
    cd frontend && npm install && cd ..
fi

echo -e "${GREEN}✅ Dependências verificadas!${NC}"

# Iniciar servidor
echo -e "\n${BLUE}🖥️  Iniciando servidor backend...${NC}"
PORT=3000 node server.js &
SERVER_PID=$!

# Aguardar servidor inicializar
sleep 2

# Verificar se servidor está rodando
if curl -s http://localhost:3000/api/produtos > /dev/null; then
    echo -e "${GREEN}✅ Servidor backend rodando na porta 3000${NC}"
else
    echo -e "${YELLOW}⚠️  Servidor pode não ter iniciado corretamente${NC}"
fi

# Iniciar frontend
echo -e "\n${BLUE}🎨 Iniciando frontend...${NC}"
cd frontend && npm run dev &
FRONTEND_PID=$!
cd ..

echo -e "\n${GREEN}🎉 Aplicação iniciada com sucesso!${NC}"
echo -e "${GREEN}📱 Frontend: http://localhost:5173${NC}"
echo -e "${GREEN}🔧 API: http://localhost:3000/api/produtos${NC}"
echo -e "\n${YELLOW}💡 Pressione Ctrl+C para parar todos os serviços${NC}"

# Aguardar indefinidamente
wait