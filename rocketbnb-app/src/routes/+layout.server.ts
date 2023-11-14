export async function load({ locals }) {
  let authedUser = undefined;
  if (locals.authedUser) {
    authedUser = locals.authedUser;
    // console.log("This is from inside layout.server.ts", authedUser);
  }
  // console.log("This is from outside layout.server.ts", authedUser);

  return { authedUser };
}
