import { useEffect, useState } from 'react';
import { BookDescription } from './BookDescription';

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

function buildSearchUrl(title: string, author: string, maxResults: number): string {
  let url = "https://www.googleapis.com/books/v1/volumes?q=";
  const conditions: string[] = []
  if (title) {
    conditions.push(`intitle:${title}`);
  }
  if (author) {
    conditions.push(`inauthor:${author}`);
  }
  return url + conditions.join('+') + `&maxResults=${maxResults}`;
}

export const useBookData = (title: string, author: string, maxResults: number) => {
  const [books, setBooks] = useState([] as BookDescription[]);

  useEffect(() => {
    if (title || author) {
      const url = buildSearchUrl(title, author, maxResults);
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
  }, [title, author, maxResults]);

  return books;
}