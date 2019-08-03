export interface Exercise {
  id: number;
  name: string;
  minScore: number;
  creationDate: string;
}

export interface ExerciseDetail {
  id: number;
  name: string;
  minScore: number;
  jointType: JointTypes;
  jointTypePosition: JointTypePositions;
  jointTypeBaseMaterial: JointTypeBaseMaterials;
  passes: JointTypeProcesses[];
}

export interface JointTypeProcesses {
  passProcessType: PassProcessTypes;
  fillerMaterial: FillerMaterials;
  fillerMaterialDiameter: FillerMaterialDiameters;
  gasType: GasTypes;
}

export enum JointTypes {
  BasedOnPlate = 'basedOnPlate',
  T = 't',
  Lap = 'lap'
}

export enum JointTypePositions {
  F1 = '1F',
  F2 = '2F',
  F3 = '3F',
  F4 = '4F',
  F5 = '5F',
  F6 = '6F'
}

export enum JointTypeBaseMaterials {
  CarbonSteel = 'carbonSteel',
  StainlessSteel = 'stainlessSteel'
}

export enum FillerMaterials {
  E7018 = 'E7018',
  E316L = 'E316L',
  ER70S6 = 'ER70S-6',
  ER316LSI = 'ER316LSi',
  E71T1 = 'E71T-1',
  E71T7 = 'E71T-7'
}

export enum FillerMaterialDiameters {
  MM1 = '1.0mm',
  MM2 = '2.0mm',
  MM3 = '3.0mm'
}

export enum PassProcessTypes {
  GMAW = 'GMAW',
  SMAW = 'SMAW',
  FCAW = 'FCAW'
}

export enum GasTypes {
  ArgonCO2 = 'Argon-CO2',
  Argon = 'Argon',
  NA = 'N/A'
}


