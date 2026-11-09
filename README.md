Landing Page de Salão de Beleza e estetica

Desnvolvimento em REACT e C#

Adicionado dominio e NGINX com docker

PRoximo com n8n para atendimento marcação de apontamentos.

## Landing page laser (laser.vivace-beauty.pt)

Pasta `laser/`: página estática (HTML/CSS) servida por nginx em Docker, em `127.0.0.1:5174`.
O nginx do VPS faz proxy de `laser.vivace-beauty.pt` para essa porta (certificado Let's Encrypt).

- Editar: `laser/site/index.html` (regras de design em `laser/DESIGN.md`)
- Deploy no VPS: `./deploy-laser.sh`
- SEO: a página está com `noindex` até os preços, horário e foto estarem preenchidos.
  Para abrir ao Google, trocar `noindex, nofollow` por `index, follow, max-image-preview:large`.
