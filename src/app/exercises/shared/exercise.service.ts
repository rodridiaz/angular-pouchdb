import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { EXERCISE_DETAIL } from './mock-exercise-detail';
import { of, Observable } from 'rxjs';
import { ExerciseDetail } from './exercise';

@Injectable({
  providedIn: 'root'
})
export class ExerciseService {
  constructor() {}

  getExerciseDetail(id: string): Observable<ExerciseDetail> {
    return of(EXERCISE_DETAIL).pipe(map(response => response));
  }
}
