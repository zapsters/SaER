// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-analytics.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDRf1kzFakbVAnUW86swGTAITQaTWZWNyw",
  authDomain: "scienceandentityresearch.firebaseapp.com",
  projectId: "scienceandentityresearch",
  storageBucket: "scienceandentityresearch.appspot.com",
  messagingSenderId: "37129543158",
  appId: "1:37129543158:web:344ae3b70be061c35b3bd7",
  measurementId: "G-DCHDX1GKT6",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
