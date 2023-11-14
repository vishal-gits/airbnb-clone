import { gql } from "graphql-request";
import { dbConn } from "$lib/dbConn.js";

export async function load({ locals }) {
  let authedUser = undefined;
  if (locals.authedUser) authedUser = locals.authedUser;
  // console.log("This is from page.server.ts of home page", authedUser);

  const query = gql`
    query AllPlaces {
      allPlaces {
        address
        id
        user_id
        title
        photos
        price
      }
    }
  `;

  const allPlacesData = await dbConn(query);
  // console.log(allPlacesData);

  return { authedUser, allPlacesData };
}

// export async function load({ data }) {
//   return { data };
// }
