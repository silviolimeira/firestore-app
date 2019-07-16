import { Injectable } from "@angular/core";

import { Observable, Subject } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class RouterService {
  private subject = new Subject<any>();

  sendRoute(route: string) {
    this.subject.next({ text: route });
  }

  clearRoute() {
    this.subject.next();
  }

  getRoute(): Observable<any> {
    return this.subject.asObservable();
  }
}
