# HabitTracker - Daily Habit Building Web App

This project is a full-stack MERN application built for an academic assignment. It allows users to create, track, manage, and analyze their daily habits to build streaks and boost productivity.

**Live Site URL:** [https://dailyhabitlog.netlify.app](https://dailyhabitlog.netlify.app)

**Server Site URL:** [https://my-habit-tracker-server.vercel.app](https://my-habit-tracker-server.vercel.app)

---

## 🚀 Key Features

* **Full MERN Stack Implementation:** Utilizes React for the client, Express.js and Node.js for the server, and MongoDB (Native Driver) for the database.
* **Secure Firebase Authentication:** Features secure login and registration using Email/Password and Google Sign-In (Popup).
* **Server-Side JWT Security:** Implements Firebase Admin SDK on the server to create and verify JWTs. Protected API routes ensure users can only access or modify *their own* habit data.
* **Complete CRUD Operations:** Users can Create, Read, Update (in a modal), and Delete (with `sweetalert2` confirmation) their personal habits.
* **Streak & Progress Tracking:** Automatically calculates and displays the user's current streak (consecutive days) for each habit and shows a 30-day progress bar on the details page.
* **Analytics Dashboard (Optional Challenge):** Features a responsive bar chart (built with `Recharts`) visualizing the user's habit completion statistics over the last 7 days.
* **Advanced Filtering & Animation:** Includes a public "Browse Habits" page with dynamic search (by title) and filtering (by category), plus subtle scroll animations (`Framer Motion`) on the home page.
* **Axios Interceptor (Optional Challenge):** Uses an `axios` interceptor to automatically attach the Firebase JWT (token) to all secure API requests from the client.
* **Custom Dark/Light Theme:** A theme toggle allows users to switch between a custom theme and a standard light/dark theme, with the preference saved in `localStorage`.

---

## 💻 Technologies Used

### Frontend (Client-Side)
* **Core:** React.js, React Router DOM
* **State Management:** React Context API
* **Styling:** Tailwind CSS, daisyUI
* **Authentication:** Firebase Authentication
* **Data Fetching:** Axios (with Interceptors for JWT)
* **Animations:** Framer Motion, Lottie-Web
* **Forms:** React Hook Form
* **Notifications:** React Hot Toast, SweetAlert2
* **Charts:** Recharts

### Backend (Server-Side)
* **Core:** Node.js, Express.js
* **Database:** MongoDB (Native Driver)
* **Security:** Firebase Admin SDK (JWT Verification)
* **Middleware:** CORS

### Deployment
* **Client:** Netlify
* **Server:** Vercel

---

## 🛠️ How to Run This Project Locally

To run this project on your local machine, you will need to run both the Client and the Server.

### 1. Backend (Server) Setup

```bash
# Clone the server repository (assuming it's in a separate repo)
git clone [https://github.com/jasujon570/habit-tracker-server](https://github.com/jasujon570/habit-tracker-server)
cd habit-tracker-server

# Install dependencies
npm install

# Create a .env file in the root and add your variables:
DB_USER=your_mongodb_username
DB_PASS=your_mongodb_password

# Add your 'serviceAccountKey.json' file (from Firebase) to the root.

# Run the server
npm run start
```

### 2. Frontend (Client) Setup

```bash
# Clone this repository
git clone [https://github.com/jasujon570/habit-tracker-client](https://github.com/jasujon570/habit-tracker-client)
cd habit-tracker-client

# Install dependencies
npm install

# Create a .env file in the root and add your Firebase client keys:
VITE_API_KEY=your_firebase_api_key
VITE_AUTH_DOMAIN=your_firebase_auth_domain
VITE_PROJECT_ID=your_firebase_project_id
VITE_STORAGE_BUCKET=your_firebase_storage_bucket
VITE_MESSAGING_SENDER_ID=your_firebase_sender_id
VITE_APP_ID=your_firebase_app_id

# (Optional: If running the server locally, add this line)
# VITE_API_URL=http://localhost:5000

# Run the client
npm run dev
```
*(**Note:** If `VITE_API_URL` is not set, the app will automatically connect to the live Vercel server.)*

---

## 📖 How to Use the App

1.  **Register:** Create a new account using the "Sign Up" page or by using the "Continue with Google" option.
2.  **Add a Habit:** Navigate to the "Add Habit" page (a private route) to create your first habit, selecting a title, category, and description.
3.  **Track Habits:** Go to the "My Habits" page to see a table of all your habits.
4.  **Mark Complete:** Click the "Mark Complete" button once a day for any habit. This will update your streak.
5.  **Build Streaks:** As you complete habits on consecutive days (today or yesterday), your "Streak" count will increase.
6.  **Analyze Progress:** Visit the "Dashboard" page to see a 7-day bar chart of your completed tasks.
7.  **Explore:** Go to "Browse Public Habits" to see habits created by all users, and use the search and filter options.