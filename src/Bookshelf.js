import React from 'react'
import ListBooks from './ListBooks'

class Bookshelf extends React.Component {
  render(){
    return(
      <div className="bookshelf">
		<h2 className="bookshelf-title">{this.props.title}</h2>
        <div className="bookshelf-books">
          <ListBooks  
              books={this.props.books}
              shelfBooks={this.props.books}
              onUpdateBook={this.props.onUpdateBook}/>            
        </div>
      </div>             

    )
  }  
}

export default Bookshelf;