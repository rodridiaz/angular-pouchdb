import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import {
  PassProcessTypesEnum,
  JointTypeBaseMaterialsEnum,
  FillerMaterialsEnum,
  FillerMaterialDiametersEnum,
  GasTypes
} from '../../shared/exercise';
import { FieldConfig } from 'src/app/core/ui/form/field.interface';

@Component({
  selector: 'app-pass-dialog',
  templateUrl: './pass-dialog.component.html',
  styleUrls: ['./pass-dialog.component.css']
})
export class PassDialogComponent implements OnInit {
  form: FormGroup;

  fieldsConfig: FieldConfig[] = [
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
      type: 'submit',
      label: 'Save',
      name: 'saveButton'
    }
  ];

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<PassDialogComponent>
  ) {}

  ngOnInit() {}

  save(formData) {
    this.dialogRef.close(formData);
  }

  close() {
    this.dialogRef.close();
  }
}
