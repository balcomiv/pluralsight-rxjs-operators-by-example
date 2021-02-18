import { of } from 'rxjs';
import { distinctUntilKeyChanged } from 'rxjs/operators';

const posts = [
  { postId: 1, likes: 2, author: { id: 1 } },
  { postId: 2, likes: 6, author: { id: 12 } },
  { postId: 3, likes: 6, author: { id: 12 } },
  { postId: 4, likes: 9, author: { id: 14 } },
  { postId: 5, likes: 2, author: { id: 15 } },
];

console.log('# show only changes in "likes" property from previous');
of(...posts)
  .pipe(distinctUntilKeyChanged('likes'))
  .subscribe((val) => {
    console.log(`${val.postId}, ${val.likes}`);
  });
//  Output:
//  1, 2
//  2, 6
//  4, 9
//  5, 2

console.log('# show only changes in nested property from previous');
of(...posts)
  .pipe(distinctUntilKeyChanged('author', (a1, a2) => a1.id === a2.id))
  .subscribe((val) => {
    console.log(`${val.postId}, ${val.author.id}`);
  });
//  Output:
//  1, 1
//  2, 12
//  4, 14
//  5, 15
