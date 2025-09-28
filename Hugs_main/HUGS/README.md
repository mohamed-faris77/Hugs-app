# HUGS Project

## Overview
HUGS is a full-stack web application designed for booking, payments, and management in a healthcare or therapy context. It supports both card and UPI (PhonePe) payments, user authentication, admin and doctor dashboards, and more.

## Features
- User registration and authentication
- Booking appointments
- Card payments (Razorpay integration)
- UPI payments (PhonePe integration)
- Admin and doctor dashboards
- Feedback and contact forms
- Blog and resources pages
- Theme toggling (light/dark mode)

## Tech Stack
### Frontend
- **React** (with TypeScript)
- **Vite** (for fast development/build)
- **Tailwind CSS** (for styling)

### Backend
- **Node.js** with **Express.js**
- **PostgreSQL** (database)
- **dotenv** (for environment variable management)
- **axios** (for HTTP requests)

### Payment Integrations
- **Razorpay** (Card payments)
- **PhonePe** (UPI payments)

## Project Structure
```
hugss-main/
  HUGS/
    Backend/           # Node.js/Express backend
      dbStatusCheck.js
      server.js
      phonepe.js       # PhonePe payment integration
      package.json
      .env             # Environment variables
    src/               # React frontend
      App.tsx
      main.tsx
      index.css
      components/      # Navbar, Footer, ThemeToggle, etc.
      pages/           # Home, Payment, Booking, AdminDashboard, etc.
      store/           # State management (auth, theme)
    package.json       # Frontend dependencies
    tailwind.config.js
    vite.config.ts
```

## How It Works
1. **Frontend**: Users interact with the React app to register, log in, book appointments, and make payments.
2. **Backend**: Handles API requests, user authentication, booking logic, and payment processing.
3. **Payments**:
   - **Card**: Uses Razorpay. User clicks "Proceed with Card" and completes payment via Razorpay's UI.
   - **UPI**: Uses PhonePe. User clicks "Proceed with UPI" and completes payment via PhonePe's flow.
4. **Admin/Doctor Dashboards**: Admins and doctors can log in to manage appointments, view feedback, and more.

## Environment Variables
Set these in `Backend/.env`:
```
DB_USER=...
DB_HOST=...
DB_NAME=...
DB_PASS=...
DB_PORT=...
Key_id=...
Key_secret=...
PHONEPE_MERCHANT_ID=...
PHONEPE_CLIENT_ID=...
PHONEPE_CLIENT_SECRET=...
PHONEPE_CLIENT_VERSION=1.0
PHONEPE_MERCHANT_KEY=...
```

## Getting Started
1. **Install dependencies**
   - Frontend: `npm install` in `HUGS/`
   - Backend: `npm install` in `HUGS/Backend/`
2. **Set up environment variables** in `HUGS/Backend/.env`
3. **Start backend**: `npm start` in `HUGS/Backend/`
4. **Start frontend**: `npm run dev` in `HUGS/`
5. Open the app in your browser (usually at `http://localhost:5173`)

## Notes
- Ensure your PhonePe and Razorpay credentials are active and configured for sandbox/testing.
- For UPI payments, PhonePe sandbox accounts must be activated by PhonePe support.

## License
This project is for educational/demo purposes. Contact the author for production use.
