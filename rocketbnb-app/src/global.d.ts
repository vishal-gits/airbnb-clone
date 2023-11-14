// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
  namespace App {
    interface Error {
      code: number;
      message: string;
    }
    interface Locals {
      authedUser: UserWithoutPassword | undefined;
    }
  }
  interface registerFormData {
    weakPassword: boolean;
    emailUsed: boolean;
    error: boolean;
    message: string;
    name: FormDataEntryValue;
    email: FormDataEntryValue;
    password: FormDataEntryValue;
    [key: string]: any;
  }

  interface loginFormData {
    email: FormDataEntryValue;
    password: FormDataEntryValue;
    [key: string]: any;
  }

  interface placeFormData {
    title: FormDataEntryValue;
    address: FormDataEntryValue;
    photos: string[];
    description: FormDataEntryValue | textarea;
    wifi: FormDataEntryValue | Boolean;
    privateParking: FormDataEntryValue | Boolean;
    tv: FormDataEntryValue | Boolean;
    pets: FormDataEntryValue | Boolean;
    privateEntrance: FormDataEntryValue | Boolean;
    foodBeverage: FormDataEntryValue | Boolean;
    extraInfo: FormDataEntryValue | textarea;
    checkInTime: FormDataEntryValue | Number;
    checkOutTime: FormDataEntryValue | Number;
    maxGuests: FormDataEntryValue | Number;
    price: FormDataEntryValue | Number;
    [key: string]: any;
  }

  interface placeFormResponse
    extends Omit<placeFormData, "checkInTime,checkOutTime,maxGuests"> {
    error: boolean;
    message: string;
    checkInTime: Number;
    checkOutTime: Number;
    maxGuests: Number;
  }

  interface editPlaceResponse {
    error: boolean;
    message: string;
    [key: string]: any;
  }

  interface loginFormResponse extends Omit<loginFormData, "password"> {
    error: boolean;
    message: string;
    success: boolean;
  }

  import type { ObjectId } from "mongodb";

  // changed _id to id in interface User & also for UserWithoutId
  interface User {
    id: ObjectId;
    name: string;
    email: string;
    password: string;
  }
  interface UserWithoutId extends Omit<User, "id"> {}
  interface UserWithoutPassword extends Omit<User, "password"> {}

  interface bookingFormData {
    placeId: ObjectId;
    checkInDate: FormDataEntryValue | Date;
    checkOutDate: FormDataEntryValue | Date;
    numGuests: FormDataEntryValue | number;
    bookingUserId: ObjectId;
    phoneNum: FormDataEntryValue | string;
    bookingAmount: FormDataEntryValue | number;
    numNights: FormDataEntryValue | number;
    [key: string]: any;
  }

  interface bookingFormResponse {
    error: boolean;
    message: string;
    success: boolean;
    [key: string]: any;
  }

  interface bookingData {
    id: ID!;
    checkInDate: String;
    checkOutDate: String;
    numGuests: Int;
    phoneNum: String;
    bookingAmount: Int;
    numNights: Int;
    place_id: ID;
    bookingUser_id: ID;
    place: { photos: string[]; title: string };
  }

  interface placeBookingUser {
    photos: String[];
    title: String;
    description: String;
    extraInfo: String;
    booking_id: String[];
    booking: {
      checkInDate: String;
      checkOutDate: String;
      numGuests: Number;
      numNights: Number;
      phoneNum: String;
      place_id: ID;
      bookingUser_id: ID;
      bookingAmount: Number;
      id: ID;
      user: {
        name: String;
        email: String;
      };
    };
  }
}

export {};
