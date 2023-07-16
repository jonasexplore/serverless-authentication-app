export type FieldsErrors = {
  [field: string]: string[];
};

export default interface ValidatorFields<T> {
  errors: FieldsErrors;
  validatedData: T;
  validate(data: any): boolean;
}
