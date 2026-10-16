#!/bin/bash

cd /home/andre/websites-feitos/Beauty-vivace

echo "📥 Pull..."
git pull origin main

echo "🐳 Build..."
docker compose up -d --no-deps --build

echo "🧹 Limpar imagens antigas..."
docker image prune -f

echo "✅ Deploy concluído"
