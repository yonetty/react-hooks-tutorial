import React from 'react';
import BookDescription from './BookDescription';

type BookItemProps = {
  description: BookDescription;
  onBookAdd: (book: BookDescription) => void;
}

const BookItem = (props: BookItemProps) => {
  const { title, authors, thumbnail } = props.description;
  const handleAddBookClick = () => {
    props.onBookAdd(props.description);
  }
  return (
    <div className="book-item">
      <h2 title={title}>{title}</h2>
      <div>{authors}</div>
      {thumbnail
        ? <img src={thumbnail} alt="" />
        : null
      }
      <div className="add-book" onClick={handleAddBookClick}>
        <span>+</span>
      </div>
    </div>
  );
}

export default BookItem;