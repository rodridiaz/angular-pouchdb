import { Component, OnInit } from '@angular/core';
import { FieldConfig } from '../../../core/ui/form/field.interface';
import { ExerciseDetail, Pass } from '../../shared/exercise';
import { Observable, of } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { ExerciseFieldsConfig } from './exercise.config';

@Component({
  selector: 'app-exercise',
  templateUrl: './exercise.component.html',
  styleUrls: ['./exercise.component.css']
})
export class ExerciseComponent implements OnInit {
  fieldsConfig: FieldConfig[] = [];

  passes$: Observable<Pass[]>;

  maxPassesAllowed: Number = 4;

  exerciseDetail$: Observable<ExerciseDetail>;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.fieldsConfig = ExerciseFieldsConfig;

    this.exerciseDetail$ = this.route.data.pipe(
      switchMap(data => of(data.exerciseDetail))
    );

    this.passes$ = this.route.data.pipe(
      switchMap(data => of(data.exerciseDetail.passes))
    );
  }
}
