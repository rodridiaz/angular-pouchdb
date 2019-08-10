import { Component, ViewChild, Input } from '@angular/core';
import { FieldConfig } from '../../../core/ui/form/field.interface';
import { DynamicFormComponent } from '../../../core/ui';
import { ExerciseDetail } from '../../shared/exercise';

@Component({
  selector: 'app-exercise-details',
  templateUrl: './exercise-details.component.html',
  styleUrls: ['./exercise-details.component.css']
})
export class ExerciseDetailsComponent {
  @ViewChild(DynamicFormComponent) form: DynamicFormComponent;

  @Input() fieldsConfig: FieldConfig[];
  @Input() data: ExerciseDetail;

  submit(value: { [name: string]: any }) {
    console.log('Create exercise with value: ' + JSON.stringify(value));
  }
}
