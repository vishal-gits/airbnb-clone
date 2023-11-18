import { gql } from "graphql-request";
import { dbConn } from "$lib/dbConn.js";

import { fail, redirect } from "@sveltejs/kit";
import type {
  ActionFailure,
  Actions,
  Redirect,
  RequestEvent,
} from "@sveltejs/kit";
import { user } from "$lib/stores.js";

export async function load({ params }) {
  const { placeid } = params;
  // console.log(placeid, " this is the params");

  const query = gql`
    query singlePlace($placeid: ID) {
      singlePlace(placeid: $placeid) {
        id
        title
        address
        photos
        description
        wifi
        privateParking
        tv
        pets
        privateEntrance
        foodBeverage
        extraInfo
        checkInTime
        checkOutTime
        maxGuests
        user_id
        price
        user {
          name
        }
      }
    }
  `;

  const variables = {
    placeid: placeid,
  };

  const currentPlace = await dbConn(query, variables);

  // console.log(currentPlace);

  return { currentPlace };
}

export const actions: Actions = {
  default: async ({
    request,
    locals,
    params,
  }: RequestEvent): Promise<
    bookingFormResponse | ActionFailure<bookingFormResponse> | Redirect | void
  > => {
    const bookingFormData = await request.formData();

    const checkInDate = bookingFormData.get("checkInDate");
    const checkOutDate = bookingFormData.get("checkOutDate");
    const numGuests = bookingFormData.get("numGuests");
    const phoneNum = bookingFormData.get("phoneNum");
    const bookingAmount = bookingFormData.get("bookingAmount");
    const numNights = bookingFormData.get("numNights");
    const placeId = params.placeid;
    const bookingUserId = locals?.authedUser?.id;

    // console.log("This is locals.authedUser", locals?.authedUser?.id);

    const bookingResponse: bookingFormResponse = {
      error: false,
      message: "",
      success: true,
    };

    const mutation = gql`
      mutation addBooking($bookingData: addBookingData!) {
        addBooking(bookingData: $bookingData) {
          id
          checkInDate
          checkOutDate
          numGuests
          phoneNum
          bookingAmount
          numNights
          place_id
          bookingUser_id
        }
      }
    `;

    const variables = {
      bookingData: {
        bookingUser_id: bookingUserId,
        place_id: placeId,
        bookingAmount: Number(bookingAmount),
        checkInDate: checkInDate,
        checkOutDate: checkOutDate,
        numGuests: Number(numGuests),
        numNights: Number(numNights),
        phoneNum: phoneNum,
      },
    };

    const bookingAdd = await dbConn(mutation, variables);

    if (bookingAdd !== null) {
      throw redirect(303, "/account/bookings");
    }

    bookingResponse.error = true;
    bookingResponse.message = "Error Adding Booking";
    bookingResponse.success = false;

    return fail(503, bookingResponse);
  },
};
