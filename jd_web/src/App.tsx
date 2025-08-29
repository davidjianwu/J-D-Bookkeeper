import { useState, useEffect } from 'react'
import './App.css'
import { fetchBooks, Book } from './api/books';

function App() {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadBooks = async () => {
      try {
        const data = await fetchBooks();   // call the API function
        setBooks(data);                     // store data in state
      } catch (err: any) {
        setError(err.message);              // handle errors
      } finally {
        setLoading(false);
      }
    };
    loadBooks();
  }, []);
  console.log(books)
  return (
    <>
      <div>
        <h1> Welcome to J&D Bookkepper </h1>
        <div>
          {
            books.map(book => (
              <p>
                {book.title}
              </p>
            ))
          }
        </div>
      </div>
    </>
  )
}

export default App
