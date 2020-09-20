import React, { useEffect, useState } from 'react';
import './App.css';
import BookDescription from './BookDescription';
import BookItem from './BookItem';

function extractBooks(json: any): BookDescription[] {
  const items: any[] = json.items;
  return items.map((item: any) => {
    const volumeInfo: any = item.volumeInfo;
    return {
      title: volumeInfo.title,
      authors: volumeInfo.authors ? volumeInfo.authors.join(', ') : "",
      thumbnail: volumeInfo.imageLinks ? volumeInfo.imageLinks.smallThumbnail : "",
    }
  });
}

type BookSearchDialogProps = {
  maxResults: number;
  onBookAdd: (book: BookDescription) => void;
}

const BookSearchDialog = (props: BookSearchDialogProps) => {
  const [books, setBooks] = useState([] as BookDescription[]);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  const handleTitleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  }

  const handleAuthorInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAuthor(e.target.value);
  }

  useEffect(() => {
    console.log(`useEffect: ${isSearching}`);
    if (isSearching) {
      let url = "https://www.googleapis.com/books/v1/volumes?q=";
      const conditions: string[] = []
      if (title) {
        conditions.push(`intitle:${title}`);
      }
      if (author) {
        conditions.push(`inauthor:${author}`);
      }
      url = url + conditions.join('+') + `&maxResults=${props.maxResults}`;
      fetch(url)
        .then((res) => {
          return res.json();
        })
        .then((json) => {
          return extractBooks(json);
        }).then((books) => {
          setBooks(books);
        }).catch((err) => {
          console.error(err);
        });

    }
    setIsSearching(false);
  }, [isSearching]);

  const handleSearchClick = () => {
    if (!title && !author) {
      alert("条件を入力してください");
      return;
    }
    setIsSearching(true);
  }

  const handleBookAdd = (book: BookDescription) => {
    props.onBookAdd(book);
  }

  const bookItems = books.map((b, idx) => {
    return (
      <BookItem
        description={b}
        onBookAdd={(b) => handleBookAdd(b)}
        key={idx} />
    );
  });

  return (
    <div className="dialog">
      <div className="operation">
        <div className="conditions">
          <input type="text" onChange={handleTitleInputChange} placeholder="タイトルで検索" />
          <input type="text" onChange={handleAuthorInputChange} placeholder="著者名で検索" />
        </div>
        <div className="button-like" onClick={handleSearchClick}>検索</div>
      </div>
      <div className="search-results">
        {bookItems}
      </div>
    </div>
  );
}

export default BookSearchDialog;