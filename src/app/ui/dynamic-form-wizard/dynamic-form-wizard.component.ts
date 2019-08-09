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
    <form class="dynamic-form-wizard" [formGroup]="form" (submit)="onSubmit($event)">
    <mat-vertical-stepper linear="false" #stepper>
      <mat-step [stepControl]="form" *ngFor="let step of steps">
      <ng-template matStepLabel>{{step.label}}</ng-template>
        <ng-container
          *ngFor="let field of fields;"
          appDynamicField
          [step]="step"
          [field]="field"
          [group]="form">
        </ng-container>
      </mat-step>
      <mat-step>
        <ng-template matStepLabel>Done</ng-template>
        You are now done.
        <div>
          <button mat-button matStepperPrevious type="button">Back</button>
          <button mat-button (click)="stepper.reset()" type="button">Reset</button>
          <button mat-button matStepperPrevious type="submit">Submit</button>
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
    const group = this.fb.group({});
    this.fields.forEach(field => {
      if (['button', 'submit'].indexOf(field.type) !== -1) { return; }
      const control = this.fb.control(
        field.value,
        this.bindValidations(field.validations || [])
      );
      group.addControl(field.name, control);
    });
    return group;
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
    this.form.get(control).valueChanges.subscribe(val => {
      OptionBuilder.setSelectOptionsStates(field, val, this.form);
    });
  }
}
