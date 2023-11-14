export interface registerFormData {
  weakPassword: boolean;

  emailUsed: boolean;
  error: boolean;
  message: string;

  name: FormDataEntryValue;
  email: FormDataEntryValue;
  password: FormDataEntryValue;

  [key: string]: any;
}

export interface loginFormData {
  email: FormDataEntryValue;
  password: FormDataEntryValue;
  [key: string]: any;
}

export interface loginFormResponse extends Omit<loginFormData, "password"> {
  error: boolean;
  message: string;
}

import type { ObjectId } from "mongodb";

export interface User {
  _id: ObjectId;
  name: string;
  email: string;
  password: string;
  resetTimer: number | null | undefined;
}
export interface UserWithoutId extends Omit<User, "_id"> {}
export interface UserWithoutPassword extends Omit<User, "password"> {}
