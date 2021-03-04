//  Subscribe to observable, every time source emits
//  When source emits, we unsubscribe from the previous generated observable

import { interval, Observable, timer } from 'rxjs';
import { map, switchMap, take, tap } from 'rxjs/operators';

const character = new Observable((subscriber) => {
  subscriber.next('A');
  setTimeout(() => subscriber.next('B'), 200);
  setTimeout(() => subscriber.complete(), 300);
});

const numberInterval = interval(50).pipe(take(5));

//  Switch to new inner observable when source emits
console.log('# switch to a new source');
character
  .pipe(
    tap((x) => console.log(`Value from source: ${x}`)),
    switchMap(() => numberInterval) //   <-- here we subscribe to numberInterval
  )
  .subscribe(
    (value) => console.log(`emitted value: ${value}`),
    (err) => console.log(err),
    () => console.log('Complete')
  );

// Value from source: A ​​​​​
// emitted value: 0 ​​​​​
// emitted value: 1 ​​​​​
// emitted value: 2 ​​​​​

// Value from source: B ​​​​​
// emitted value: 0 ​​​​​
// emitted value: 1 ​​​​​
// emitted value: 2 ​​​​​
// emitted value: 3 ​​​​​
// emitted value: 4 ​​​​​
// Complete

//  timer(0, 150).pipe(take(3), (char, num) => `${char}${num}`)).subscribe(val => console.log(val));

//  Just to delay example
setTimeout(() => {
  character
    .pipe(
      switchMap(
        () => timer(0, 150).pipe(take(3)),
        (char, num) => `Val: ${char}${num}`
      )
    )
    .subscribe(
      (val) => console.log(val),
      (err) => console.log(err),
      () => console.log('complete')
    );
}, 1000);

//  Non-deprecated Version
//  Just to delay example
setTimeout(() => {
  character
    .pipe(
      switchMap((char) => {
        return timer(0, 150).pipe(
          take(3),
          map((num) => `Val: ${char}${num}`)
        );
      })
    )
    .subscribe(
      (val) => console.log(val),
      (err) => console.log(err), // ?
      () => console.log('complete')
    );
}, 2000);
