import {
  ComponentFactoryResolver,
  ComponentRef,
  Directive,
  Input,
  OnInit,
  ViewContainerRef,
  OnChanges
} from '@angular/core';
import { FormGroup } from '@angular/forms';

import { FieldConfig } from '../field.interface';
import { ButtonComponent } from '../button/button.component';
import { SelectComponent } from '../select/select.component';
import { InputComponent } from '../input/input.component';


const componentMapper = {
  input: InputComponent,
  button: ButtonComponent,
  select: SelectComponent,
};

@Directive({
  selector: '[appDynamicField]'
})
export class DynamicFieldDirective implements OnInit, OnChanges {
  @Input() field: FieldConfig;
  @Input() group: FormGroup;

  componentRef: any;

  constructor(
    private resolver: ComponentFactoryResolver,
    private container: ViewContainerRef
  ) {}

  ngOnInit() {
    const factory = this.resolver.resolveComponentFactory(
      componentMapper[this.field.type]
    );
    this.componentRef = this.container.createComponent(factory);
    this.componentRef.instance.field = this.field;
    this.componentRef.instance.group = this.group;
  }

  ngOnChanges() {
    console.log();
  }
}
