# 🔄 Crud Token Service  

*A full-stack monorepo for token management with modern web technologies*  

---

## **Project **  

```bash
crud-token-service/
├── backend/             # Node.js backend service
├── frontend-web/        # React/Vue frontend
├── packages/            # Shared code
├── package.json         # Workspace configuration
└── README.md            # Project documentation

## Workspaces

- `backend/` — The backend service
- `frontend-web/` — The web client
- `packages/` — Shared code (e.g., utils)


## Prerequisites

- **Node.js** ≥ 18.x
- **npm** ≥ 9.x
- (Optional) **Docker** for containerization

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/james-mensa/crud-token-service.git
   cd crud-token-service
   npm install
   ```
## Commands

| Command                         | Action                                                   |
|---------------------------------|----------------------------------------------------------|
| `npm run dev:app`               | Start frontend + backend concurrently                    |
| `npm run dev:backend`           | Launch backend server (dev mode)                         |
| `npm run dev:backend-db`        | Start backend database (dev mode, Docker Compose required) |
| `npm run dev:frontend`          | Start frontend dev server                                |
| `npm run build:frontend`        | Build frontend for production                            |
| `npm run lint-type:backend`     | Lint backend types                                       |
| `npm run lint-all:backend`      | Lint all backend code                                    |
| `npm run format`                | Format code with Biome                                   |
| `npm run check`                 | Check code with Biome                                    |
