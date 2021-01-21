import { interval } from 'rxjs';
import { buffer, take } from 'rxjs/operators';

/**
 * emit value every 100ms
 * add values into a buffer
 * emit buffered values as array when 1000 ms passes
 * inner observable emits
 */
export function testBuffer(): void {
  // emit values ~100 ms
  interval(100)
    .pipe(
      buffer(interval(1000)), // <-- signal operator to shut down current batch, emit it, and start a new batch
      take(3) // <-- just to limit the life of the source observable
    )
    .subscribe((val) => {
      console.log(val);
    });
}
