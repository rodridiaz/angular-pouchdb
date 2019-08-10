import { Component, OnInit } from '@angular/core';
import { FieldConfig } from 'src/app/core/ui/form/field.interface';
import { Validators } from '@angular/forms';
import {
  JointTypesEnumn,
  JointTypePositionsEnum,
  JointTypeBaseMaterialsEnum,
  ExerciseDetail,
  Pass
} from '../../shared/exercise';
import { Observable, of } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';

const REG_CONFIG: FieldConfig[] = [
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
    type: 'submit',
    label: 'Save exercise',
    name: 'saveButton'
  }
];

@Component({
  selector: 'app-exercise',
  templateUrl: './exercise.component.html',
  styleUrls: ['./exercise.component.css']
})
export class ExerciseComponent implements OnInit {
  fieldsConfig: FieldConfig[] = [];

  exerciseDetail$: Observable<ExerciseDetail>;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.fieldsConfig = REG_CONFIG;

    this.exerciseDetail$ = this.route.data.pipe(
      switchMap(data => of(data.exerciseDetail))
    );
  }
}
