/**
 * combineAll - for observable of observables
 * combine latest values from multiple observables once all sources have emitted
 * and emit them as an array
 */

import { interval, of } from 'rxjs';
import { combineAll, delay, take } from 'rxjs/operators';

const source1 = of();
const source2 = of(1, 2, 3);

of(source1, source2)
  .pipe(combineAll())
  .subscribe((value) => {
    console.log(value);
  });

const source3 = of(1, 2, 3);
const source4 = interval(2000).pipe(take(3));
const source5 = of(4, 5, 6).pipe(delay(5000));
const source6 = of('a', 'b', 'c');

of(source3, source4, source5, source6)
  .pipe(combineAll())
  .subscribe(([one, two, three, four]) => {
    console.log(`${one} - ${two} - ${three} - ${four}`);
  });

//  Output
//  3 - 1 - 4 - c
//  3 - 1 - 5 - c
//  3 - 1 - 6 - c
//  3 - 2 - 6 - c
