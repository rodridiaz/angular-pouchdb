import { Component, ViewChild } from '@angular/core';
import { FieldConfig } from '../../../core/ui/form/field.interface';
import { DynamicFormComponent } from '../../../core/ui/form';
import { Validators } from '@angular/forms';
import {
  JointTypesEnumn,
  JointTypePositionsEnum,
  JointTypeBaseMaterialsEnum
} from '../../shared/exercise';

@Component({
  selector: 'app-exercise-details',
  templateUrl: './exercise-details.component.html',
  styleUrls: ['./exercise-details.component.css']
})
export class ExerciseDetailsComponent {
  @ViewChild(DynamicFormComponent) form: DynamicFormComponent;

  regConfig: FieldConfig[] = [
    {
      type: 'input',
      label: 'Name',
      inputType: 'text',
      name: 'name',
      validations: [
        {
          name: 'required',
          validator: Validators.required,
          message: 'Name required'
        }
      ]
    },
    {
      type: 'input',
      label: 'Minimum score',
      inputType: 'number',
      name: 'minScore',
      validations: [
        {
          name: 'required',
          validator: Validators.required,
          message: 'Minimum score required'
        }
      ]
    },
    {
      type: 'select',
      label: 'Joint type',
      name: 'jointType',
      options: [
        { value: JointTypesEnumn.BasedOnPlate },
        { value: JointTypesEnumn.T },
        { value: JointTypesEnumn.Lap }
      ],
      validations: [
        {
          name: 'required',
          validator: Validators.required,
          message: 'Joint type required'
        }
      ]
    },
    {
      type: 'select',
      label: 'Joint type position',
      name: 'jointTypePosition',
      options: [
        {
          value: JointTypePositionsEnum.F1,
          visibleIf: [
            { jointType: JointTypesEnumn.BasedOnPlate },
            { jointType: JointTypesEnumn.T }
          ]
        },
        {
          value: JointTypePositionsEnum.F2
        },
        {
          value: JointTypePositionsEnum.F3,
          visibleIf: [
            { jointType: JointTypesEnumn.BasedOnPlate },
            { jointType: JointTypesEnumn.T }
          ]
        },
        {
          value: JointTypePositionsEnum.F4,
          visibleIf: [
            { jointType: JointTypesEnumn.T },
            { jointType: JointTypesEnumn.Lap }
          ]
        },
        {
          value: JointTypePositionsEnum.F5,
          visibleIf: [
            { jointType: JointTypesEnumn.T },
            { jointType: JointTypesEnumn.Lap }
          ]
        },
        {
          value: JointTypePositionsEnum.F6,
          visibleIf: {
            jointType: JointTypesEnumn.T
          }
        }
      ],
      validations: [
        {
          name: 'required',
          validator: Validators.required,
          message: 'Joint type position required'
        }
      ]
    },
    {
      type: 'select',
      label: 'Joint type material',
      name: 'jointTypeMaterial',
      options: [
        { value: JointTypeBaseMaterialsEnum.CarbonSteel },
        { value: JointTypeBaseMaterialsEnum.StainlessSteel }
      ],
      validations: [
        {
          name: 'required',
          validator: Validators.required,
          message: 'Joint type material required'
        }
      ]
    },
    {
      type: 'submit',
      label: 'Save',
      name: 'saveButton'
    }
  ];

  submit(value: { [name: string]: any }) {
    console.log(value);
  }
}
