import { useState, useEffect } from 'react'
import './App.css'
import { fetchBooks, createBook, deleteBook, updateBook, Book, EditBook } from './api/books';
import { BookItem } from './components/Book'

type BookForm = {
  title: string;
  author: string;
}

function App() {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState<BookForm>({title: "", author: ""})
  const [editForm, setEditForm] = useState<EditBook>({id: null, title: "", author: ""})
  const [submittedBook, setSubmittedBook] = useState<string>("")
  const [deletedBook, setDeletedBook] = useState<number | null>(null)
  const [updatedBook, setUpdatedBook] = useState<string>("")

  useEffect(() => {
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
    await createBook({title: form.title, author: form.author})
    setForm({title: "", author: ""})
    setSubmittedBook(form.title)
  }

  const handleDelete = async(e: React.FormEvent, bookId: number) => {
    e.preventDefault()
    await deleteBook(bookId)
    setDeletedBook(bookId)
  }

  const handleUpdate = async(e: React.FormEvent, book: EditBook) => {
    e.preventDefault()
    await updateBook(book)
    setEditForm({...editForm, id: null})
    setUpdatedBook(`${book.id}${book.title}${book.author}`)
  }

  const handleOpenEditForm = (book: any) => {
    if (editForm.id === book.id) {
      setEditForm({...editForm, id: null})
    } else {
      setEditForm({id: book.id, title: book.title, author: book.author})
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({...form, [e.target.name]: e.target.value})
  }

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditForm({...editForm, [e.target.name]: e.target.value})
  }

  return (
    <>
      <div>
        <h1> Welcome to J&D Bookkeeper </h1>
        <div>
          {
            books.map(book => (
              <div className="book-item-container" key={book.id}>
                <BookItem title={book.title} author={book.author}/>
                <button onClick={(e) => {handleDelete(e, book.id)}}>Delete</button>
                <button onClick={() => handleOpenEditForm(book)}>Edit</button>
                {editForm.id == book.id ? (
                  <form onSubmit={(e) => {handleUpdate(e, editForm)}} className="form-container">
                    <input
                      type="text"
                      placeholder="enter title"
                      name="title"
                      value={editForm.title}
                      onChange={handleEditChange}
                    />
                    <input
                      type="text"
                      placeholder="enter author"
                      name="author"
                      value={editForm.author}
                      onChange={handleEditChange}
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
            value={form.title}
            name="title"
            onChange={handleChange}
          />
          <input
            type="text"
            placeholder="enter author"
            value={form.author}
            name="author"
            onChange={handleChange}
          />
          <button type="submit"> Submit </button>
        </form>
      </div>
    </>
  )
}

export default App