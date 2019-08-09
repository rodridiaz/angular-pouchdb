import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output
} from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl
} from '@angular/forms';
import { FieldConfig, StepConfig } from '../field.interface';

import { OptionBuilder } from '../utils/option-builder';

@Component({
  exportAs: 'dynamicFormWizard',
  selector: 'app-dynamic-form-wizard',
  template: `
    <form
      [formGroup]="form"
      (submit)="onSubmit($event)">

    <mat-vertical-stepper
      [linear]="true"
      #stepper
      formArrayName="formArray">

      <!-- Step -->
      <mat-step
        [formGroupName]="i"
        [stepControl]="form.get('formArray').get([i])"
        *ngFor="let step of steps; let i = index;">

        <ng-template matStepLabel>
          {{step.label}}
        </ng-template>

        <!-- Form Control -->
        <ng-container
          *ngFor="let field of fields;"
          appDynamicField
          [step]="step"
          [field]="field"
          [group]="form.get('formArray').get([i])">
        </ng-container>

      </mat-step>

      <!-- Fixed last Step -->
      <mat-step>
        <ng-template matStepLabel>Done</ng-template>
        You are now done.
        <div>
          <button mat-button matStepperPrevious type="button">Back</button>
          <button mat-button (click)="stepper.reset()" type="button">Reset</button>
          <button mat-button type="submit">Submit</button>
        </div>
      </mat-step>

    </mat-vertical-stepper>
    </form>
  `,
  styles: []
})
export class DynamicFormWizardComponent implements OnInit {

  @Input() fields: FieldConfig[] = [];
  @Input() steps: StepConfig[] = [];

  @Output() submit: EventEmitter<any> = new EventEmitter<any>();

  form: FormGroup;

  get value() {
    return this.form.value;
  }

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.form = this.createControl();
    this.onChanges();
  }

  onChanges(): void {
    this.fields
      .filter(config => OptionBuilder.getSelectFieldsWithVisibleIf(config))
      .map(config => OptionBuilder.optionObjectBuilder(config))
      .forEach(customOptionObject => this.setSubscriptions(customOptionObject));
  }

  onSubmit(event: Event) {
    event.preventDefault();
    event.stopPropagation();
    if (this.form.valid) {
      this.submit.emit(this.form.value);
    } else {
      this.validateAllFormFields(this.form);
    }
  }

  createControl() {
    const array = this.fb.array([]);
    this.steps.forEach(() => array.push(this.fb.group({})));

    const group = this.fb.group({
      formArray: array
    });

    this.fields.forEach(field => {
      if (['button', 'submit'].indexOf(field.type) !== -1) { return; }
      const control = this.fb.control(
        field.value,
        this.bindValidations(field.validations || [])
      );

      let ordinal = [];
      ordinal = this.getArrayIndexOfControl(field.name);

      this.addControlToStep(
        <FormGroup>group.get('formArray').get(ordinal),
        field.name,
        control);
    });
    return group;
  }

  getArrayIndexOfControl(fieldName: string) {
    return this.steps
        .map((step, index) => step.includedFields
          .filter(x => x === fieldName)
          .map(() => index)
        ).filter((n) => !!n.length);
  }

  addControlToStep(group: FormGroup, name: string, control: FormControl) {
    group.addControl(name, control);
  }

  bindValidations(validations: any) {
    if (validations.length > 0) {
      const validList = [];
      validations.forEach(valid => {
        validList.push(valid.validator);
      });
      return Validators.compose(validList);
    }
    return null;
  }

  validateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      control.markAsTouched({ onlySelf: true });
    });
  }

  setSubscriptions(field): void {
    field.controlsToSubscribe.forEach(controlToSuscribe => {
      this.controlSetSubscription(controlToSuscribe, field);
    });
  }

  controlSetSubscription(control, field): void {
    let ordinal = [];
    ordinal = this.getArrayIndexOfControl(control);

    this.form.get('formArray').get(ordinal).get(control).valueChanges.subscribe(val => {
      OptionBuilder.setSelectOptionsStates(field, val, this.form);
    });
  }
}
