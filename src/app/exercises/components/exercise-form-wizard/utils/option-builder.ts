import { FieldConfig } from '../field-config.interface';
import { isVisible } from './visible-if';
import { FormGroup } from '@angular/forms';

export class OptionBuilder {

  static optionObjectBuilder = (fieldConfig: FieldConfig): any => {
    return {
      config: fieldConfig,
      controlsToSubscribe: fieldConfig.options
        .filter(option => option.visibleIf !== undefined)
        .flatMap(option => option.visibleIf)
        .map(visibleIfObj => Object.keys(visibleIfObj))
        .filter((value, index, self) => self.indexOf(value) === index),
    };
  }

  static setSelectOptionsStates = (control, value: string, form: FormGroup): void => {
    control.config.options.forEach(optionItem => {
      const isHidden = !isVisible(optionItem.visibleIf, value);
      optionItem.hidden = isHidden;
      if (isHidden) {
        form.get(control.config.key).reset();
      }
    });
  }

  static retrieveSelectFieldsWithVisibleIf = (config: FieldConfig): FieldConfig => {
    return config.options !== undefined && config.options.some(option => option.visibleIf !== undefined);
  }
}
