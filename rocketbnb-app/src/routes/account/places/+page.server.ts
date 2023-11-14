import { gql } from "graphql-request";
import { dbConn } from "$lib/dbConn.js";

export async function load({ locals }) {
  //   console.log("this is from page.server", locals.authedUser?.email);

  let userEmail = locals.authedUser?.email;

  const query = gql`
    query placeAndBookedDetails($email: String) {
      userPlaces(email: $email) {
        photos
        title
        description
        extraInfo
        id
        booking {
          checkInDate
          checkOutDate
          numGuests
          numNights
          phoneNum
          place_id
          bookingUser_id
          bookingAmount
          id
          user {
            name
            email
          }
        }
        booking_id
      }
    }
  `;

  const variables = {
    email: userEmail,
  };

  const { ...placeAndBookingDetails } = await dbConn(query, variables);

  if (placeAndBookingDetails !== null) {
    // console.log("This is placeandbookingdetails", placeAndBookingDetails);
    return { placeAndBookingDetails };
  } else {
    return {};
  }
}
