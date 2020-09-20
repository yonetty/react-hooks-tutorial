import React from 'react';
import BookToRead from './BookToRead';

type BookRowProps = {
  book: BookToRead;
  onMemoChange: (memo: string) => void;
}

const BookRow = (props: BookRowProps) => {
  const { title, authors, memo } = props.book;

  const handleMemoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    props.onMemoChange(e.target.value);
  }

  return (
    <div className="book-row">
      <div className="title">{title}</div>
      <div className="authors">{authors}</div>
      <input type="text" className="memo" value={memo} onChange={handleMemoChange} />
    </div>
  )
}

export default BookRow;