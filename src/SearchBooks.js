import React from 'react'
import * as BooksAPI from './BooksAPI'
import ListBooks from './ListBooks'
import { Link } from 'react-router-dom'


class SearchBooks extends React.Component {
  state = {
    query: '',
    searchedBooks:[]
  }
  updateQuery = (query) => {
    this.setState(() => ({
      query: query.trim(),
      searchedBooks: []
    }))
    this.searchBooks(query);
  }
  clearQuery = () => {
    this.updateQuery('')
  }

  searchBooks = (query) => {
    query === '' ? this.setState({searchedBooks: []}):
    BooksAPI.search(query, 20)
      .then((books) =>{
        this.setState(() =>({searchedBooks: books}))
      })
   // console.log('state searchedBooks', this.state.searchedBooks) //for Testing
    //console.log('state query', this.state.query)  //for Testing   
  }

  render() {
    const { query } = this.state.query
//    const { shelfBooks, onUpdateBook } = this.props

    return (
          <div className="search-books">
            <div className="search-books-bar">
              <Link to='/' className="close-search">Close</Link>
              <div className="search-books-input-wrapper">
                {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
                <input 
                  type="text"
                  placeholder="Search by title or author"
                  value={query}
                  onChange={(event) => this.updateQuery(event.target.value)}
                />
              </div>
            </div>
            <div className="search-books-results"> 
              {this.state.searchedBooks.length >= 0 && (
                <ListBooks 
                    books={this.state.searchedBooks}
                    shelfBooks={this.props.shelfBooks}
                    onUpdateBook={this.props.onUpdateBook}/>
               )}
            </div>
          </div>
    )
  }
}

export default SearchBooks;