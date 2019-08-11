import { Component, OnInit } from '@angular/core';
import { StepConfig, FieldConfig } from 'src/app/core/ui/form/field.interface';
import { Validators } from '@angular/forms';
import {
  JointTypeBaseMaterialsEnum,
  JointTypePositionsEnum,
  JointTypesEnumn,
  PassProcessTypesEnum,
  FillerMaterialsEnum,
  FillerMaterialDiametersEnum,
  GasTypes,
  ExerciseDetail
} from 'src/app/exercises/shared/exercise';
import { ExerciseService } from 'src/app/exercises/shared/exercise.service';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';

const STEPS_CONFIG: StepConfig[] = [
  {
    name: 'generalInfo',
    label: 'General Information',
    includedFields: [
      'name',
      'minScore',
      'jointType',
      'jointTypePosition',
      'jointTypeBaseMaterial',
      'wizardNextButton'
    ]
  },
  {
    name: 'pass',
    label: 'First Pass Information',
    includedFields: [
      'passProcessType',
      'fillerMaterial',
      'fillerMaterialDiameter',
      'gasType',
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
    label: 'Joint type base material',
    name: 'jointTypeBaseMaterial',
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
    type: 'select',
    label: 'Process',
    name: 'passProcessType',
    options: [
      {
        value: PassProcessTypesEnum.GMAW,
        visibleIf: [
          { jointTypeBaseMaterial: JointTypeBaseMaterialsEnum.CarbonSteel }
        ]
      },
      {
        value: PassProcessTypesEnum.FCAW,
        visibleIf: {
          jointTypeBaseMaterial: JointTypeBaseMaterialsEnum.StainlessSteel
        }
      },
      { value: PassProcessTypesEnum.SMAW }
    ],
    validations: [
      {
        name: 'required',
        validator: Validators.required,
        message: 'Process required'
      }
    ]
  },
  {
    type: 'select',
    label: 'Filler material',
    name: 'fillerMaterial',
    options: [
      {
        value: FillerMaterialsEnum.E316L,
        visibleIf: {
          passProcessType: PassProcessTypesEnum.SMAW
        }
      },
      {
        value: FillerMaterialsEnum.E7018,
        visibleIf: {
          passProcessType: PassProcessTypesEnum.SMAW
        }
      },
      {
        value: FillerMaterialsEnum.E71T1,
        visibleIf: {
          passProcessType: PassProcessTypesEnum.FCAW
        }
      },
      {
        value: FillerMaterialsEnum.E71T7,
        visibleIf: {
          passProcessType: PassProcessTypesEnum.FCAW
        }
      },
      {
        value: FillerMaterialsEnum.ER316LSI,
        visibleIf: {
          passProcessType: PassProcessTypesEnum.GMAW
        }
      },
      {
        value: FillerMaterialsEnum.ER70S6,
        visibleIf: {
          passProcessType: PassProcessTypesEnum.GMAW
        }
      }
    ],
    validations: [
      {
        name: 'required',
        validator: Validators.required,
        message: 'Filler material required'
      }
    ]
  },
  {
    type: 'select',
    label: 'Filler material diameter',
    name: 'fillerMaterialDiameter',
    options: [
      { value: FillerMaterialDiametersEnum.MM1 },
      { value: FillerMaterialDiametersEnum.MM2 },
      { value: FillerMaterialDiametersEnum.MM3 }
    ],
    validations: [
      {
        name: 'required',
        validator: Validators.required,
        message: 'Filler material diameter required'
      }
    ]
  },
  {
    type: 'select',
    label: 'Gas type',
    name: 'gasType',
    options: [
      {
        value: GasTypes.ArgonCO2,
        visibleIf: [
          { passProcessType: PassProcessTypesEnum.GMAW },
          { passProcessType: PassProcessTypesEnum.FCAW }
        ]
      },
      {
        value: GasTypes.Argon,
        visibleIf: {
          passProcessType: PassProcessTypesEnum.GMAW
        }
      },
      {
        value: GasTypes.CO2,
        visibleIf: {
          passProcessType: PassProcessTypesEnum.FCAW
        }
      },
      {
        value: GasTypes.NA,
        visibleIf: {
          passProcessType: PassProcessTypesEnum.SMAW
        }
      }
    ],
    validations: [
      {
        name: 'required',
        validator: Validators.required,
        message: 'Gas type required'
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

  constructor(
    private service: ExerciseService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit() {
    this.fieldsConfig = FIELDS_CONFIG;
    this.stepsConfig = STEPS_CONFIG;
  }

  submit(value: ExerciseDetail) {
    this.service.addExercise(value).subscribe((res: any) => {
      if (res.ok) {
        this.snackBar
          .open('Exercise created 🙂', 'Go to exercises', {
            duration: 4000
          })
          .onAction()
          .subscribe(() => this.router.navigate(['/exercises']));
      }
    });
  }
}
