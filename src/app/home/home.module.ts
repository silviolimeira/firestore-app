import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { IonicModule } from "@ionic/angular";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";

import { HomePage } from "./home.page";
import { FirebaseUIModule } from "firebaseui-angular";
import { AngularFirestoreModule } from "@angular/fire/firestore";

import { AngularFireDatabaseModule } from "@angular/fire/database";
import { StudentComponent } from "../components/student.component";
import { ComponentsModule } from "../components/components.module";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FirebaseUIModule,
    ComponentsModule,
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
