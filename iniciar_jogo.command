#!/bin/bash
# Script de 1-Clique para macOS
# Basta dar 2 cliques neste arquivo no Finder para abrir o jogo!

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
cd "$DIR"

echo "=========================================================="
echo "   Iniciando CBLOL Chronicles: Batalha pelo Nexus...      "
echo "=========================================================="

# Tenta abrir direto o index.html no navegador padrão
open "$DIR/index.html" 2>/dev/null

# E também sobe o servidor local caso prefira via localhost
if command -v python3 &>/dev/null; then
    python3 "$DIR/server.py"
elif command -v python &>/dev/null; then
    python "$DIR/server.py"
else
    echo "Python não encontrado, mas a página index.html já foi aberta diretamente no seu navegador!"
fi
