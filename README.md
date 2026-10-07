# Tiffzy Supply Chain — Standalone B2B Frontend

[![Tiffzy Supply Chain Build](https://img.shields.io/badge/Build-Passing-emerald)](https://github.com/anilchowdary4531/tiffzy-supplychain)
[![React](https://img.shields.io/badge/React-19.2-blue)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-8.3-purple)](https://vite.dev/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4-38bdf8)](https://tailwindcss.com/)

A standalone, high-performance React application powering the **Tiffzy Supply Chain B2B Wholesale Marketplace & Raw Material Inventory System**. Decoupled from the main Tiffzy restaurant app while interfacing directly with the centralized Tiffzy backend APIs and PostgreSQL database.

---

## 🚀 Features & Operational Scope

### 📦 1. Inventory Management
- **All Items**: Live raw material stock tracker with real-time unit pricing and stock valuation.
- **Low Stock Alerts**: Automatic reorder threshold tracking and restock recommendations.
- **Expiry & Batches**: Batch-level expiration tracking, shelf-life auditing, and FIFO/FEFO rules.
- **Movements & Adjustments**: Complete inventory audit trail and manual variance adjustments.
- **Valuation**: FIFO/Weighted-average inventory valuation metrics.

### 🛒 2. Purchasing & Fulfillment
- **Purchase Requests (PR)**: Staff request workflow with manager approval.
- **Purchase Orders (PO)**: Automated PO creation, supplier dispatches, and status lifecycle.
- **Receiving (GRN)**: Goods Receipt Note verification, discrepancy checks, damaged goods handling.
- **Returns & Credit Notes**: Vendor returns and debit note management.
- **Invoices**: Purchase invoice tracking and balance reconciliation.

### 🏬 3. B2B Wholesale Marketplace & Supplier Portal
- **Marketplace Listings**: Wholesale raw material discovery for restaurant buyers.
- **Price Bargain & Live Chat**: Real-time B2B rate negotiation and custom contract pricing.
- **Vendor Payouts & Settlements**: Vendor earnings, commission breakdown, and automated payout logs.
- **Supplier KYC & Profile**: Supplier registration, FSSAI/GSTIN verification, and bank details.

### 🏭 4. Warehouse & Operations
- **Storage Locations**: Multi-warehouse capacity and dry/cold storage management.
- **Stock Transfers**: Inter-location and branch-to-kitchen stock transfers.
- **Physical Stock Counts**: Audits, count sheets, and variance adjustment logs.

### 👨‍🍳 5. Recipes & Intelligence
- **Recipes & BOM**: Recipe costing, ingredient bill of materials, and yield calculations.
- **Consumption Analytics**: Menu item consumption breakdown.
- **Wastage Management**: Loss recording, shrinkage logs, and cost accounting.
- **Intelligence Dashboard**: Predictive restock algorithms, food cost analytics, and risk alerts.
- **Notification Center**: Operational alerts via Socket.IO real-time channels.

---

## 🛠 Tech Stack

- **Framework**: React 19 + Vite 8
- **Routing**: React Router 7 (`BrowserRouter`)
- **Styling**: TailwindCSS 3 + Custom Tiffzy Design System
- **Icons**: Lucide React
- **Charts**: Recharts
- **HTTP Client**: Axios with JWT Interceptors
- **Real-Time**: Socket.IO Client

---

## 💻 Local Development Setup

### Prerequisites
- Node.js `v18+` or `v20+`
- npm `v9+` or `v10+`

### Installation

1. **Clone the repository**:
   ```bash
   git clone git@github.com:anilchowdary4531/tiffzy-supplychain.git
   cd tiffzy-supplychain
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Configure Environment Variables**:
   Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```
   *Edit `.env` to point `VITE_API_URL` to your running backend (default: `http://localhost:5000`).*

4. **Start Development Server**:
   ```bash
   npm run dev
   ```
   *The app will run independently on `http://localhost:5174`.*

---

## 🏗 Build & Production

To build the production bundle:
```bash
npm run build
```

Preview production build locally:
```bash
npm run preview
```

---

## 🔐 Authentication & API Integration

This application interfaces directly with the main Tiffzy backend API (`https://api.tiffzy.com` or local `http://localhost:5000`):
- **Supplier Auth**: Uses `localStorage.getItem("token")` issued by `/api/auth/supplier/login`.
- **Owner/Manager Auth**: Uses standard JWT bearer tokens issued by `/api/auth/login`.
- **Real-Time Updates**: Connects via Socket.IO for live `notification:new`, `supply_order:status_updated`, and `supply_chat:message_received` events.

---

## 📁 Repository Structure

```
tiffzy-supplychain/
├── src/
│   ├── assets/             # Brand logos & audio assets
│   ├── components/         # SupplyChainLayout, SubNav, BrandLogo, ToastHost
│   ├── context/            # AuthContext, LanguageContext
│   ├── pages/
│   │   ├── admin/          # Owner Supply Chain Pages (22 pages)
│   │   └── supplier/       # Supplier Dashboard & Login (2 pages)
│   ├── routes/             # SupplierProtectedRoute
│   ├── utils/              # apiClient, toast, supplyCategories, resolveImageUrl
│   ├── App.jsx             # Main routing setup
│   ├── config.js           # API URL configuration
│   ├── index.css           # TailwindCSS design tokens
│   └── main.jsx            # Entry point
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

---

## 📄 License & Attribution

Copyright © 2026 **Tiffzy / SURVETRA SERVICES**. All rights reserved.
