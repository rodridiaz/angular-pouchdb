import { Component, OnInit } from '@angular/core';

import { Exercise } from '../../shared/exercise';
import { ExerciseService } from '../../shared/exercise.service';
import { Observable } from 'rxjs';
import * as moment from 'moment';

const COLUMNS: any[] = [
  { columnDef: 'name', header: 'name', dataName: row => row.name },
  {
    columnDef: 'minScore',
    header: 'minimum score',
    dataName: row => row.minScore
  },
  {
    columnDef: 'createdDate',
    header: 'creation date',
    dataName: row => moment(row.createdDate).format('YYYY-MM-DD HH:mm')
  }
];

@Component({
  selector: 'app-exercises',
  templateUrl: './exercises.component.html',
  styleUrls: ['./exercises.component.css']
})
export class ExercisesComponent implements OnInit {
  rows$: Observable<Exercise[]>;
  columns: any[] = [];

  constructor(private service: ExerciseService) {}

  ngOnInit() {
    this.rows$ = this.service.getExercises();
    this.columns = COLUMNS;
  }
}
