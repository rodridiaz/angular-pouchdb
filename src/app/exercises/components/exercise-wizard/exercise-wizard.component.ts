import {
  Component,
  ViewChild,
  Input,
  EventEmitter,
  Output
} from '@angular/core';
import * as moment from 'moment';

import { StepConfig, FieldConfig } from '../../../core/ui/form/field.interface';
import { DynamicFormWizardComponent } from '../../../core/ui';
import { ExerciseDetail } from '../../shared/exercise';

@Component({
  selector: 'app-exercise-wizard',
  templateUrl: './exercise-wizard.component.html',
  styleUrls: ['./exercise-wizard.component.css']
})
export class ExerciseWizardComponent {
  @ViewChild(DynamicFormWizardComponent) form: DynamicFormWizardComponent;

  @Input() stepsConfig: StepConfig[];
  @Input() fieldsConfig: FieldConfig[];

  @Output() submitted: EventEmitter<any> = new EventEmitter<any>();

  submit(value: { [name: string]: any }) {
    const payload: ExerciseDetail = {
      id: this.newGuid(),
      name: value.formArray[0].name,
      minScore: value.formArray[0].minScore,
      createdDate: moment(moment.now()),
      jointType: value.formArray[0].jointType,
      jointTypePosition: value.formArray[0].jointTypePosition,
      jointTypeBaseMaterial: value.formArray[0].jointTypeBaseMaterial,
      passes: [value.formArray[1]]
    };
    this.submitted.emit(payload);
  }

  // Helper
  private newGuid(): string {
    function s4() {
      return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
    }

    return `${s4()}${s4()}-${s4()}-${s4()}-${s4()}-${s4()}${s4()}${s4()}`;
  }
}
