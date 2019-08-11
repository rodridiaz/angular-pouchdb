import { Injectable } from '@angular/core';
import { EXERCISE_DETAILS } from './mock-exercise-detail';
import { of, Observable } from 'rxjs';
import { ExerciseDetail } from './exercise';

@Injectable({
  providedIn: 'root'
})
export class ExerciseService {
  constructor() {}

  getExerciseDetail(id: string): Observable<ExerciseDetail> {
    return of(EXERCISE_DETAILS.find(ex => ex.id === id));
  }
}
