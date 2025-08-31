import { useState, useEffect } from 'react'
import './App.css'
import { fetchBooks, createBook, Book } from './api/books';
import { BookItem } from './components/Book'

function App() {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [title, setTitle] = useState<string>("");
  const [author, setAuthor] = useState<string>("");

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
    createBook({title: title, author: author})
    e.preventDefault()
    setTitle("") // clear input
    setAuthor("")
  }

  return (
    <>
      <div>
        <h1> Welcome to J&D Bookkepper </h1>
        <div>
          {
            books.map(book => (
              <div className="book-item-container" key={book.id}>
                <BookItem title={book.title} author={book.author}/>
              </div>
            ))
          }
        </div>
        <form onSubmit={handleSubmit} className="form-container">
          <input
            type="text"
            placeholder="enter title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <input
            type="text"
            placeholder="enter author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />
          <button type="submit"> Submit </button>
        </form>
      </div>
    </>
  )
}

export default App