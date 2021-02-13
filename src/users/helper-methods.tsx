import React from "react";

import { ValidationErrorItem } from "joi";
import validationError from "../types/validation.errors.type";
import Request from "../network/http.request";
import IUser from "../interfaces/user.interface";

export const performValidation = (schema: any, data: any): {} => {
  const value = schema.validate(data, { abortEarly: false });

  if (value?.error?.details) {
    const messages = formatValidationMessages(value.error.details);
    return messages;
  }
  return {};
};
export const formatValidationMessages = (
  JoiErrors: ValidationErrorItem[]
): validationError => {
  const allMessages: validationError = {};

  for (const error of JoiErrors) {
    allMessages[error?.context?.label as string] = error.message;
  }

  return allMessages;
};
export const showValidationMessage = (
  key: string,
  validationErrors: validationError
) => {
  return <span className="error-msg">{validationErrors[key]}</span>;
};
export const fetchUserById = async (userId: string): Promise<IUser> => {
  const retrievedUser = await Request({ endpoint: `users/${userId}` });
  return retrievedUser;
};
