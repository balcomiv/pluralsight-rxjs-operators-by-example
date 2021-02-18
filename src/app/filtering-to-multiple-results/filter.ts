/**
 * filter
 *  emit only values matching a given condition
 */

import { of } from 'rxjs';
import { filter } from 'rxjs/operators';

of(1, 2, 3, 4, 5, 6, 7, 8)
  .pipe(filter((x) => x % 2 === 0))
  .subscribe((x) => {
    console.log(x);
  });
//  Output:
//  2, 4, 6, 8
