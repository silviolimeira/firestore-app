import { Component, OnInit } from "@angular/core";

import { AngularFireAuth } from "@angular/fire/auth";

import { AuthService } from "../../services/auth.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.page.html",
  styleUrls: ["./login.page.scss"]
})
export class LoginPage implements OnInit {
  hasVerifiedEmail = true;
  sentTimestamp;

  constructor(
    public afAuth: AngularFireAuth,
    private authService: AuthService
  ) {
    this.afAuth.authState.subscribe(user => {
      if (user) {
        console.log("user: ", user);

        this.authService.login();
      }
    });
  }

  signOut() {
    this.afAuth.auth.signOut().then(() => {
      this.authService.logout();
      location.reload();
    });
  }

  sendVerificationEmail() {
    this.afAuth.auth.currentUser.sendEmailVerification();
    this.sentTimestamp = new Date();
  }

  reload() {
    window.location.reload();
  }

  ngOnInit() {}
}
