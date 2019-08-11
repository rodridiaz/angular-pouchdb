import {
  ExerciseDetail,
  JointTypesEnumn,
  JointTypePositionsEnum,
  JointTypeBaseMaterialsEnum,
  FillerMaterialsEnum,
  FillerMaterialDiametersEnum,
  GasTypes,
  PassProcessTypesEnum
} from './exercise';

export const EXERCISE_DETAILS: ExerciseDetail[] = [
  {
    id: '033082f0-e7d7-4a74-a7a2-8ce67c8a49a7',
    name: 'Exercise 1',
    minScore: 50,
    jointType: JointTypesEnumn.BasedOnPlate,
    jointTypePosition: JointTypePositionsEnum.F1,
    jointTypeBaseMaterial: JointTypeBaseMaterialsEnum.CarbonSteel,
    passes: [
      {
        passProcessType: PassProcessTypesEnum.GMAW,
        fillerMaterial: FillerMaterialsEnum.ER316LSI,
        fillerMaterialDiameter: FillerMaterialDiametersEnum.MM1,
        gasType: GasTypes.ArgonCO2
      }
    ]
  }
];
