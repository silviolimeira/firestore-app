import { Injectable } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/auth";

@Injectable({
  providedIn: "root"
})
export class AuthGuardService {
  constructor(public afAuth: AngularFireAuth) {}

  canActivate(): boolean {
    // return this.afAuth.isAuthenticated();
    return true;
  }
}
