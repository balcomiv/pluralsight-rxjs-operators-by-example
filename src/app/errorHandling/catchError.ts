/**
 * catchError
 * prevent the error from stopping the stream
 * replace the error with a new source
 */

import { of, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

console.log('# catch and rethrow the error');
throwError('my error')
  .pipe(
    catchError((error) => {
      console.log(`Caught an error: ${error}`);
      return throwError(`Rethrown: ${error}!`);
    }),
    catchError((error) => {
      console.log(error);
      return of(null);
    })
  )
  .subscribe(
    (value) => {
      if (value) {
        console.log(value);
      }
    },
    (error) => console.log('oops'),
    () => console.log('complete')
  );

//  Output:
//  Caught an error: my error
//  Rethrown: my error!
//  complete

console.log(' Catch something undefined');
of('a', 1)
  .pipe(
    map((v) => (v as string).toUpperCase()),
    catchError((error) => of(null))
  )
  .subscribe(
    (value) => {
      if (value) {
        console.log(value);
      }
    },
    (error) => console.log('oops'),
    () => console.log('complete')
  );

//  Output:
//  A
//  complete
