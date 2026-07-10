# SolarCalc - Smart Solar Energy

A single-page web application that helps individuals and businesses estimate a photovoltaic solar energy system for their home, business, or farm.

## Tech Stack

- **Frontend:** Vanilla JavaScript, Vite, Tailwind CSS
- **Backend:** Node.js, Express (coming soon)
- **Database:** PostgreSQL (coming soon)
- **Design:** Dark theme inspired by Tesla Energy

## Features

- 4-step photovoltaic system calculator
- Two calculation methods: manual kWh input or appliance-based estimation
- Estimates solar panels, inverter, breakers, wiring, and protections
- Financial analysis: total cost, monthly savings, ROI, CO2 reduction
- User registration and login to save quotes
- Dashboard with project history
- Downloadable PDF quote generation
- Solar products marketplace
- Certified installer directory
- Fully responsive and accessible design

## Getting Started

```bash
# Install dependencies
cd client
npm install

# Development server
npm run dev

# Production build
npm run build

# Preview production build
npm run preview
```

## Project Structure

```
solarcalc/
├── client/                  # Frontend SPA
│   ├── src/
│   │   ├── core/           # Router, auth, event bus, storage
│   │   ├── domain/         # Entities and photovoltaic calculations
│   │   ├── components/     # Reusable UI components
│   │   ├── layouts/        # Layouts (main, auth, dashboard)
│   │   ├── pages/          # Application pages
│   │   └── utils/          # Utilities and constants
│   └── public/             # Static assets
├── server/                 # Backend API (coming soon)
└── docs/                   # Documentation
```

## User Stories

- US-01: User registration
- US-02: User login
- US-03: User logout
- US-04: Edit user profile
- US-05: Enter monthly kWh consumption
- US-06: Estimate consumption via appliances
- US-07: View solar system calculation results
- US-08: Download quote as PDF
- US-09: Save project to dashboard
- US-10: View dashboard overview
- US-11: View project details
- US-12: Delete a project
- US-13: Browse marketplace products
- US-14: View product details
- US-15: Search installers by location
- US-16: View installer profile

## License

MIT
