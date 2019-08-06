import {Component, OnInit, Input} from '@angular/core';
import { FormGroup, FormControl} from '@angular/forms';
import { FieldConfig } from './field-config.interface';
import { OptionBuilder } from './utils/option-builder';

@Component({
  selector: 'app-exercise-form-wizard',
  templateUrl: './exercise-form-wizard.component.html',
  styleUrls: ['./exercise-form-wizard.component.css']
})
export class ExerciseFormWizardComponent implements OnInit {
  isLinear = true;
  @Input() fieldsConfig: FieldConfig[];
  form: FormGroup;

  constructor() {}

  ngOnInit() {
    const formGroup = {};

    this.fieldsConfig.forEach(formControl => {
      formGroup[formControl.key] = new FormControl('');
    });

    this.form = new FormGroup(formGroup);
    this.onChanges();
  }

  onChanges(): void {
    this.fieldsConfig
      .filter(config => OptionBuilder.retrieveSelectFieldsWithVisibleIf(config))
      .map(config => OptionBuilder.optionObjectBuilder(config))
      .forEach(customOptionObject => this.setSubscriptions(customOptionObject));
  }

  onSubmit(): void {
    if (this.form.valid) {
      console.log(this.form.value);
    }
  }

  setSubscriptions(field): void {
    field.controlsToSubscribe.forEach(controlToSuscribe => {
      this.controlSetSubscription(controlToSuscribe, field);
    });
  }

  controlSetSubscription(control, field): void {
    this.form.get(control).valueChanges.subscribe(val => {
      OptionBuilder.setSelectOptionsStates(field, val, this.form);
    });
  }
}
