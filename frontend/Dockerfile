# -------- BUILD STAGE --------
FROM node:20-bookworm AS build
WORKDIR /app

# copiar package primeiro (cache)
COPY package*.json ./
RUN npm install

# instalar o Chromium do Playwright e as dependências de sistema necessárias
RUN npx playwright install --with-deps chromium

# copiar resto do projeto
COPY . .

# build produção (vite build + prerender.js)
RUN chmod -R 755 node_modules/.bin && npm run build

# -------- PRODUCTION STAGE --------
FROM nginx:alpine
# remover config default
RUN rm -rf /etc/nginx/conf.d/default.conf
# copiar config custom
COPY nginx.conf /etc/nginx/conf.d/default.conf
# copiar build
COPY --from=build /app/dist /usr/share/nginx/html
# expor porta
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
