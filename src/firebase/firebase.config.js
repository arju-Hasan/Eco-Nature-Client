// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey:import.meta.env.VITE_apiKey,
  authDomain:import.meta.env.VITE_authDomain,
  projectId:import.meta.env.VITE_projectId,
  storageBucket:import.meta.env.VITE_storageBucket,
  messagingSenderId:import.meta.env.VITE_messagingSenderId,
  appId:import.meta.env.VITE_appId,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// ✅ Initialize Firestore
const db = getFirestore(app);

// ✅ export both app and db
export { app, db };

// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries
// 
// // Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyC1UXQLgcCqyNPTTuvR8aIs4Mr9kVUNWRw",
//   authDomain: "eco-nature-client.firebaseapp.com",
//   projectId: "eco-nature-client",
//   storageBucket: "eco-nature-client.firebasestorage.app",
//   messagingSenderId: "907821229285",
//   appId: "1:907821229285:web:46cf663130e7642b46200c"
// };
// 
// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// export default app;