import { gql } from "apollo-boost";

export const getAuthorsQuery = gql`
  {
    authors {
      id
      name
    }
  }
`;