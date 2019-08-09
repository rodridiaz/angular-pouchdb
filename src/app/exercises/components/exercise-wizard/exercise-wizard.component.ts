import { Component, ViewChild, Input } from '@angular/core';
import { StepConfig, FieldConfig } from '../../../core/ui/form/field.interface';
import { DynamicFormWizardComponent } from '../../../core/ui';

@Component({
  selector: 'app-exercise-wizard',
  templateUrl: './exercise-wizard.component.html',
  styleUrls: ['./exercise-wizard.component.css']
})
export class ExerciseWizardComponent {
  @ViewChild(DynamicFormWizardComponent) form: DynamicFormWizardComponent;

  @Input() stepsConfig: StepConfig[];
  @Input() fieldsConfig: FieldConfig[];

  submit(value: { [name: string]: any }) {
    console.log(value);
  }
}
