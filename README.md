# 🚗 Car Rental System

A fully functional **Car Rental System** built with **Vite + React.js**, designed to provide a streamlined online renting experience. The application allows users to browse cars, search and filter options, view availability, and place rental reservations with confirmation.

Deployed on **AWS Elastic Beanstalk (or alternative cloud platform)** for remote access.
### Video Demo: https://youtu.be/XR1TdV-xHiQ?si=Ju_vtEJkQirtiWnC
---

## ✨ Features

### Homepage
- Displays cars in a responsive **grid layout**.
- **Logo** appears on all major pages and links back to the homepage.
- **Reservation icon** visible on all car grid views for quick access.

### Car Browsing & Search
- **Search box** with real-time suggestions for car type, brand, model, or description.
- **Filters** by car type (e.g., Sedan, SUV, Wagon) and brand (e.g., Ford, BMW, Mazda).
- Combine filters and search for precise results.
- Results shown in a neat **grid view** with details:
  - Car image, type, brand, model, year, mileage, fuel type, rental price per day, availability.
  - “Rent” button (disabled if unavailable).

### Reservation System
- Reservation page auto-loads the **last selected car’s details** (VIN hidden).
- Dynamic form with validation for:
  - Name, phone, email, driver’s license number.
  - Rental start date & rental period.
- **Live input validation** and feedback.
- **Total price calculation** based on period.
- **Submit** button only enabled when form is valid.
- Options to:
  - ✅ Submit reservation → order stored, car marked unavailable.
  - ❌ Cancel → clears form, returns to homepage.
  - ↩ Leave → form data saved via `localStorage` for reuse.

### Order Confirmation
- Successful reservation:
  - Order recorded in JSON.
  - Car marked unavailable.
  - Form cleared and success message shown.
- Failed reservation (if car became unavailable):
  - User notified of failure and prompted to choose another car.

---

## 🛠️ Tech Stack

- **Frontend:** Vite + React.js  
- **Styling:** Tailwind CSS  
- **State Management:** React Context API  
- **Dynamic Data & Persistence:** JSON + localStorage (`db.json` for car & order data)  
- **AJAX Features:** Fetch API for async updates (no full reloads)  
- **Backend Stub:** `server.cjs` (Node.js server for serving JSON data)  
- **Hosting:** AWS Elastic Beanstalk (or comparable cloud platform)  

---

## 📂 Project Structure

```bash
car-rental-system/
│── db.json                # JSON storage for cars & orders
│── server.cjs             # Simple backend server (Node.js)
│── dist/                  # Production build
│── public/                # Static assets
│── src/
│   ├── assets/            # Images, icons (e.g., react.svg)
│   ├── components/        # Reusable UI components
│   │   ├── CarCard.jsx
│   │   ├── CarGrid.jsx
│   │   ├── Filters.jsx
│   │   ├── Logo.jsx
│   │   ├── ReservationIcon.jsx
│   │   └── SearchBox.jsx
│   ├── context/           # React Context for global state
│   │   └── AppContext.jsx
│   ├── pages/             # Application pages
│   │   ├── Home.jsx
│   │   ├── Reservation.jsx
│   │   └── Confirmation.jsx
│   ├── App.jsx            # Root React component
│   ├── App.css
│   ├── index.css
│   └── main.jsx           # Entry point
│── index.html
│── vite.config.js
│── tailwind.config.cjs
│── postcss.config.cjs
│── eslint.config.js
│── package.json
│── package-lock.json
│── README.md
