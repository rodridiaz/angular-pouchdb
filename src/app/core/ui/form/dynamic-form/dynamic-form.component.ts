import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  OnDestroy
} from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { FieldConfig } from '../field.interface';
import { OptionBuilder, OptionObject } from '../utils/option-builder';
import { Subscription } from 'rxjs';

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
export class DynamicFormComponent implements OnInit, OnDestroy {
  @Input() fields: FieldConfig[] = [];
  @Input() data?: any;

  @Output() submit?: EventEmitter<any> = new EventEmitter<any>();
  @Output() update?: EventEmitter<any> = new EventEmitter<any>();

  subscription: Subscription = new Subscription();

  form: FormGroup;

  get value() {
    return this.form.value;
  }

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.form = this.createControl();
    this.subscribeControlsByVisibleIfConditions();

    if (!!this.data) {
      this.form.patchValue(this.data);
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  subscribeControlsByVisibleIfConditions(): void {
    this.fields
      // get all the dropdowns with a visibleIf
      .filter((config: FieldConfig) =>
        OptionBuilder.selectFieldHasVisibleIf(config)
      )
      // by each one, build object that include its dependant controls
      .map((selectFieldsWithVisibleIf: FieldConfig) =>
        OptionBuilder.optionObjectBuilder(selectFieldsWithVisibleIf)
      )
      //subscribe them to these dependant controls
      .forEach((customOptionObject: OptionObject) =>
        this.setSubscriptions(customOptionObject)
      );
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

  createControl(): FormGroup {
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

  setSubscriptions(customOptionObject: OptionObject): void {
    customOptionObject.controlsToSubscribe.forEach(controlToSuscribe => {
      this.controlSetSubscription(controlToSuscribe, customOptionObject);
    });
  }

  controlSetSubscription(
    controlToSuscribe,
    customOptionObject: OptionObject
  ): void {
    if (this.form.get(controlToSuscribe) !== null) {
      this.subscription.add(
        this.form.get(controlToSuscribe).valueChanges.subscribe(val => {
          OptionBuilder.setSelectOptionsStates(
            customOptionObject,
            val,
            this.form
          );
        })
      );
    }
  }
}
