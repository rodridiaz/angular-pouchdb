import { Component, ViewChild, Input } from '@angular/core';
import { FieldConfig } from '../../../core/ui/form/field.interface';
import { DynamicFormComponent } from '../../../core/ui';
import { ExerciseDetail } from '../../shared/exercise';
import { ExerciseService } from '../../shared/exercise.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-exercise-details',
  templateUrl: './exercise-details.component.html',
  styleUrls: ['./exercise-details.component.css']
})
export class ExerciseDetailsComponent {
  @ViewChild(DynamicFormComponent) form: DynamicFormComponent;

  @Input() fieldsConfig: FieldConfig[];
  @Input() data: ExerciseDetail;

  constructor(
    private service: ExerciseService,
    private snackBar: MatSnackBar
  ) {}

  submit(value: { [name: string]: any }) {
    value.id = this.data.id;
    value.passes = this.data.passes;
    console.log('Update exercise with value: ' + JSON.stringify(value));
    this.service.addExercise(<ExerciseDetail>value).subscribe((res: any) => {
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
