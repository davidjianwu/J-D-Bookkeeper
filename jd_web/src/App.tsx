import { useState, useEffect } from 'react'
import './App.css'
import { fetchBooks, createBook, Book } from './api/books';

function App() {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [title, setTitle] = useState<string>("");

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

  const handleSubmit = (e: React.FormEvent) => {
    createBook({title: title})
    e.preventDefault()
    setTitle("") // clear input
  }

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
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="enter title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <button type="submit"> Submit </button>
        </form>
      </div>
    </>
  )
}

export default App