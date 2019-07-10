import { Component, OnInit } from "@angular/core";

import { AngularFireAuth } from "@angular/fire/auth";

@Component({
  selector: "app-inside",
  templateUrl: "./inside.page.html",
  styleUrls: ["./inside.page.scss"]
})
export class InsidePage implements OnInit {
  constructor(public afAuth: AngularFireAuth) {}

  ngOnInit() {}

  signOut() {
    this.afAuth.auth.signOut().then(() => {
      location.reload();
    });
  }
}
