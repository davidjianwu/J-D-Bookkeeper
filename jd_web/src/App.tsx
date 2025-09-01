import { useState, useEffect } from 'react'
import './App.css'
import { fetchBooks, createBook, deleteBook, updateBook, Book } from './api/books';
import { BookItem } from './components/Book'

function App() {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [title, setTitle] = useState<string>("");
  const [author, setAuthor] = useState<string>("");
  const [submittedBook, setSubmittedBook] = useState<string>("")
  const [deletedBook, setDeletedBook] = useState<number | null>(null)
  const [updatedBook, setUpdatedBook] = useState<string>("")
  const [editBookId, setEditBookId] = useState<number | null>(null);
  const [editTitle, setEditTitle] = useState<string>("");
  const [editAuthor, setEditAuthor] = useState<string>("");

  useEffect(() => {
    console.log("useEffect run")
    const loadBooks = async () => {
      try {
        const data = await fetchBooks();   // call the API function
        setBooks(data);
        console.log(data)                     // store data in state
      } catch (err: any) {
        setError(err.message);              // handle errors
      } finally {
        setLoading(false);
      }
    };
    loadBooks();
  }, [submittedBook, deletedBook, updatedBook]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await createBook({title: title, author: author})
    setTitle("") // clear input
    setAuthor("")
    setSubmittedBook(title)
  }

  const handleDelete = async(e: React.FormEvent, bookId: number) => {
    e.preventDefault()
    await deleteBook(bookId)
    setDeletedBook(bookId)
  }

  const handleUpdate = async(e: React.FormEvent, bookId: number, book: any) => {
    e.preventDefault()
    await updateBook(bookId, book)
    setEditBookId(null)
    setUpdatedBook(`${bookId}${book.title}${book.author}`)
  }

  const handleOpenEditForm = (book: any) => {
    if (editBookId === book.id) {
      setEditBookId(null)
    } else {
      setEditBookId(book.id)
      setEditTitle(book.title)
      setEditAuthor(book.author)
    }
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
                <button onClick={(e) => {handleDelete(e, book.id)}}>Delete</button>
                <button onClick={() => handleOpenEditForm(book)}>Edit</button>
                {editBookId == book.id ? (
                  <form onSubmit={(e) => {handleUpdate(e, book.id, {title: editTitle, author: editAuthor})}} className="form-container">
                    <input
                      type="text"
                      placeholder="enter title"
                      value={editTitle}
                      onChange={(e) => setEditTitle(e.target.value)}
                    />
                    <input
                      type="text"
                      placeholder="enter author"
                      value={editAuthor}
                      onChange={(e) => setEditAuthor(e.target.value)}
                    />
                  <button type="submit"> Submit Edit </button>
                  </form>
                ) : null
                }
                <hr />
              </div>
            ))
          }
        </div>
        <h2> Add A Book! </h2>
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