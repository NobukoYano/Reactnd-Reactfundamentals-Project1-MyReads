import React from 'react'

class ListBooks extends React.Component {
  render(){
    const { books, shelfBooks, onUpdateBook } = this.props
    return(
      <ol className="books-grid">
          {books.map((book) => (
          <li key={book.id}>
          <div className="book">
			  <div className="book-top">
				<div 
                   className="book-cover" 
                   style={{ width: 128, height: 193, 
                   backgroundImage: `url(${book.imageLinks.thumbnail})` }}
                 ></div>
				<div className="book-shelf-changer">
				  <select  onChange={(e) => this.props.onUpdateBook(book, e.target.value)}>
					<option value="move" disabled>Move to...</option>
					<option value="currentlyReading">Currently Reading</option>
					<option value="wantToRead">Want to Read</option>
					<option value="read">Read</option>
					<option value="none">None</option>
				  </select>
				</div>
			  </div>
			  <div className="book-title">{book.title}</div>
			  <div className="book-authors">{book.authors.join(', ')}</div>
			</div>
		</li>            
		))}
	</ol>
    )
  }  
}

export default ListBooks;