import { Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest, Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
//  https://blog.eyas.sh/2018/12/data-and-page-content-refresh-patterns-in-angular/

@Injectable()
export class RegisterService {
  private refreshToken$ = new BehaviorSubject(undefined);

  private searchFilter$ = new BehaviorSubject('Lost-Rejected');

  registerData$ = combineLatest([this.searchFilter$, this.refreshToken$]).pipe(
    switchMap(([searchFilter]) => {
      return this.getData(searchFilter);
    })
  );

  constructor() {}

  getData(searchFilter: string): Observable<string> {
    //  Builder filter expression (searchFilter: string)
    //  Build Post Body (filterExpress: FilterExpress)
    //  return => Make call to API (postBody: RegisterSearchPostBodyModel)
    return of('Got data from API with filters: ', searchFilter);
  }
}

new RegisterService().registerData$.subscribe((value) => console.log(value));

// RxJS v6+
// const timerOne$ = timer(1000, 4000);
// const timerTwo$ = timer(2000, 4000);
// const timerThree$ = new BehaviorSubject(undefined);

// combineLatest([timerOne$, timerTwo$, timerThree$])
//   .pipe(
//     tap((value) => console.log('yep', value)),
//     switchMap(([value]) => of(value))
//   )
//   .subscribe(console.log);
