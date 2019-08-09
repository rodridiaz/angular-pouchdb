import { Component, OnInit } from '@angular/core';
import { StepConfig, FieldConfig } from 'src/app/core/ui/form/field.interface';
import { Validators } from '@angular/forms';
import {
  JointTypeBaseMaterialsEnum,
  JointTypePositionsEnum,
  JointTypesEnumn
} from 'src/app/exercises/shared/exercise';

const STEPS_CONFIG: StepConfig[] = [
  {
    name: 'generalInfo',
    label: 'General Information',
    includedFields: ['name', 'jointType', 'wizardNextButton']
  },
  {
    name: 'pass',
    label: 'First Pass Information',
    includedFields: [
      'minScore',
      'jointTypePosition',
      'jointTypeMaterial',
      'wizardPreviousButton',
      'wizardNextButton',
      'saveButton'
    ]
  }
];

const FIELDS_CONFIG: FieldConfig[] = [
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
    type: 'button',
    label: 'Next',
    name: 'wizardNextButton'
  },
  {
    type: 'button',
    label: 'Back',
    name: 'wizardPreviousButton'
  }
];
@Component({
  selector: 'app-add-new',
  templateUrl: './add-new.component.html',
  styleUrls: ['./add-new.component.css']
})
export class AddNewComponent implements OnInit {
  fieldsConfig: FieldConfig[] = [];
  stepsConfig: StepConfig[] = [];

  constructor() {}

  ngOnInit() {
    this.fieldsConfig = FIELDS_CONFIG;
    this.stepsConfig = STEPS_CONFIG;
  }
}
