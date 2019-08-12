import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, of } from 'rxjs';
import { switchMap, take } from 'rxjs/operators';

import { FieldConfig } from '../../../core/ui/form/field.interface';
import { ExerciseDetail, Pass } from '../../shared/exercise';
import { ExerciseFieldsConfig } from './exercise.config';

@Component({
  selector: 'app-exercise',
  templateUrl: './exercise.component.html',
  styleUrls: ['./exercise.component.css']
})
export class ExerciseComponent implements OnInit {
  exerciseDetail$: Observable<ExerciseDetail>;
  passes$: Observable<Pass[]>;

  fieldsConfig: FieldConfig[] = [];
  maxPassesAllowed: Number = 4;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.fieldsConfig = ExerciseFieldsConfig;

    this.exerciseDetail$ = this.route.data.pipe(
      take(1),
      switchMap(data => of(data.exerciseDetail))
    );

    this.passes$ = this.route.data.pipe(
      switchMap(data => of(data.exerciseDetail.passes))
    );
  }
}
