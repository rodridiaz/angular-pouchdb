import { Component, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { FieldConfig } from '../../field.interface';

@Component({
  selector: 'app-button',
  template: `
    <div [formGroup]="group">
      <!-- Button (Normal forms) -->
      <button
        *ngIf="!isWizardNextButton() && !isWizardPreviousButton()"
        [type]="field.type"
        mat-raised-button
        color="primary"
      >
        {{ field.label }}
      </button>

      <!-- Button (Next step button on normal wizard) -->
      <button
        *ngIf="isWizardNextButton()"
        matStepperNext
        [type]="field.type"
        mat-raised-button
        color="primary"
      >
        {{ field.label }}
      </button>

      <!-- Button (Previous step button on normal wizard) -->
      <button
        *ngIf="isWizardPreviousButton()"
        matStepperPrevious
        [type]="field.type"
        mat-raised-button
        color="primary"
      >
        {{ field.label }}
      </button>
    </div>
  `
})
export class ButtonComponent implements OnInit {
  field: FieldConfig;
  group: FormGroup;

  constructor() {}

  ngOnInit() {}

  isWizardNextButton() {
    return this.field.name === 'wizardNextButton';
  }

  isWizardPreviousButton() {
    return this.field.name === 'wizardPreviousButton';
  }
}
