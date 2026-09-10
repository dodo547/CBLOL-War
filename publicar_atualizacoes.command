#!/bin/bash
# Script de 1-Clique para Atualizar o Jogo no GitHub Pages
# Basta dar 2 cliques neste arquivo no Finder para enviar as novidades para a web!

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
cd "$DIR"

echo "=========================================================="
echo "   🚀 Publicando Atualizações no GitHub Pages...          "
echo "=========================================================="

# Recompila o bundle.js se houver python3
if command -v python3 &>/dev/null; then
    python3 "$DIR/build.py"
fi

# Adiciona arquivos modificados e faz o commit
git add .
git commit -m "update: melhorias e atualizacoes do jogo" 2>/dev/null || true

# Envia para o GitHub
echo ""
echo "Enviando alterações para o GitHub..."
git push origin main

echo ""
echo "=========================================================="
echo "  ✅ Sucesso! O site foi atualizado no GitHub Pages!"
echo "  🌐 Link: https://dodo547.github.io/CBLOL-War/"
echo "  (Pode levar de 30 a 60 segundos para o GitHub processar)"
echo "=========================================================="
echo ""
