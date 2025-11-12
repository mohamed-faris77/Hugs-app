# HUGS Project

## Overview
HUGS is a full-stack web application designed for booking, payments, and management in a healthcare or therapy context. It supports both card and UPI (PhonePe) payments, user authentication, admin and doctor dashboards, and more.

## Features
- User registration and authentication
- Booking appointments
- Card payments (Razorpay integration)
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

Key_id=...
Key_secret=...
```


## License
This project is for educational/demo purposes. Contact the author for production use.
