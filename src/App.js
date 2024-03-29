import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import { Route, Link } from 'react-router-dom'
import SearchBooks from './SearchBooks'
import Bookshelf from './Bookshelf'

class BooksApp extends React.Component {
  state = {
    books: []
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     ==> implemented with Router
     */
  }
  componentDidMount() {
    BooksAPI.getAll()
      .then((books) => {
        this.setState({books: books})
      })
    //console.log('books in bookshelf (Initial)', this.state.books); //for Testing
  }
  updateBook = (book, shelf) => {
    //console.log('updateBook:', book, shelf);
    BooksAPI.update(book, shelf)
      .then((book, shelf) => {
        BooksAPI.getAll()
          .then((books) => {
            this.setState({books: books})
         })
      })
    //console.log('books in bookshelf (updateBook)', this.state.books); // for Testing
  }

  render() {
    return (
      <div className="app">
       <Route path='/search' render={({ history })=>(
         <SearchBooks
            shelfBooks={this.state.books}
            onUpdateBook={(book, shelf) => {
              this.updateBook(book, shelf)
              history.push('/')
            }}
          /> 
         )} />
       <Route exact path='/' render={()=>
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                <Bookshelf
                    title="Want to Read"
                    books={this.state.books.filter((book)=>book.shelf === 'wantToRead')}
                    onUpdateBook={(book, shelf) => {
                     this.updateBook(book, shelf)
                     //history.push('/')
                    }}
                 />
                <Bookshelf
                    title="Currently Reading"
                    books={this.state.books.filter((book)=>book.shelf === 'currentlyReading')}
                    onUpdateBook={(book, shelf) => {
                     this.updateBook(book, shelf)
                     //history.push('/')
                    }}
                 />
                <Bookshelf
                    title="Read"
                    books={this.state.books.filter((book)=>book.shelf === 'read')}
                    onUpdateBook={(book, shelf) => {
                     this.updateBook(book, shelf)
                     //history.push('/')
                    }}
                 />

              </div>
            </div>
            <div className="open-search">
              <Link to='/search' className='open-search'>Add a book</Link>
            </div>
          </div>
        }/>
      </div>
    )
  }
}

export default BooksApp
