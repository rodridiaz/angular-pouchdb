import { FieldConfig } from '../../../core/ui/form/field.interface';
import { Validators } from '@angular/forms';

import {
  JointTypesEnumn,
  JointTypePositionsEnum,
  JointTypeBaseMaterialsEnum
} from '../../shared/exercise';

export const ExerciseFieldsConfig: FieldConfig[] = [
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
      },
      {
        name: 'min',
        validator: Validators.min(0),
        message: 'Number should be greater than 0'
      },
      {
        name: 'max',
        validator: Validators.max(100),
        message: 'Number should be less than 100'
      }
    ]
  },
  {
    type: 'select',
    label: 'Joint type',
    name: 'jointType',
    disabled: true,
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
    disabled: true,
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
    label: 'Joint type base material',
    name: 'jointTypeBaseMaterial',
    disabled: true,
    options: [
      { value: JointTypeBaseMaterialsEnum.CarbonSteel },
      { value: JointTypeBaseMaterialsEnum.StainlessSteel }
    ],
    validations: [
      {
        name: 'required',
        validator: Validators.required,
        message: 'Joint type base material required'
      }
    ]
  },
  {
    type: 'submit',
    label: 'Save exercise',
    name: 'saveButton'
  }
];
