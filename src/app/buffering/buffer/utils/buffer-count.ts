/**
 * bufferCount
 * @description add value into buffer until full, then emit the buffer
 */

import { of } from 'rxjs';
import { bufferCount } from 'rxjs/operators';

/**
 * Emit buffer of 2 values, or when complete
 *
 * @example
 *      Output:
 *          [1, 2]
 *          [3]
 */
export function bufferCountExampleOne(): void {
  of(1, 2, 3)
    .pipe(bufferCount(2))
    .subscribe((sequence) => {
      console.log(sequence);
    });
}

/**
 * Emit buffer of 2 values
 * Start a new buffer when a new value emitted
 * Note: Multiple buffers can coexist!
 *
 * @example
 *      Output:
 *          [1, 2]
 *          [2, 3]
 *          [3]
 */
export function bufferCountExampleTwo(): void {
  of(1, 2, 3)
    .pipe(bufferCount(2, 1)) // <-- optional param that says to start new buffer every '1' emit
    .subscribe((sequence) => {
      console.log(sequence);
    });
}

//
//  Quokka testing only
//
if (true) {
  bufferCountExampleOne();
  bufferCountExampleTwo();
}
