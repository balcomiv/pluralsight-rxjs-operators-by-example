import { ActivatedRoute, Params } from '@angular/router';
import { BehaviorSubject, combineLatest, interval, of, timer } from 'rxjs';
import { map, startWith, switchMap, take, tap } from 'rxjs/operators';

const TASK_REFRESH_INTERVAL_MS = 1000;

export class TaskComponent {
  constructor(
    // private readonly http: HttpClient,
    private readonly route: ActivatedRoute
  ) {}

  private readonly autoRefresh$ = interval(TASK_REFRESH_INTERVAL_MS).pipe(
    startWith(0)
  );

  private readonly refreshToken$ = new BehaviorSubject(undefined);

  private readonly task$ = combineLatest([
    this.route.params,
    this.autoRefresh$,
    this.refreshToken$,
  ]).pipe(
    switchMap(([params]) => {
      //  this.http.get(`/api/tasks/${params.task_id}`)
      return of(`Got data with params ${params.task_id}`);
    })
  );

  markAsComplete(): void {
    this.route.params
      .pipe(
        tap((params) => console.log('Params: ', params)),
        map((params) => params.task_id),
        switchMap((taskId) =>
          //   this.http.post(`/api/tasks/${taskId}`, {
          //     //  state: State.Done,
          //     state: 'Done',
          //   })
          of('')
        )
      )
      .subscribe(() => this.refreshToken$.next(undefined));
  }

  testShit(): void {
    // timerOne emits first value at 1s, then once every 4s
    const timerOne$ = timer(1000, 4000);
    // timerTwo emits first value at 2s, then once every 4s
    const timerTwo$ = timer(2000, 4000);
    // timerThree emits first value at 3s, then once every 4s
    const timerThree$ = timer(3000, 4000);

    // when one timer emits, emit the latest values from each timer as an array
    combineLatest([timerOne$, timerTwo$, timerThree$])
      .pipe(
        take(1),
        tap(([one]) => console.log('Value: ', one)),
        switchMap(([one, two, three]) => of(''))
      )
      .subscribe();
  }
}

new TaskComponent({
  params: of({ task_id: 1 } as Params),
} as ActivatedRoute).markAsComplete();
