import { Component, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FieldConfig } from '../../field.interface';

@Component({
  selector: 'app-button',
  template: `
    <div class="demo-full-width margin-top" [formGroup]="group">
      <button *ngIf="!isWizardNextButton() && !isWizardPreviousButton()" matStepperNext [type]="field.type" mat-raised-button color="primary">{{field.label}}</button>
      <button *ngIf="isWizardNextButton()" matStepperNext [type]="field.type" mat-raised-button color="primary">{{field.label}}</button>
      <button *ngIf="isWizardPreviousButton()" matStepperPrevious [type]="field.type" mat-raised-button color="primary">{{field.label}}</button>
    </div>
  `,
  styles: []
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
