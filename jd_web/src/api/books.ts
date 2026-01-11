import { API_URL } from '../constants';

// TypeScript interfaces for typing
export type Book =  {
  id: number;
  author_id: number;
  title: string;
  pages: string;
  genre: string;
  author: string;
}

export type EditBook = {
  id: number | null;
  title: string;
  author: string;
}

// Fetch all books
export const fetchBooks = async (): Promise<Book[]> => {
  const response = await fetch(`${API_URL}/books`);
  if (!response.ok) throw new Error(`Failed to fetch book: ${response.status}`);
  const data: Book[] = await response.json();
  return data;
};

// // Fetch single user by ID
// export const fetchUserById = async (id: number): Promise<User> => {
//   const response = await fetch(`${API_URL}/users/${id}`);
//   if (!response.ok) throw new Error(`Failed to fetch user ${id}: ${response.status}`);
//   const data: User = await response.json();
//   return data;
// };

// Create a new user
export const createBook = async (book: {title: string, author: string}): Promise<Book> => {
  const response = await fetch(`${API_URL}/books`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(book),
  });
  if (!response.ok) throw new Error(`Failed to create book: ${response.status}`);
  const data: Book = await response.json();
  return data;
};

export const deleteBook = async (id: number): Promise<void> => {
  const response = await fetch(`${API_URL}/books/${id}`, {
    method: 'DELETE',
  })
  if (!response.ok) throw new Error(`Failed to delete book ${response.status}`);
  return await response.json()
}

export const updateBook = async (book: EditBook): Promise<void> => {
  const response = await fetch(`${API_URL}/books/${book.id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(book)
  })
  if (!response.ok) throw new Error(`Failed to update book ${response.status}`);
  return await response.json()
}