import { Component, OnInit } from '@angular/core';
import { FieldConfig } from '../../../components/exercise-form-wizard/field-config.interface';
import { JointTypesEnumn, JointTypePositionsEnum, JointTypeBaseMaterialsEnum } from 'src/app/exercises/shared/exercise';

const FIELDS_CONFIG: FieldConfig[] = [
  {
    key: 'name',
    label: 'Name',
    controlType: 'text',
    valueType: 'text',
    placeholder: 'Name',
    validators: {
      required: true
    }
  },
  {
    key: 'minScore',
    label: 'Minimum Score',
    placeholder: 'Minimum Score',
    valueType: 'num',
    controlType: 'text',
    validators: {
      required: true
    }
  },
  {
    key: 'jointType',
    label: 'Joint type',
    placeholder: 'Joint type',
    controlType: 'select',
    options: [
      { value: JointTypesEnumn.BasedOnPlate },
      { value: JointTypesEnumn.T },
      { value: JointTypesEnumn.Lap }
    ],
    validators: {
      required: true
    }
  },
  {
    key: 'jointTypePosition',
    label: 'Joint type position',
    placeholder: 'Joint type position',
    controlType: 'select',
    options: [
      {
        value: JointTypePositionsEnum.F1,
        visibleIf: [
          { 'jointType': JointTypesEnumn.BasedOnPlate },
          { 'jointType': JointTypesEnumn.T },
        ]
      },
      {
        value: JointTypePositionsEnum.F2
      },
      {
        value: JointTypePositionsEnum.F3,
        visibleIf: [
          { 'jointType': JointTypesEnumn.BasedOnPlate },
          { 'jointType': JointTypesEnumn.T },
        ]
      },
      {
        value: JointTypePositionsEnum.F4,
        visibleIf: [
          { 'jointType': JointTypesEnumn.T },
          { 'jointType': JointTypesEnumn.Lap },
        ]
      },
      {
        value: JointTypePositionsEnum.F5,
        visibleIf: [
          { 'jointType': JointTypesEnumn.T },
          { 'jointType': JointTypesEnumn.Lap },
        ]
      },
      {
        value: JointTypePositionsEnum.F6,
        visibleIf: {
          'jointType': JointTypesEnumn.T
        }
      }
    ],
    validators: {
      required: true
    }
  },
  {
    key: 'jointTypeMaterial',
    label: 'Joint type material',
    placeholder: 'Joint type material',
    controlType: 'select',
    options: [
      { value: JointTypeBaseMaterialsEnum.CarbonSteel },
      { value: JointTypeBaseMaterialsEnum.StainlessSteel }
    ],
    validators: {
      required: true
    }
  }
];
@Component({
  selector: 'app-add-new-exercise',
  templateUrl: './add-new-exercise.component.html',
  styleUrls: ['./add-new-exercise.component.css']
})
export class AddNewExerciseComponent implements OnInit {
  title = 'Add new exercise';
  fieldsConfig = FIELDS_CONFIG;

  constructor() { }

  ngOnInit() {
  }


}
