import React from 'react';
import BookDescription from './BookDescription';

const BookItem = (props: BookDescription) => {
  const { title, authors, thumbnail } = props;
  return (
    <div className="book-item">
      <h2 title={title}>{title}</h2>
      <div>{authors}</div>
      {thumbnail
        ? <img src={thumbnail} alt="" />
        : null
      }
      <div className="add-book"><span>+</span></div>
    </div>
  );
}

export default BookItem;