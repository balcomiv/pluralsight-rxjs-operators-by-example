import { of } from 'rxjs';
import { distinctUntilChanged } from 'rxjs/operators';

/**
 * distinctUntilChanged
 *  do not emit value until changed from previous (look back window of only 1)
 */

of(1, 1, 1, 2, 1, 2, 3)
  .pipe(distinctUntilChanged())
  .subscribe((val) => {
    console.log(val);
  });
//  Output:
//  1, 2, 1, 2, 3

console.log(
  '------------------------------------------------------------------------------------'
);
console.log(
  '# emit only values if mapper function return value that changes from previous one'
);
of(1, -1, 2, -2, 1, 2)
  .pipe(distinctUntilChanged((x, y) => Math.abs(x) === Math.abs(y)))
  .subscribe((val) => {
    console.log(val);
  });
// Output: 1, 2, 1, 2
