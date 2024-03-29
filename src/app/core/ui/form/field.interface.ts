export interface Validator {
  name: string;
  validator: any;
  message: string;
}
export interface FieldConfig {
  label?: string;
  name?: string;
  inputType?: string;
  disabled?: boolean;
  options?:
    | {
        value: any;
        visibleIf?: { [key: string]: any };
      }[]
    | any;
  collections?: any;
  type: string;
  value?: any;
  validations?: Validator[];
}

export interface StepConfig {
  name: string;
  label: string;
  includedFields: string[];
}
