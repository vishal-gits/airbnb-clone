import type {
  Actions,
  RequestEvent,
  ActionFailure,
  Redirect,
} from "@sveltejs/kit";
import { fail, redirect } from "@sveltejs/kit";
import { checkPassword } from "$lib/passwordCheck";
import { gql } from "graphql-request";
import { dbConn } from "$lib/dbConn.js";

export async function load({ cookies }) {
  const authToken = cookies.get("authToken");
  if (authToken) {
    throw redirect(302, "/");
  }
}

export const actions: Actions = {
  default: async ({
    request,
  }: RequestEvent): Promise<
    registerFormData | ActionFailure<registerFormData> | Redirect
  > => {
    const signupFormData = await request.formData();
    const name = signupFormData.get("name") ?? "";
    const email = signupFormData.get("email") ?? "";
    const password = signupFormData.get("password") ?? "";

    let SignUpResponse: registerFormData = {
      emailUsed: false,
      weakPassword: false,
      error: false,
      success: false,
      message: "",
      name,
      email,
      password: "",
    };

    const isPassStrong = checkPassword(password.toString());

    if (!isPassStrong) {
      SignUpResponse.weakPassword = true;
      SignUpResponse.error = true;
      SignUpResponse.message = "Password does not meet requirements!";
      return fail(400, SignUpResponse);
    }

    const query = gql`
      query EmailList {
        users {
          email
        }
      }
    `;

    const userEmails = await dbConn(query);
    const emailList = userEmails.users.map((obj: { email: any }) => obj.email);

    try {
      if (emailList.includes(SignUpResponse.email.toString())) {
        SignUpResponse.error = true;
        SignUpResponse.emailUsed = true;
        SignUpResponse.message = "This email address has already been used!";
        return fail(400, SignUpResponse);
      }
    } catch (error: any) {
      SignUpResponse.error = true;
      SignUpResponse.message =
        "Error confirming email is available! Try again shortly!";
      return fail(400, SignUpResponse);
    }

    SignUpResponse.password = password;

    const mutation = gql`
      mutation InsertUser($user: addUserInputs!) {
        addUser(user: $user) {
          email
          name
          password
        }
      }
    `;

    const variables = {
      user: { name, email, password },
    };

    const userInsert = await dbConn(mutation, variables);

    if (userInsert !== null) {
      throw redirect(303, `/registerSuccess`);
    }

    SignUpResponse.password = "";
    SignUpResponse.error = true;
    SignUpResponse.message = "Error registering user!";
    return fail(503, SignUpResponse);
  },
};
