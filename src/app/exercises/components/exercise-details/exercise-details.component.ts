import { Component, ViewChild, Input } from '@angular/core';
import { FieldConfig } from '../../../core/ui/form/field.interface';
import { DynamicFormComponent } from '../../../core/ui';
import { ExerciseDetail } from '../../shared/exercise';
import { MatDialogConfig, MatDialog } from '@angular/material';
import { PassDialogComponent } from '../pass-dialog/pass-dialog.component';

@Component({
  selector: 'app-exercise-details',
  templateUrl: './exercise-details.component.html',
  styleUrls: ['./exercise-details.component.css']
})
export class ExerciseDetailsComponent {
  @ViewChild(DynamicFormComponent) form: DynamicFormComponent;

  @Input() fieldsConfig: FieldConfig[];
  @Input() data: ExerciseDetail;

  constructor(private dialog: MatDialog) {}

  submit(value: { [name: string]: any }) {
    console.log('Create exercise with value: ' + JSON.stringify(value));
  }

  newPass(dynamicForm: DynamicFormComponent) {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.autoFocus = true;

    const dialogRef = this.dialog.open(PassDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(val => {
      console.log('Dialog output:', val);
    });
  }
}
