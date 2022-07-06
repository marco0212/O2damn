import { NavigatorProvider } from "@libs/provider-navigator";
import { PlayProvider } from "@libs/provider-play";
import { initializeApp } from "firebase/app";
import { useEffect } from "react";
import "./App.css";

function App() {
  useEffect(() => {
    const firebaseConfig = {
      apiKey: process.env.FIREBASE_API_KEY,
      authDomain: process.env.FIREBASE_AUTH_DOMAIN,
      projectId: process.env.FIREBASE_PROJECT_ID,
      storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
      messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
      appId: process.env.FIREBASE_APP_ID,
      measurementId: process.env.FIREBASE_MEASUREMENT_ID,
    };

    initializeApp(firebaseConfig);
  }, []);

  return (
    <PlayProvider>
      <NavigatorProvider />
    </PlayProvider>
  );
}

export default App;
