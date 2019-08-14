import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';

import { StepConfig } from '../field.interface';
import { OptionBuilder, OptionObject } from '../utils/option-builder';
import { DynamicFormComponent } from '../dynamic-form/dynamic-form.component';

@Component({
  exportAs: 'dynamicFormWizard',
  selector: 'app-dynamic-form-wizard',
  templateUrl: './dynamic-form-wizard.component.html'
})
export class DynamicFormWizardComponent extends DynamicFormComponent
  implements OnInit, OnDestroy {
  @Input() steps: StepConfig[] = [];

  submitted: Boolean = false;

  constructor(private _fb: FormBuilder) {
    super(_fb);
  }

  ngOnInit() {
    this.form = this.createControl();
    this.subscribeControlsByVisibleIfConditions();
  }

  onSubmit(event: Event) {
    event.preventDefault();
    event.stopPropagation();
    if (this.form.valid) {
      this.submit.emit(this.form.value);
      this.submitted = true;
    } else {
      this.validateAllFormFields(this.form);
    }
  }

  // create control and add it to its corresponding step
  createControl(): FormGroup {
    const array = this._fb.array([]);
    this.steps.forEach(() => array.push(this._fb.group({})));

    const group = this._fb.group({
      formArray: array
    });

    this.fields.forEach(field => {
      if (['button', 'submit'].indexOf(field.type) !== -1) {
        return;
      }
      const control = this._fb.control(
        field.value,
        this.bindValidations(field.validations || [])
      );

      let ordinal = [];
      ordinal = this.getIndexOfArrayForm(field.name);

      this.addControlToStep(
        <FormGroup>group.get('formArray').get(ordinal),
        field.name,
        control
      );
    });
    return group;
  }

  getIndexOfArrayForm(fieldName: string): Number[][] {
    return this.steps
      .map((step, index) =>
        step.includedFields.filter(x => x === fieldName).map(() => index)
      )
      .filter(n => !!n.length);
  }

  addControlToStep(group: FormGroup, name: string, control: FormControl) {
    group.addControl(name, control);
  }

  controlSetSubscription(
    controlToSuscribe,
    customOptionObject: OptionObject
  ): void {
    let indexOfcontrolToSuscribe = [];
    let indexOfcustomOptionObject = [];
    indexOfcontrolToSuscribe = this.getIndexOfArrayForm(controlToSuscribe);
    indexOfcustomOptionObject = this.getIndexOfArrayForm(
      customOptionObject.config.name
    );

    this.subscription.add(
      this.form
        .get('formArray')
        .get(indexOfcontrolToSuscribe)
        .get(controlToSuscribe)
        .valueChanges.subscribe(val => {
          if (val === null) {
            return;
          }
          OptionBuilder.setSelectOptionsStates(
            customOptionObject,
            val,
            this.form
              .get('formArray')
              .get(indexOfcustomOptionObject) as FormGroup
          );
        })
    );
  }
}
