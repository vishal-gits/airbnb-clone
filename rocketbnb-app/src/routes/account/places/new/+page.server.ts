import type {
  Actions,
  RequestEvent,
  ActionFailure,
  Redirect,
} from "@sveltejs/kit";
import { fail, redirect } from "@sveltejs/kit";
import { gql } from "graphql-request";
import { dbConn } from "$lib/dbConn";

export async function load() {
  return { msg: "This is the return" };
}

export const actions: Actions = {
  default: async ({
    request,
    locals,
  }: RequestEvent): Promise<
    placeFormResponse | ActionFailure<placeFormResponse> | Redirect
  > => {
    const placeFormData = await request.formData();
    // console.log(placeFormData);

    const title = placeFormData.get("title") ?? "";
    const address = placeFormData.get("address") ?? "";
    const photos = (placeFormData.get("photos") ?? "").toString().split(",");
    const description = (placeFormData.get("description") ?? "").toString();
    const wifi = placeFormData.get("wifi") ? true : false;
    const privateParking = placeFormData.get("private parking") ? true : false;
    const tv = placeFormData.get("tv") ? true : false;
    const pets = placeFormData.get("pets") ? true : false;
    const privateEntrance = placeFormData.get("private entrance")
      ? true
      : false;
    const foodBeverage = placeFormData.get("food & beverage") ? true : false;
    const extraInfo = (placeFormData.get("extraInfo") ?? "").toString();
    const checkInTime = Number(placeFormData.get("checkInTime") ?? "");
    const checkOutTime = Number(placeFormData.get("checkOutTime") ?? "");
    const maxGuests = Number(placeFormData.get("maxGuests") ?? "");
    const price = Number(placeFormData.get("price") ?? "");

    // console.log(wifi, privateParking, tv, pets, privateEntrance, foodBeverage);
    // console.log(photos);
    // console.log(locals.authedUser?.email);

    let placeResponse: placeFormResponse = {
      error: false,
      message: "",
      title,
      address,
      photos,
      description,
      wifi,
      privateParking,
      tv,
      pets,
      privateEntrance,
      foodBeverage,
      extraInfo,
      checkInTime,
      checkOutTime,
      maxGuests,
      price,
    };

    const mutation = gql`
      mutation InsertPlace($email: String!, $place: addPlace!) {
        addPlace(email: $email, place: $place) {
          address
          checkInTime
          checkOutTime
          description
          extraInfo
          foodBeverage
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
      email: locals.authedUser?.email,
      place: {
        address,
        checkInTime,
        checkOutTime,
        description,
        extraInfo,
        foodBeverage,
        maxGuests,
        pets,
        photos,
        privateEntrance,
        privateParking,
        title,
        tv,
        wifi,
        price,
      },
    };

    const placeInsert = await dbConn(mutation, variables);

    if (placeInsert !== null) {
      throw redirect(303, `../places`);
    }

    placeResponse.error = true;
    placeResponse.message = "Error registering new place!";
    return fail(400, placeResponse);
  },
};
