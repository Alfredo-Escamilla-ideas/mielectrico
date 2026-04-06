# consumo-multimarca

App de seguimiento de consumo para vehículos eléctricos, PHEV e híbridos enchufables. Desplegada en https://www.lienzovirtual.com/mielectrico/

## Agente predeterminado

Para todas las tareas de este proyecto usa el agente **engineering-frontend-developer** (`/engineering-frontend-developer`). Está disponible en `.claude/agents/engineering-frontend-developer.md`.

## Stack

- **Frontend**: React + TypeScript + Vite + Tailwind CSS (tokens `jaecoo-*`, tema oscuro)
- **Backend**: PHP 8 REST API en shared hosting (lienzovirtual.com)
- **BD**: MySQL 8 — base de datos `qaqf390`
- **Router**: HashRouter (`/#/ruta`)
- **Deploy**: FTP a `/html/mielectrico/` — credenciales en FileZilla

## Estructura principal

- `src/pages/` — Login, Dashboard, páginas de sección, CatalogAdmin
- `src/components/` — CustomSelect y otros componentes compartidos
- `src/services/api.ts` — todas las llamadas a la API
- `api/` — endpoints PHP (catalog.php, charges.php, refuels.php, etc.)

## Notas importantes

- El catálogo de vehículos está en la BD (`custom_vehicles`), no en código estático
- La contraseña de admin del catálogo está en `api/config.php` (`ADMIN_PASSWORD`)
- Subir siempre TODOS los archivos de `dist/assets/` al hacer deploy (los nombres cambian con cada build)
- Deploy FTP: `curl -T archivo "ftp://lienzovirtual.com:PASSWORD@ftp.lienzovirtual.com/html/mielectrico/..."`
