import { Injectable } from '@angular/core';
import { ExerciseDetail } from '../../shared/exercise';
import {
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Resolve
} from '@angular/router';
import { ExerciseService } from '../../shared/exercise.service';
import { Observable, EMPTY, of } from 'rxjs';
import { take, mergeMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ExerciseDetailResolverService implements Resolve<ExerciseDetail> {
  constructor(private ex: ExerciseService, private router: Router) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<ExerciseDetail> | Observable<never> {
    const id = route.paramMap.get('id');

    return this.ex.getExerciseDetail(id).pipe(
      take(1),
      mergeMap(exercise => {
        if (exercise) {
          return of(exercise);
        } else {
          // id not found
          this.router.navigate(['/exercises']);
          return EMPTY;
        }
      })
    );
  }
}
