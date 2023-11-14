import { gql } from "graphql-request";
import { dbConn } from "$lib/dbConn.js";

export async function load() {
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

  return { allPlacesData };
}
