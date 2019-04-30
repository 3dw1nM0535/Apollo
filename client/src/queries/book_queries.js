import { gql } from "apollo-boost";

export const getBooksQuery = gql`
  {
    books {
      id
      name
      genre
    }
  }
`;

export const getBookQuery = gql`
  query($id: ID) {
    book(id: $id) {
      id
      name
      genre
      author {
        name
        age
        books {
          id
          name
          genre
        }
      }
    }
  }
`;