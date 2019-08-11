import { Injectable } from '@angular/core';
import { ExerciseDetail } from '../../shared/exercise';
import { Router, ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { ExerciseService } from '../../shared/exercise.service';
import { Observable, EMPTY, of } from 'rxjs';
import { take, mergeMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ExerciseDetailResolverService implements Resolve<ExerciseDetail> {
  constructor(
    private exerciseService: ExerciseService,
    private router: Router
  ) {}

  resolve(
    route: ActivatedRouteSnapshot
  ): Observable<ExerciseDetail> | Observable<never> {
    const id = route.paramMap.get('id');

    return this.exerciseService.getExercise(id).pipe(
      take(1),
      mergeMap((response: any) => {
        if (response.status === 404) {
          // id not found
          this.router.navigate(['/404']);
          return EMPTY;
        } else {
          return of(<ExerciseDetail>response);
        }
      })
    );
  }
}
