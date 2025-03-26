import { initializeApp } from "firebase/app";
import { getFirestore} from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDLsPgvhbYKOIjVYO4OlF1lhIHXiqciXDA",
  authDomain: "my-ecommerce-app-33e36.firebaseapp.com",
  projectId: "my-ecommerce-app-33e36",
  storageBucket: "my-ecommerce-app-33e36.firebasestorage.app",
  messagingSenderId: "815068463100",
  appId: "1:815068463100:web:087ec3bc8846227553fc79"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const auth = getAuth(app);

export { auth,db};