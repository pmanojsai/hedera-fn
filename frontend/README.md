# Health Ledger - Frontend

## Project Structure
```
frontend/
├── client/                 # React frontend application
│   ├── public/            # Static assets
│   ├── src/              # Source code
│   └── index.html         # Main HTML file
├── server/               # Backend server (if needed)
├── shared/               # Shared utilities
├── attached_assets/       # Project assets
├── package.json          # Dependencies and scripts
└── vite.config.ts       # Vite configuration
```

## Development
```bash
cd frontend
npm run dev:client
```

## Access
- Frontend: http://localhost:5000
- Connect Wallet: http://localhost:5000/connect-wallet

## Features
- Web3 wallet integration (MetaMask)
- DPDP-compliant hospital management
- Patient, Doctor, and Admin dashboards
- Medical records management
- Consent management system
