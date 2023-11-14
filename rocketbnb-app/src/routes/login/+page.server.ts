import type {
  Actions,
  RequestEvent,
  ActionFailure,
  Redirect,
} from "@sveltejs/kit";
import { fail, redirect } from "@sveltejs/kit";
import { dbConn } from "$lib/dbConn";
import jwt from "jsonwebtoken";
import { gql } from "graphql-request";
import bcryptjs from "bcryptjs";
import { TOKEN_KEY } from "$env/static/private";

export async function load({ cookies }) {
  const authToken = cookies.get("authToken");
  if (!authToken) {
    return { clearUser: true };
  } else {
    throw redirect(302, "/");
    return { clearUser: false };
  }
}

export const actions: Actions = {
  default: async ({
    cookies,
    request,
  }: RequestEvent): Promise<
    loginFormResponse | ActionFailure<loginFormResponse> | Redirect
  > => {
    const loginFormData = await request.formData();
    const loginEmail = loginFormData.get("email")?.toString() ?? "";
    const loginPassword = loginFormData.get("password")?.toString() ?? "";

    let loginResponse = {
      email: loginEmail,
      error: false,
      success: false,
      message: "",
    };

    try {
      const query = gql`
        query singleUser($email: String) {
          user(email: $email) {
            email
            password
            name
            id
          }
        }
      `;

      const variables = {
        email: loginEmail,
      };

      const { user: userFound } = await dbConn(query, variables);

      let authAttempt: boolean;

      authAttempt = await bcryptjs.compare(loginPassword, userFound.password);

      if (!authAttempt) {
        (loginResponse.error = true),
          (loginResponse.success = false),
          (loginResponse.message = "Invalid username or password");
      }

      if (authAttempt) {
        const authToken = jwt.sign(
          {
            authedUser: {
              email: userFound.email,
              name: userFound.name,
              id: userFound.id,
            },
          },
          TOKEN_KEY,
          { expiresIn: "24h" }
        );

        cookies.set("authToken", authToken, {
          httpOnly: true,
          maxAge: 60 * 60 * 24,
          sameSite: "strict",
        });
        loginResponse.success = true;
      }
    } catch (error) {
      loginResponse.error = true;
      loginResponse.success = false;
      loginResponse.message =
        "Error Logging in , Please check your LoginID OR Password";
      return fail(400, loginResponse);
    }
    if (loginResponse.success === true && cookies !== null) {
      // throw redirect(302, "/");
      return loginResponse;
    }
    return loginResponse;
  },
};
