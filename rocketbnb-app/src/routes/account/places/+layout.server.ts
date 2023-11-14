import { dbConn } from "$lib/dbConn.js";
import { gql } from "graphql-request";
export async function load({ locals }) {
  let userEmail = locals?.authedUser?.email;

  const query = gql`
    query getUserPlaces($email: String) {
      userPlaces(email: $email) {
        address
        checkInTime
        checkOutTime
        description
        extraInfo
        foodBeverage
        id
        maxGuests
        pets
        photos
        privateEntrance
        privateParking
        title
        tv
        wifi
        price
      }
    }
  `;

  const variables = {
    email: userEmail,
  };

  const { userPlaces } = await dbConn(query, variables);

  if (userPlaces !== null) {
    return { userPlaces };
  } else {
    return {};
  }
}
