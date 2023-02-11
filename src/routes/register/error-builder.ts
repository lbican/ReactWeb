export interface ResponseError {
  code: string
  message: string
}

interface RegistrationError {
  email?: ResponseError
  username?: ResponseError
  password?: ResponseError
}

export const getErrorReport = (error: RegistrationError): ResponseError[] => {
  const errors: ResponseError[] = [];
  if (!error) {
    errors.push({
      code: 'invalid_response',
      message: 'There was an error while registering your account.'
    });

    return errors;
  }

  if (error.email) {
    errors.push(error.email);
  }

  if (error.username) {
    errors.push(error.username);
  }

  if (error.password) {
    errors.push(error.password);
  }

  console.log(errors);
  return errors;
};
