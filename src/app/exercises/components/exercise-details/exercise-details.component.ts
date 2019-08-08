import { Component, ViewChild } from '@angular/core';
import { FieldConfig } from 'src/app/ui/field.interface';
import { DynamicFormComponent } from 'src/app/ui';
import { Validators } from '@angular/forms';
import { JointTypesEnumn, JointTypePositionsEnum, JointTypeBaseMaterialsEnum } from '../../shared/exercise';

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
      inputType: 'text',
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
      options: [JointTypesEnumn.BasedOnPlate, JointTypesEnumn.T, JointTypesEnumn.Lap],
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
        JointTypePositionsEnum.F1,
        JointTypePositionsEnum.F2,
        JointTypePositionsEnum.F3,
        JointTypePositionsEnum.F4,
        JointTypePositionsEnum.F5,
        JointTypePositionsEnum.F6
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
        JointTypeBaseMaterialsEnum.CarbonSteel,
        JointTypeBaseMaterialsEnum.StainlessSteel
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
      type: 'button',
      label: 'Save'
    }
  ];

  submit(value: {[name: string]: any}) {
    console.log(value);
  }

}


