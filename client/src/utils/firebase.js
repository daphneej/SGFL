// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC7DrrjdntwfkEJ5Et5vf6TfoTAX8MhADs",
  authDomain: "sgflproject.firebaseapp.com",
  projectId: "sgflproject",
  storageBucket: "sgflproject.appspot.com",
  messagingSenderId: "821050113829",
  appId: "1:821050113829:web:c1987737bdbc4913afe4cc",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const storage = getStorage(app);
