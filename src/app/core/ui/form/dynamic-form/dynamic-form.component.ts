import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { FieldConfig } from '../field.interface';
import { OptionBuilder } from '../utils/option-builder';

@Component({
  exportAs: 'dynamicForm',
  selector: 'app-dynamic-form',
  template: `
    <form [formGroup]="form" (submit)="onSubmit($event)">
      <!-- Form Controls -->
      <ng-container
        *ngFor="let field of fields"
        appDynamicField
        [field]="field"
        [group]="form"
      >
      </ng-container>
    </form>
  `
})
export class DynamicFormComponent implements OnInit {
  @Input() fields: FieldConfig[] = [];
  @Input() data?: any;

  @Output() submit?: EventEmitter<any> = new EventEmitter<any>();
  @Output() update?: EventEmitter<any> = new EventEmitter<any>();

  form: FormGroup;

  get value() {
    return this.form.value;
  }
  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.form = this.createControl();
    this.onChanges();
    if (!!this.data) {
      this.form.patchValue(this.data);
    }
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
      if (!!this.data) {
        this.update.emit(this.form.value);
      } else {
        this.submit.emit(this.form.value);
      }
    } else {
      this.validateAllFormFields(this.form);
    }
  }

  createControl() {
    const group = this.fb.group({});
    this.fields.forEach(field => {
      if (['button', 'submit'].indexOf(field.type) !== -1) {
        return;
      }
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
