/**
 * scripts/prerender.js
 *
 * Corre DEPOIS do "vite build". Serve o conteúdo de dist/ localmente,
 * abre-o num browser headless (Playwright), espera o React (e o
 * react-helmet) terminarem de renderizar, e grava o HTML final de
 * volta em dist/index.html.
 *
 * Resultado: dist/index.html deixa de ter uma <div id="root"></div>
 * vazia e passa a ter o conteúdo completo da página, mais os meta
 * tags corretos no <head>. O bundle JS continua incluído, por isso o
 * React "hidrata" por cima no browser do utilizador normal e a
 * interatividade (troca de idioma, etc.) continua a funcionar.
 */
import http from "node:http";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { chromium } from "playwright";
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DIST_DIR = path.resolve(__dirname, "..", "dist");
const INDEX_HTML = path.join(DIST_DIR, "index.html");
const PORT = 4173; // porta só para este script, não interfere com produção
const MIME_TYPES = {
  ".html": "text/html",
  ".js": "text/javascript",
  ".css": "text/css",
  ".json": "application/json",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".ico": "image/x-icon",
  ".xml": "application/xml",
  ".txt": "text/plain",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
};
function servirDist() {
  const server = http.createServer((req, res) => {
    let urlPath = decodeURIComponent(req.url.split("?")[0]);
    if (urlPath === "/") urlPath = "/index.html";
    let filePath = path.join(DIST_DIR, urlPath);
    // SPA fallback: qualquer rota desconhecida devolve index.html
    if (!fs.existsSync(filePath) || fs.statSync(filePath).isDirectory()) {
      filePath = INDEX_HTML;
    }
    const ext = path.extname(filePath);
    const contentType = MIME_TYPES[ext] || "application/octet-stream";
    fs.readFile(filePath, (err, content) => {
      if (err) {
        res.writeHead(500);
        res.end("Erro a servir ficheiro: " + err.message);
        return;
      }
      res.writeHead(200, { "Content-Type": contentType });
      res.end(content);
    });
  });
  return new Promise((resolve) => {
    server.listen(PORT, () => resolve(server));
  });
}
async function main() {
  if (!fs.existsSync(INDEX_HTML)) {
    console.error(
      `[prerender] Não encontrei ${INDEX_HTML}. Corre "vite build" primeiro.`
    );
    process.exit(1);
  }
  console.log("[prerender] A servir dist/ localmente...");
  const server = await servirDist();
  console.log("[prerender] A abrir browser headless...");
  const browser = await chromium.launch();
  const page = await browser.newPage();

  // Captura qualquer erro de JS não apanhado (ex: crash do React)
  page.on("pageerror", (err) => {
    console.error("[prerender] ERRO JS NA PÁGINA:", err.message);
    console.error(err.stack);
  });

  // Captura mensagens de consola tipo console.error / console.warn
  page.on("console", (msg) => {
    if (msg.type() === "error" || msg.type() === "warning") {
      console.error(`[prerender] CONSOLE ${msg.type().toUpperCase()}:`, msg.text());
    }
  });

  // Captura falhas de rede (ex: um import que não foi encontrado em runtime)
  page.on("requestfailed", (request) => {
    console.error(
      `[prerender] PEDIDO FALHOU: ${request.url()} — ${request.failure()?.errorText}`
    );
  });

  await page.goto(`http://localhost:${PORT}/`, { waitUntil: "networkidle" });
  // Dá tempo extra ao React para montar tudo (imagens lazy, efeitos, etc.)
  // Ajusta o seletor abaixo para algo que só existe DEPOIS do conteúdo
  // real ter sido montado — usa o mesmo id que tens no <main> do App.jsx.
  try {
    await page.waitForSelector("#conteudo-principal", { timeout: 15000 });
  } catch (err) {
    console.error("[prerender] #conteudo-principal nunca apareceu. HTML atual da página:");
    console.error(await page.content());
    throw err;
  }
  await page.waitForTimeout(1000);
  const htmlFinal = await page.content();
  await browser.close();
  server.close();
  fs.writeFileSync(INDEX_HTML, htmlFinal, "utf-8");
  console.log(`[prerender] Concluído. ${INDEX_HTML} atualizado com HTML completo.`);
}
main().catch((err) => {
  console.error("[prerender] Falhou:", err);
  process.exit(1);
});