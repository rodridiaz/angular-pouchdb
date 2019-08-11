import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { Observable } from 'rxjs';

import { Exercise } from '../../shared/exercise';
import { DynamicTableComponent } from '../../../core/ui';
import { ExerciseService } from '../../shared/exercise.service';

@Component({
  selector: 'app-exercises-list',
  templateUrl: './exercises-list.component.html',
  styleUrls: ['./exercises-list.component.css']
})
export class ExercisesListComponent implements OnInit {
  @ViewChild(DynamicTableComponent) table: DynamicTableComponent;

  @Input() rows$: Observable<Exercise[]>;
  @Input() columns: any[];

  constructor(
    private service: ExerciseService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {}

  removedElement(data: { index: number; element: any }) {
    this.service.removeExercise(data.element.id).subscribe((res: any) => {
      if (res.ok) {
        this.snackBar.open('Exercise removed 👍', null, {
          duration: 2000
        });
      } else {
        this.snackBar.open('Failed to remove 😕', null, {
          duration: 2000
        });
      }
    });

    this.table.dataSource.data.splice(data.index, 1);
    this.table.dataSource._updateChangeSubscription();
  }
}
