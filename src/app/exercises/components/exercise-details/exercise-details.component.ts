import { Component, Input } from '@angular/core';
import { MatSnackBar } from '@angular/material';

import { FieldConfig } from '../../../core/ui/form/field.interface';
import { ExerciseDetail } from '../../shared/exercise';
import { ExerciseService } from '../../shared/exercise.service';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-exercise-details',
  templateUrl: './exercise-details.component.html',
  styleUrls: ['./exercise-details.component.css']
})
export class ExerciseDetailsComponent {
  @Input() fieldsConfig: FieldConfig[];
  @Input() data: ExerciseDetail;

  constructor(
    private service: ExerciseService,
    private snackBar: MatSnackBar
  ) {}

  submit(value: any) {
    value.id = this.data.id;
    value.passes = this.data.passes;

    this.service
      .addExercise(<ExerciseDetail>value)
      .pipe(take(1))
      .subscribe((res: any) => {
        if (res.ok) {
          this.snackBar.open('Exercise updated 🙂', null, {
            duration: 2000
          });
        } else {
          this.snackBar.open('Failed to update 😕', null, {
            duration: 2000
          });
        }
      });
  }
}
