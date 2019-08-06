export interface FieldConfig {
  key: string;
  label: string;
  controlType: string;
  valueType?: string;
  currentValue?: string;
  placeholder?: string;
  options?: {
    value: any,
    visibleIf?: { [key: string]: any };
  }[] | any;
  validators?: {
    required?: boolean;
    minlength?: number;
    maxlength?: number;
  };
}
