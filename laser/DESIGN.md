# DESIGN.md — laser.vivace-beauty.pt

Landing page de depilação a laser da Vivace Beauty (Peniche).
Direção: segue a secção "Novidades" do site principal (escuro quente + dourado,
Fraunces + Manrope), para o subdomínio parecer da mesma casa. Tom: calmo, premium,
próximo — sem ar de "clínica fria" nem de promoção agressiva.

Tema único escuro (o site principal não tem modo claro).

## Cor
| Token | Valor | Papel |
|---|---|---|
| `--bg` | #131110 | fundo da página |
| `--surface` | #1D1917 | cartões, faixas alternadas |
| `--line` | #2C2724 | bordas e divisórias |
| `--ink` | #F5EFE9 | texto principal (contraste ~17:1 em `--bg`) |
| `--ink-soft` | #B8AFA8 | texto secundário (~8.5:1) |
| `--gold` | #E9C79A | primária: botão principal, links, destaques em títulos |
| `--gold-ink` | #1D1712 | texto sobre `--gold` |
| `--whatsapp` | #25D366 | só no ícone do botão flutuante de WhatsApp |
| `--error` | #E5877A | erros de formulário (se houver) |

Nada de gradientes roxos, vidro, nem texto com gradiente. Um só acento: o dourado.

## Tipografia
- Títulos: **Fraunces** 500/600 (serifada, editorial).
- Texto: **Manrope** 400/500/700.
- Escala: 13 (eyebrow) · 15 (pequeno) · 17 (corpo) · 20 (lead) · 26 (h3) · clamp(28–40) (h2) · clamp(36–60) (h1).
- Corpo com line-height 1.6, máx. 62ch por linha. Títulos 1.1–1.15.

## Espaçamento
Escala de 8: 4, 8, 12, 16, 24, 32, 48, 64, 96.
Secções: 96px (desktop) / 64px (telemóvel). Largura de conteúdo: 1080px; texto 640px.

## Forma e profundidade
- Raio: 12 (inputs, imagens pequenas) · 20 (cartões) · 999 (botões, chips).
- Sem sombras; a profundidade vem do contraste `--bg` / `--surface` e da borda `--line`.

## Componentes
- **Botão primário**: fundo `--gold`, texto `--gold-ink`, pill, 13×22, peso 700. Hover: brilho +8%. Focus: anel 2px `--gold` com offset 3px.
- **Botão secundário**: transparente, borda `--ink-soft`, texto `--ink`.
- **Link**: `--gold`, sublinhado no hover.
- **Eyebrow/chip**: 13px, `--gold`, borda `--line`, pill.
- **Cartão**: `--surface`, borda `--line`, raio 20, padding 32.
- **FAQ**: `<details>` nativo, borda inferior `--line`, marcador "+" que roda.
- **Barra fixa no telemóvel**: "Marcar avaliação" + ligar, sempre visível em baixo.

## Imagem e ícones
- Fotos reais da clínica/equipamento (nunca banco de imagens com modelos genéricas), cantos 20.
- Ícones de traço 2px, estilo linha, `currentColor` — os mesmos dos botões do site principal. Sem emoji.
- Os símbolos decorativos do site principal (✦) podem aparecer só como separador, com moderação.
