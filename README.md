# Startup Benefits Platform

A full-stack platform providing exclusive SaaS deals to early-stage founders. Built with a focus on clean architecture, secure authentication, and high-quality interaction design.

** 🔴 Live Demo: https://startup-benefits-seven.vercel.app/

## Tech Stack

### Frontend
- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS + CSS Modules (Dark Mode aesthetic)
- **Animation:** Framer Motion (Page transitions & micro-interactions)
- **State Management:** React Context API (Auth)
-**images**: Logo.dev

### Backend
- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB (Mongoose ODM)
- **Authentication:** JWT (JSON Web Tokens) with Bearer Authorization

---

## 🏗️ Architecture & Flow

### 1. Application Flow
1.  **Landing:** Users arrive at a high-performance animated landing page.
2.  **Auth:** Users register or login via JWT.
3.  **Discovery:** Users browse deals. Public deals are accessible immediately. Restricted deals show a "Locked" state.
4.  **Verification Check:** The frontend checks `user.isVerified`. If false, restricted deals are disabled visually.
5.  **Claiming:** When a user claims a deal, the backend performs a double-check on verification status before creating a `Claim` record.
6.  **Dashboard:** Users view their active claims and approval status.

### 2. Authentication Strategy
- **JWT:** Upon login, the server signs a token containing the User ID.
- **Persistence:** The token is stored in the frontend state and sent in the `Authorization` header (`Bearer <token>`) for protected requests.
- **Protection:** Backend middleware (`protect.js`) intercepts requests, verifies the token signature, and attaches the user object to `req.user`.

### 3. Database Schema Design
- **User:** Stores credentials and a critical `isVerified` boolean.
- **Deal:** Contains deal metadata and `accessLevel` ('public' | 'restricted').
- **Claim:** A join-table linking `User` and `Deal` to track usage history.

---

## 🛠️ Setup & Installation

### Prerequisites
- Node.js (v18+)
- MongoDB Connection String (Atlas or Local)

### 1. Clone the Repository
\`\`\`bash
git clone https://github.com/your-username/startup-benefits.git
cd startup-benefits
\`\`\`

### 2. Backend Setup
\`\`\`bash
cd server
npm install
# Create a .env file with:
# PORT=5000
# MONGO_URI=your_mongodb_string
# JWT_SECRET=your_secret_key
npm run dev
\`\`\`

### 3. Frontend Setup
\`\`\`bash
cd client
npm install
# Create a .env.local file with:
# NEXT_PUBLIC_API_URL=http://localhost:5000/api
npm run dev
\`\`\`

Visit `http://localhost:3000` to view the app.

---

## 🎨 UI/UX & Animations
- **Glassmorphism:** Used extensively on cards and forms for a modern SaaS feel.
- **Framer Motion:** Implemented for smooth entry animations (fade-up) on the Hero section and list items.
- **Feedback:** Loading states (spinners) and button interactions (hover/disabled) ensure the user always knows the system status.

---

## ⚠️ Known Limitations & Improvements
1.  **Verification Logic:** Currently, `isVerified` is a manual flag in the database. In production, this would integrate with Stripe Identity or a "Work Email" checker.
2.  **Image Hosting:** Deal logos currently use Log.dev api. Production would use Cloudinary.
3.  **Caching:** High-traffic endpoints like `GET /deals` should be cached using Redis.