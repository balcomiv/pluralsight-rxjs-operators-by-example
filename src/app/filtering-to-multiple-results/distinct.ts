import { of } from 'rxjs';
import { distinct } from 'rxjs/operators';

/**
 * distinct
 *  emit unique values across whole source
 */

console.log('# select unique values within source');
of(1, 2, 3, 3, 2, 1)
  .pipe(distinct())
  .subscribe((val) => {
    console.log(val);
  });
//  Output: 1, 2, 3
//  1
//  2
//  3

console.log(
  '------------------------------------------------------------------------------------'
);
console.log('# select source-unique values as determined by function');
of(1, -1, 2, 3, 2)
  .pipe(distinct((val) => Math.abs(val)))
  .subscribe((val) => {
    console.log(val);
  });
//  Output:
//  1
//  2
//  3
