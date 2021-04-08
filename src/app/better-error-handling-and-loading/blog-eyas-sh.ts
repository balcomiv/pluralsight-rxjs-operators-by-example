import { combineLatest, Observable, of } from 'rxjs';
import {
  catchError,
  map,
  mapTo,
  publishReplay,
  refCount,
  startWith,
} from 'rxjs/operators';

/**
 * Blog Link: https://blog.eyas.sh/2020/05/better-loading-and-error-handling-in-angular/
 */

function showErrorDialog(error: unknown): void {
  console.log('===> ', error);
}

function loadDataFromSomeService(): Observable<unknown> {
  return of({ id: 'test' }).pipe(
    map((value) => {
      if (true) {
        // throw new Error('Boom - Get!');
      }
      return value;
    })
  );
}

function deleteDataFromSomeService(): Observable<unknown> {
  return of('result').pipe(
    map((value) => {
      if (true) {
        throw new Error('Boom - Delete!');
      }
    })
  );
}

const data = loadDataFromSomeService().pipe(publishReplay(1), refCount());
const deleteData = deleteDataFromSomeService().pipe(
  publishReplay(1),
  refCount()
);

const isLoading = combineLatest([data, deleteData]).pipe(
  mapTo(false),
  startWith(true),
  catchError((error) => {
    //  showErrorDialog(error);
    return of(false);
  })
);

isLoading.subscribe((value) => console.log('Loading: ', value));

data.subscribe(
  (value) => console.log('Data: ', value),
  (error) => console.log(error),
  () => console.log('Completed')
);

setTimeout(() => {
  deleteData.subscribe(
    (value) => console.log('Delete: ', value),
    (error) => console.log(error),
    () => console.log('Completed')
  );
}, 2000);

// const error = data.pipe(
//   mapTo(false),
//   catchError((e) => of(e))
// );
//  error.subscribe((value) => console.log('Error: ', value));
