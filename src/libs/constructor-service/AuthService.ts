import { firebaseService } from "@libs/constructor-third-party";
import {
  Auth,
  browserSessionPersistence,
  getAuth,
  GoogleAuthProvider,
  setPersistence,
  signInWithPopup,
  User,
} from "firebase/auth";

export class AuthService {
  private auth: Auth;

  constructor() {
    this.auth = getAuth(firebaseService.app);
    this.signWithGoogle = this.signWithGoogle.bind(this);

    setPersistence(this.auth, browserSessionPersistence);
  }

  public signWithGoogle(callback: (user: User) => void) {
    const googleProvider = new GoogleAuthProvider();

    signInWithPopup(this.auth, googleProvider).then((userCredential) => {
      callback(userCredential.user);
    });
  }

  public onAuthStateChanged(callback: any) {
    this.auth.onAuthStateChanged(callback);
  }
}
