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
import { FieldConfig } from '../field.interface';

import { OptionBuilder } from '../utils/option-builder';

@Component({
  exportAs: 'dynamicForm',
  selector: 'app-dynamic-form',
  template: `
    <form class="dynamic-form" [formGroup]="form" (submit)="onSubmit($event)">
    <ng-container
      *ngFor="let field of fields;"
      appDynamicField
      [field]="field"
      [group]="form">
    </ng-container>
    </form>
  `,
  styles: []
})
export class DynamicFormComponent implements OnInit {
  @Input() fields: FieldConfig[] = [];

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
      if (field.type === 'button') { return; }
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
