export interface Exercise {
  id: string;
  name: string;
  minScore: number;
  creationDate: string;
}

export interface ExerciseDetail {
  id: string;
  name: string;
  minScore: number;
  jointType: string;
  jointTypePosition: string;
  jointTypeBaseMaterial: string;
  passes: Pass[];
}

export interface Pass {
  passProcessType: string;
  fillerMaterial: string;
  fillerMaterialDiameter: string;
  gasType: string;
}

export enum JointTypesEnumn {
  BasedOnPlate = 'Based on plate',
  T = 'T',
  Lap = 'Lap'
}

export enum JointTypePositionsEnum {
  F1 = '1F',
  F2 = '2F',
  F3 = '3F',
  F4 = '4F',
  F5 = '5F',
  F6 = '6F'
}

export enum JointTypeBaseMaterialsEnum {
  CarbonSteel = 'Carbon steel',
  StainlessSteel = 'Stainless steel'
}

export enum FillerMaterialsEnum {
  E7018 = 'E7018',
  E316L = 'E316L',
  ER70S6 = 'ER70S-6',
  ER316LSI = 'ER316LSi',
  E71T1 = 'E71T-1',
  E71T7 = 'E71T-7'
}

export enum FillerMaterialDiametersEnum {
  MM1 = '1.0mm',
  MM2 = '2.0mm',
  MM3 = '3.0mm'
}

export enum PassProcessTypesEnum {
  GMAW = 'GMAW',
  SMAW = 'SMAW',
  FCAW = 'FCAW'
}

export enum GasTypes {
  ArgonCO2 = 'Argon-CO2',
  Argon = 'Argon',
  NA = 'N/A'
}
