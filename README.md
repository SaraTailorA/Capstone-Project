# SolarCalc - Smart Solar Energy

A full-stack web application that helps individuals and businesses estimate a photovoltaic solar energy system for their home, business, or farm.

## Tech Stack

- **Frontend:** Vanilla JavaScript, Vite, Tailwind CSS
- **Backend:** Node.js, Express.js
- **Database:** PostgreSQL
- **Design:** Dark theme inspired by Tesla Energy

## Project Structure

```
solarcalc/
├── frontend/               # SPA Frontend
│   ├── src/
│   │   ├── core/           # Router, auth, HTTP client
│   │   ├── domain/         # Business logic & calculations
│   │   ├── components/     # Reusable UI components
│   │   ├── layouts/        # Page layouts
│   │   ├── pages/          # Application pages
│   │   └── utils/          # Utilities & constants
│   └── public/             # Static assets
│
├── backend/                # REST API
│   ├── src/
│   │   ├── config/         # Database & environment config
│   │   ├── middleware/      # Auth, error handling
│   │   ├── modules/        # Feature modules (auth, projects, etc.)
│   │   ├── db/             # Migrations & seeds
│   │   └── utils/          # Helpers
│   └── .env                # Environment variables
│
└── README.md
```

## Getting Started

### Prerequisites
- Node.js 18+
- PostgreSQL 14+

### Installation

```bash
# Install all dependencies
npm install

# Setup database
npm run db:setup

# Start frontend + backend
npm run dev:all
```

### Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start frontend only |
| `npm run dev:backend` | Start backend only |
| `npm run dev:all` | Start both |
| `npm run build` | Build frontend for production |
| `npm run db:migrate` | Run database migrations |
| `npm run db:seed` | Seed demo data |

## API Endpoints

### Auth
- `POST /api/auth/register` - Register user
- `POST /api/auth/login` - Login
- `GET /api/auth/me` - Get profile (auth required)

### Projects
- `GET /api/projects` - List user projects (auth required)
- `GET /api/projects/:id` - Get project (auth required)
- `POST /api/projects` - Create project (auth required)
- `DELETE /api/projects/:id` - Delete project (auth required)

### Products
- `GET /api/products` - List products (with filters)
- `GET /api/products/:id` - Get product

### Installers
- `GET /api/installers` - List installers (with filters)
- `GET /api/installers/:id` - Get installer

### Quotes
- `GET /api/quotes` - List user quotes (auth required)
- `POST /api/quotes` - Create quote (auth required)

## Features

- 4-step photovoltaic system calculator
- Two calculation methods: manual kWh or appliance-based
- Estimates panels, inverter, breakers, wiring, protections
- Financial analysis: cost, savings, ROI, CO2 reduction
- User registration and login
- Dashboard with project history
- PDF quote generation
- Solar products marketplace
- Certified installer directory
- Fully responsive design

## License

MIT
