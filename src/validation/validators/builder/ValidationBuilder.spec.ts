import {
  CompareFieldsValidation,
  RequiredFieldValidation,
  EmailFieldValidation,
  MinLengthValidation,
  MaxLengthValidation,
} from '@/validation/validators';
import { ValidationBuilder } from './ValidationBuilder';
import faker from 'faker';

describe('ValidationBuilder', () => {
  test('Should return RequiredFieldValidation ', () => {
    const field = faker.database.column();
    const validations = ValidationBuilder.field(field).required().build();
    expect(validations).toEqual([new RequiredFieldValidation(field)]);
  });

  test('Should return EmailValidation ', () => {
    const field = faker.database.column();
    const validations = ValidationBuilder.field(field).email().build();
    expect(validations).toEqual([new EmailFieldValidation(field)]);
  });

  test('Should return MinLengthValidation ', () => {
    const field = faker.database.column();
    const length = faker.datatype.number();
    const validations = ValidationBuilder.field(field).min(length).build();
    expect(validations).toEqual([new MinLengthValidation(field, length)]);
  });

  test('Should return MaxLengthValidation ', () => {
    const field = faker.database.column();
    const length = faker.datatype.number();
    const validations = ValidationBuilder.field(field).max(length).build();
    expect(validations).toEqual([new MaxLengthValidation(field, length)]);
  });

  test('Should return CompareFieldsValidation ', () => {
    const field = faker.database.column();
    const fieldToCompare = faker.database.column();
    const validations = ValidationBuilder.field(field)
      .sameAs(fieldToCompare)
      .build();
    expect(validations).toEqual([
      new CompareFieldsValidation(field, fieldToCompare),
    ]);
  });

  test('Should return a list of validations ', () => {
    const field = faker.database.column();
    const fieldToCompare = faker.database.column();
    const minLength = faker.datatype.number();
    const maxLength = minLength + faker.datatype.number();
    const validations = ValidationBuilder.field(field)
      .required()
      .min(minLength)
      .max(maxLength)
      .sameAs(fieldToCompare)
      .email()
      .build();
    expect(validations).toEqual([
      new RequiredFieldValidation(field),
      new MinLengthValidation(field, minLength),
      new MaxLengthValidation(field, maxLength),
      new CompareFieldsValidation(field, fieldToCompare),
      new EmailFieldValidation(field),
    ]);
  });
});
