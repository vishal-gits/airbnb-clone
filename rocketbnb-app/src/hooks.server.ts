import { TOKEN_KEY } from "$env/static/private";
import { dbConn } from "$lib/dbConn";
import jwt, { type JwtPayload } from "jsonwebtoken";
import { gql } from "graphql-request";

export async function handle({ event, resolve }) {
  const authToken = event.cookies.get("authToken");
  try {
    if (!authToken) event.locals.authedUser = undefined;
    else {
      const claims = jwt.verify(authToken, TOKEN_KEY) as JwtPayload;
      if (!claims) event.locals.authedUser = undefined;
      // console.log(claims);
      if (authToken && claims) {
        const query = gql`
          query singleUser($email: String) {
            user(email: $email) {
              email
              name
              id
            }
          }
        `;

        const variables = {
          email: claims.authedUser.email,
        };

        const { user: userFound } = await dbConn(query, variables);

        event.locals.authedUser = userFound;
        // console.log("From hooks.server", userFound);
      }
    }
  } finally {
    const response = await resolve(event);
    return response;
  }
}
