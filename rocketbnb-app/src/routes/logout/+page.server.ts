import { authToken } from "$lib/stores.js";
import { redirect } from "@sveltejs/kit";

export function load({ cookies }) {
  cookies.set("authToken", "", { maxAge: 0 });
  // console.log(authToken);

  throw redirect(302, "/");
}
