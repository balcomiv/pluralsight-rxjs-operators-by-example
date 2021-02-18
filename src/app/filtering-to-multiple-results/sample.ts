/**
 * sample
 *  emit latest when signaled
 */

import { interval, Observable } from 'rxjs';
import { sample, take } from 'rxjs/operators';

const source = interval(100);
const notifier = new Observable((observer) => {
  setTimeout(() => {
    observer.next();
  }, 150);
  setTimeout(() => {
    observer.next();
  }, 350);
  setTimeout(() => {
    observer.next();
  }, 750);
});

console.log('# the source emits values every 100ms');
console.log('# the notifier signals at 150ms, 350ms, 750ms');
console.log('# at 150ms, the latest value is 0');
console.log('# at 350ms, the latest value is 2');
console.log('# at 750ms, the latest value is 6');

source.pipe(sample(notifier), take(3)).subscribe((x) => {
  console.log(x);
});
//  Output: 0, 2, 6
