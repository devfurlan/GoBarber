import { ValidationError } from 'yup';

interface IErrors {
  [key: string]: string;
}

export default function getValidationErrors(err: ValidationError): IErrors {
  const validationErrors: IErrors = {};

  err.inner.forEach(({ message, path }) => {
    if (path){
      validationErrors[path] = message;
    }
  });

  return validationErrors;
}