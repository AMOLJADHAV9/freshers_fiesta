# Fresher's Fiesta Registration Web App

A React-based web application for student registration in Fresher's Fiesta events, using Firebase for backend services.

## Features

- Admin dashboard with authentication
- Data storage in Firestore
- Responsive design with CSS
- Export functionality for registration data

## Tech Stack

- **Frontend**: React.js with Vite
- **Styling**: CSS
- **Backend**: Firebase (Authentication & Firestore)
- **Routing**: React Router

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Firebase account

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up Firebase:
   - Create a Firebase project at https://console.firebase.google.com/
   - Enable Firestore Database
   - Enable Firebase Authentication (Email/Password)
   - Copy your Firebase configuration details

4. Configure environment variables:
   - Create a `.env` file in the root directory
   - Add your Firebase configuration:
     ```
     REACT_APP_FIREBASE_API_KEY=your_api_key
     REACT_APP_FIREBASE_AUTH_DOMAIN=your_auth_domain
     REACT_APP_FIREBASE_PROJECT_ID=your_project_id
     REACT_APP_FIREBASE_STORAGE_BUCKET=your_storage_bucket
     REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
     REACT_APP_FIREBASE_APP_ID=your_app_id
     ```

5. Run the development server:
   ```bash
   npm run dev
   ```

6. Build for production:
   ```bash
   npm run build
   ```

## Project Structure

```
src/
├── components/
│   ├── AdminRegistrationForm.jsx
│   ├── AdminLogin.jsx
│   └── AdminDashboard.jsx
├── firebase.js
├── App.jsx
└── main.jsx
```

## Firebase Security Rules

For Firestore, use these security rules:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /registrations/{docId} {
      allow read, write: if request.auth != null;
    }
    match /admins/{docId} {
      allow read, write: if request.auth != null;
    }
  }
}
```

## Deployment

1. Build the project:
   ```bash
   npm run build
   ```

2. Deploy to Firebase Hosting:
   ```bash
   firebase deploy
   ```

## Learn More

- [React Documentation](https://reactjs.org/)
- [Firebase Documentation](https://firebase.google.com/docs)