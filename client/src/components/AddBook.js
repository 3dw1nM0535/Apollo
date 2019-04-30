import React from "react";
import { graphql, compose } from "react-apollo";

//Queries
import { getAuthorsQuery, getBooksQuery } from "../queries";

// Mutations
import { addBookMutation } from "../mutations";

class AddBook extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      genre: "",
      authorId: ""
    }
  }

  displayAuthors() {
    const { getAuthorsQuery } = this.props;
    if (getAuthorsQuery.loading) {
      return (
        <option disabled>Loading Authors..</option>
      );
    }
    return getAuthorsQuery.authors.map(author => {
      return (
        <option key={author.id} value={author.id}>{author.name}</option>
      );
    });
  }

  onSubmit(e) {
    const { name, genre, authorId } = this.state;
    e.preventDefault();
    this.props.addBookMutation({
      variables: {
        name,
        genre,
        authorId
      },
      refetchQueries: [{ query: getBooksQuery }]
    });
  }

  render () {
    return (
      <form id="add-book" onSubmit={this.onSubmit.bind(this)}>
        <div className="field">
          <label>Book Name: </label>
          <input type="text" onChange={(e) => this.setState({ name: e.target.value })} />
        </div>
        <div className="field">
          <label>Genre: </label>
          <input type="text" onChange={(e) => this.setState({ genre: e.target.value })} />
        </div>
        <div className="field">
          <label>Author: </label>
          <select onChange={(e) => this.setState({ authorId: e.target.value })}>
            <option>Select Author</option>
            {this.displayAuthors()}
          </select>
        </div>

        <button>+</button>
      </form>
    );
  }
}

export default compose(
  graphql(getAuthorsQuery, { name: "getAuthorsQuery"}),
  graphql(addBookMutation, { name: "addBookMutation"})
)(AddBook);
