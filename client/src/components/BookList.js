import React from "react";
import { graphql } from "react-apollo";

import BookDetail from "./BookDetails";

// Queries
import { getBooksQuery } from "../queries";

class BookList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: null,
    }
  }

  displayBooks() {
    const { data } = this.props;
    if (data.loading) {
      return (
        <div>Loading...</div>
      );
    }
    return data.books.map(book => {
      return (
        <li key={book.id} onClick={(e) => this.setState({ selected: book.id })}>{book.name}</li>
      )
    });
  }
  render() {
    const { selected } = this.state;
    return (
      <div>
        <ul id="book-list">
          {this.displayBooks()}
        </ul>
        <BookDetail bookId={selected} />
      </div>
    )
  }
}

export default graphql(getBooksQuery)(BookList);
