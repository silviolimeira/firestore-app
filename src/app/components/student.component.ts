import { Component, OnInit } from "@angular/core";

import { AngularFirestore } from "@angular/fire/firestore";
import { Observable, BehaviorSubject, combineLatest } from "rxjs";
import { switchMap } from "rxjs/operators";

export interface Student {
  Address: String;
  Age: String;
  Name: String;
}

@Component({
  selector: "app-student",
  templateUrl: "./student.component.html",
  styleUrls: ["./student.component.scss"]
})
export class StudentComponent implements OnInit {
  students$: Observable<any[]>;
  addressFilter$: BehaviorSubject<string | null>;
  ageFilter$: BehaviorSubject<string | null>;

  constructor(afs: AngularFirestore) {
    this.addressFilter$ = new BehaviorSubject(null);
    this.ageFilter$ = new BehaviorSubject(null);
    this.students$ = combineLatest(this.addressFilter$, this.ageFilter$).pipe(
      switchMap(([address, age]) =>
        afs
          .collection("Students", ref => {
            let query:
              | firebase.firestore.CollectionReference
              | firebase.firestore.Query = ref;
            if (address) {
              query = query.where("Address", "==", address);
            }
            if (age) {
              query = query.where("Age", "==", age);
            }
            return query;
          })
          .valueChanges()
      )
    );
  }
  filterByAddress(address: string | null) {
    console.log("address: ", address);
    this.addressFilter$.next(address);
  }
  filterByAge(age: string | null) {
    this.ageFilter$.next(age);
  }

  ngOnInit() {}
}
