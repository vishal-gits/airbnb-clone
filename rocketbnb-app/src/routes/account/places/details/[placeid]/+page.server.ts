import type {
  Actions,
  RequestEvent,
  Redirect,
  ActionFailure,
} from "@sveltejs/kit";
import { gql } from "graphql-request";
import { fail, redirect } from "@sveltejs/kit";
import { dbConn } from "$lib/dbConn.js";
let data: any;
export async function load({ parent }) {
  data = await parent();
  // console.log("this is from placeid load function", data);
  return { data };
}

export const actions: Actions = {
  default: async ({
    request,
  }: RequestEvent): Promise<
    placeFormResponse | ActionFailure<editPlaceResponse> | Redirect
  > => {
    const placeFormData = await request.formData();
    // console.log("This is form data", placeFormData);
    // console.log(data);
    const currentId = placeFormData.get("id");
    const mainPhoto = placeFormData.get("mainPhoto") ?? "";
    const photosb4main = (placeFormData.get("photos") ?? "")
      .toString()
      .split(",");
    // console.log("This is from page.server", mainPhoto);

    const photos = photosb4main.filter((img) => img !== mainPhoto);
    photos.unshift(mainPhoto.toString());

    const title = placeFormData.get("title") ?? "";
    const address = placeFormData.get("address") ?? "";
    // const photos = (placeFormData.get("photos") ?? "").toString().split(",");
    const description = (placeFormData.get("description") ?? "").toString();
    const wifi = placeFormData.get("wifi") ? true : false;
    const privateParking = placeFormData.get("privateParking") ? true : false;
    const tv = placeFormData.get("tv") ? true : false;
    const pets = placeFormData.get("pets") ? true : false;
    const privateEntrance = placeFormData.get("privateEntrance") ? true : false;
    const foodBeverage = placeFormData.get("foodBeverage") ? true : false;
    const extraInfo = (placeFormData.get("extraInfo") ?? "").toString();
    const checkInTime = Number(placeFormData.get("checkInTime") ?? "");
    const checkOutTime = Number(placeFormData.get("checkOutTime") ?? "");
    const maxGuests = Number(placeFormData.get("maxGuests") ?? "");
    const price = Number(placeFormData.get("price") ?? "");

    // console.log("This is the current Id", currentId);

    const b4editArr = data.userPlaces.filter(
      (arr: { id: FormDataEntryValue | null }) => arr.id === currentId
    );
    // console.log("this is the b4editdata", b4editArr[0]);
    // console.log("photos arr", photos);
    const b4Edit = b4editArr[0];

    let editResponse: editPlaceResponse = {
      error: false,
      message: "",
    };

    let editObj = {};

    let keyArr: placeFormData = {
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
    };

    // a.length === b.length && a.every((element, index) => element === b[index]);

    for (let key in keyArr) {
      if (key === "photos") {
        if (
          !(
            keyArr[key].length === b4Edit[key].length &&
            keyArr[key].every(
              (element: any, index: string | number) =>
                element === b4Edit[key][index]
            )
          )
        ) {
          // editArr.push({ [key]: keyArr[key] });
          Object.assign(editObj, { [key]: keyArr[key] });
        }
        // console.log("detected");
      } else if (keyArr[key] !== b4Edit[key]) {
        // console.log(keyArr[key], b4Edit[key]);
        // editArr.push({ [key]: keyArr[key] });
        Object.assign(editObj, { [key]: keyArr[key] });
      }
    }
    // console.log("This is the final editArr", editArr);
    // console.log("This is the final editObj", editObj);

    const mutation = gql`
      mutation updatePlace($editPlaceId: ID!, $edits: editPlace) {
        editPlace(id: $editPlaceId, edits: $edits) {
          id
        }
      }
    `;

    const variables = {
      editPlaceId: b4Edit.id,
      edits: editObj,
    };

    const placeUpdate = await dbConn(mutation, variables);

    if (placeUpdate !== null) {
      throw redirect(303, `/account/places`);
    }

    editResponse.error = true;
    editResponse.message = "Error updating the place!";
    return fail(400, editResponse);
  },
};
