import { gql } from "graphql-request";
import { dbConn } from "$lib/dbConn.js";

export async function load({ locals }) {
  //   console.log(locals.authedUser?.id);

  const query = gql`
    query allBookings($email: String) {
      user(email: $email) {
        booking {
          id
          checkInDate
          checkOutDate
          numGuests
          phoneNum
          bookingAmount
          numNights
          place_id
          bookingUser_id
          place {
            photos
            title
          }
        }
      }
    }
  `;

  const variables = {
    email: locals.authedUser?.email,
  };

  const allBookings = await dbConn(query, variables);

  //   console.log(allBookings.user.booking[0].id);

  return { allBookings };
}
