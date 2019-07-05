import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { IonicModule } from "@ionic/angular";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";

import { HomePage } from "./home.page";
import { FirebaseUIModule } from "firebaseui-angular";
import { AngularFirestoreModule } from "@angular/fire/firestore";

import { AngularFireDatabaseModule } from "@angular/fire/database";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FirebaseUIModule,
    AngularFirestoreModule,
    AngularFireDatabaseModule,
    RouterModule.forChild([
      {
        path: "",
        component: HomePage
      }
    ])
  ],
  declarations: [HomePage]
})
export class HomePageModule {}
