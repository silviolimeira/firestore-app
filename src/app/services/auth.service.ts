import { Platform } from "@ionic/angular";
import { Injectable } from "@angular/core";
import { tap, catchError } from "rxjs/operators";
import { BehaviorSubject } from "rxjs";

import { AngularFireAuth } from "@angular/fire/auth";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  authenticationState = new BehaviorSubject(false);
  // token = null;

  constructor(private plt: Platform, public afAuth: AngularFireAuth) {
    // this.plt.ready().then(() => {});
  }

  login() {
    this.authenticationState.next(true);
  }

  logout() {
    this.authenticationState.next(false);
  }

  isAuthenticated() {
    return this.authenticationState.value;
  }
}
