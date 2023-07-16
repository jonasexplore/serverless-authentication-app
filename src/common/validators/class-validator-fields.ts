import { validateSync } from 'class-validator';

import ValidatorFields, { FieldsErrors } from './validator-fields';

export abstract class ClassValidatorFields<T> implements ValidatorFields<T> {
  errors: FieldsErrors = null;
  validatedData: T = null;
  validate(data: any): boolean {
    const errors = validateSync(data);

    if (errors.length) {
      this.errors = {};
      for (const error of errors) {
        const field = error.property;
        this.errors[field] = Object.values(error.constraints);
      }
    } else {
      this.validatedData = data;
    }

    return !errors.length;
  }
}
