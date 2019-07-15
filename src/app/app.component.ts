import { Component } from "@angular/core";

import { Platform } from "@ionic/angular";
import { SplashScreen } from "@ionic-native/splash-screen/ngx";
import { StatusBar } from "@ionic-native/status-bar/ngx";

import { AuthService } from "./services/auth.service";
import { Router } from "@angular/router";
import { AngularFirestore } from "@angular/fire/firestore";
import { Observable, BehaviorSubject, combineLatest, Subject } from "rxjs";
import { switchMap, take } from "rxjs/operators";
import { AngularFireAuth } from "@angular/fire/auth";
import { stringify } from "@angular/compiler/src/util";

@Component({
  selector: "app-root",
  templateUrl: "app.component.html"
})
export class AppComponent {
  private subject = new Subject<any>();

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,

    private authService: AuthService,
    private router: Router,
    private firestore: AngularFirestore,
    public afAuth: AngularFireAuth
  ) {
    this.initializeApp();
  }

  sendMessage(message: string) {
    if (message === "Teacher") this.router.navigate(["home"]);
    else this.router.navigate(["inside"]);
    // this.router.navigate([message]);
    this.authService.perfil = [message];
    console.log("message: ", message);
    this.subject.next({ text: message });
  }

  clearMessages() {
    this.subject.next();
  }

  getMessage(): Observable<any> {
    return this.subject.asObservable();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();

      this.authService.authenticationState.subscribe(state => {
        if (state) {
          this.foo();
          // this.router.navigate(["inside"]);
        } else {
          this.router.navigate(["login"]);
        }
      });
    });
  }

  async foo() {
    var students$: Observable<any[]>;
    var studentFilter$: BehaviorSubject<string | null>;

    studentFilter$ = new BehaviorSubject(null);
    students$ = combineLatest(studentFilter$).pipe(
      switchMap(([student]) =>
        this.firestore
          .collection("Perfil", ref => {
            let query:
              | firebase.firestore.CollectionReference
              | firebase.firestore.Query = ref;
            if (student) {
              console.log("student: ", student);
              query = query.where("student", "==", student);
            }
            return query;
          })
          .valueChanges()
      )
    );

    // let profile = students$[0].profile;
    console.log(this.afAuth.auth.currentUser.uid);
    studentFilter$.next(this.afAuth.auth.currentUser.uid);
    let profile;
    students$.pipe(take(1)).forEach(doc => {
      console.log(doc[0].profile);
      profile = doc[0].profile;
      this.sendMessage(profile);
    });

    // this.clearMessages();
    // this.getMessage();
  }

  // filterByAddress(address: string | null) {
  //   console.log("address: ", address);
  //   this.addressFilter$.next(address);
  // }
  // filterByAge(age: string | null) {
  //   this.ageFilter$.next(age);
  // }
}
