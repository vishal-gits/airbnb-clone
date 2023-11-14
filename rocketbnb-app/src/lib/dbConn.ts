import { request, gql } from "graphql-request";
import { PUBLIC_GRAPHQL_API } from "$env/static/public";

export const dbConn = async (query: any, args?: any) => {
  const data: any = await request(PUBLIC_GRAPHQL_API, query, args);
  return data;
};
