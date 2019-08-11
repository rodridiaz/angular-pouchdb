import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';
import { map } from 'rxjs/operators';

import { PouchdbService } from '../../core/pouchdb/pouchdb.service';
import { ExerciseDetail, Exercise } from './exercise';

@Injectable({
  providedIn: 'root'
})
export class ExerciseService {
  constructor(private service: PouchdbService) {}

  getExercise(id: string): Observable<ExerciseDetail> {
    return from(this.service.get(id));
  }

  addExercise(exercise: ExerciseDetail): Observable<ExerciseDetail> {
    return from(this.service.put(exercise.id, exercise));
  }

  removeExercise(id: string): Observable<ExerciseDetail> {
    return from(this.service.remove(id));
  }

  getExercises(): Observable<Exercise[]> {
    return from(this.service.fetch()).pipe(
      map((data: any) =>
        data.rows.map(item => {
          return {
            id: item.doc.id,
            name: item.doc.name,
            minScore: item.doc.minScore,
            createdDate: item.doc.createdDate
          };
        })
      )
    );
  }
}
