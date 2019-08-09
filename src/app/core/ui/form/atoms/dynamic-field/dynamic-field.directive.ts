import {
  ComponentFactoryResolver,
  ComponentRef,
  Directive,
  Input,
  OnInit,
  ViewContainerRef
} from '@angular/core';
import { FormGroup } from '@angular/forms';

import { FieldConfig, StepConfig } from '../../field.interface';
import { ButtonComponent } from '../button/button.component';
import { SelectComponent } from '../select/select.component';
import { InputComponent } from '../input/input.component';

const componentMapper = {
  input: InputComponent,
  button: ButtonComponent,
  submit: ButtonComponent,
  select: SelectComponent
};

@Directive({
  selector: '[appDynamicField]'
})
export class DynamicFieldDirective implements OnInit {
  @Input() field: FieldConfig;
  @Input() group: FormGroup;
  @Input() step?: StepConfig;

  componentRef: any;

  constructor(
    private resolver: ComponentFactoryResolver,
    private container: ViewContainerRef
  ) {}

  ngOnInit() {
    if (
      !this.isWizardForm() ||
      (this.isWizardForm() && this.fieldBelongToThisStep())
    ) {
      const factory = this.resolver.resolveComponentFactory(
        componentMapper[this.field.type]
      );
      this.componentRef = this.container.createComponent(factory);
      this.componentRef.instance.field = this.field;
      this.componentRef.instance.group = this.group;
    }
  }

  private isWizardForm() {
    return !!this.step;
  }

  private fieldBelongToThisStep() {
    return this.step.includedFields.indexOf(this.field.name) !== -1;
  }
}
