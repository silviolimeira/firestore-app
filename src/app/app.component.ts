import { Component } from "@angular/core";

import { Platform } from "@ionic/angular";
import { SplashScreen } from "@ionic-native/splash-screen/ngx";
import { StatusBar } from "@ionic-native/status-bar/ngx";

import { AuthService } from "./services/auth.service";
import { Router } from "@angular/router";
import { AngularFirestore } from "@angular/fire/firestore";
import {
  Observable,
  BehaviorSubject,
  combineLatest,
  Subject,
  Subscription
} from "rxjs";
import { switchMap, take } from "rxjs/operators";
import { AngularFireAuth } from "@angular/fire/auth";
import { RouterService } from "./services/router.service";

@Component({
  selector: "app-root",
  templateUrl: "app.component.html"
})
export class AppComponent {
  // private subject = new Subject<any>();
  routes: any[] = [];
  subscription: Subscription;

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,

    private authService: AuthService,
    private router: Router,
    private firestore: AngularFirestore,
    public afAuth: AngularFireAuth,
    private routeService: RouterService
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();

      this.authService.authenticationState.subscribe(state => {
        if (state) {
          this.getProfile();
        } else {
          this.router.navigate(["login"]);
        }
      });

      this.subscription = this.routeService.getRoute().subscribe(route => {
        if (route) {
          this.routes.push(route);
          console.log("route: ", route);
          if (route.text === "Teacher") {
            console.log("navigate home");
            this.router.navigate(["home"]);
          } else this.router.navigate(["inside"]);
        } else {
          // clear routes when enpty message received
          this.routes = [];
        }
      });
    });
  }

  ngOnDestroy() {
    // unsubscribe to ensure no memory leaks
    this.subscription.unsubscribe();
  }

  async getProfile() {
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

    console.log(this.afAuth.auth.currentUser.uid);
    studentFilter$.next(this.afAuth.auth.currentUser.uid);
    let profile;
    students$.pipe(take(1)).forEach(doc => {
      console.log(doc[0].profile);
      profile = doc[0].profile;
      this.routeService.sendRoute(profile);
    });
  }
}
