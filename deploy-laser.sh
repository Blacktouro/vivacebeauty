#!/bin/bash
# Deploy da landing page laser.vivace-beauty.pt (pasta laser/ deste repo)
set -e

cd /home/andre/websites-feitos/Beauty-vivace

echo "📥 Pull..."
git pull origin main

echo "🐳 Build laser..."
cd laser
docker compose up -d --build

echo "🧹 Limpar imagens antigas..."
docker image prune -f

echo "🔎 Teste:"
curl -sI http://127.0.0.1:5174 | head -1

echo "✅ Deploy laser concluído"
