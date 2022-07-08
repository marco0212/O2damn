import { FirebaseApp, FirebaseOptions, initializeApp } from "firebase/app";
import { firebaseConfig } from "./constants";

class FirebaseService {
  public app: FirebaseApp;

  constructor(config: FirebaseOptions) {
    this.app = initializeApp(config);
  }
}

export const firebaseService = new FirebaseService(firebaseConfig);
