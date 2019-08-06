export const isVisible = (visibleIf: {[key: string]: any} | {[key: string]: any}[],
                          formValue: string) => {
  if (!visibleIf) {
    return true;
  }

  return Array.isArray(visibleIf) ?
       evaluateVisibleIfForArray(visibleIf as {[key: string]: any}[]) :
       evaluateVisibleIfForObject(visibleIf);

  function evaluateVisibleIfForArray(visibleIfItems: {[key: string]: any}[]): boolean {
    return visibleIfItems.some(item => evaluateVisibleIfForObject(item));
  }

  function evaluateVisibleIfForObject(visibleIfObject: {[key: string]: any}): boolean {
    return Object.keys(visibleIfObject).every(dependentFieldName => {
        const handler = Array.isArray(visibleIfObject[dependentFieldName]) ? valueMatchesOneOf : valueMatches;
        return handler(visibleIfObject[dependentFieldName]);
    });
  }

  function valueMatchesOneOf(visibleIfValues: any[]): boolean {
    return visibleIfValues.some(visibleIfValue => valueMatches(visibleIfValue));
  }

  function valueMatches(visibleIfValue: any): boolean {
      return formValue === visibleIfValue;
  }
};
