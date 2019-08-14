import { FormGroup } from '@angular/forms';

import { isVisible } from './visible-if';
import { FieldConfig } from '../field.interface';

export interface OptionObject {
  config: FieldConfig;
  controlsToSubscribe:
    | {
        value: any;
        visibleIf?: { [key: string]: any };
      }[]
    | any;
}

export class OptionBuilder {
  static optionObjectBuilder = (fieldConfig: FieldConfig): OptionObject => {
    return {
      config: fieldConfig,
      controlsToSubscribe: fieldConfig.options
        .filter(option => option.visibleIf !== undefined)
        .flatMap(option => option.visibleIf)
        .flatMap(visibleIfObj => Object.keys(visibleIfObj))
        .filter((value, index, self) => self.indexOf(value) === index)
    };
  };

  static setSelectOptionsStates = (
    control,
    value: string,
    form: FormGroup
  ): void => {
    control.config.options.forEach(optionItem => {
      const isHidden = !isVisible(optionItem.visibleIf, value);
      optionItem.hidden = isHidden;
      if (isHidden) {
        form.get(control.config.name).reset();
      }
    });
  };

  static selectFieldHasVisibleIf = (config: FieldConfig): FieldConfig => {
    return (
      config.options !== undefined &&
      config.options.some(option => option.visibleIf !== undefined)
    );
  };
}
