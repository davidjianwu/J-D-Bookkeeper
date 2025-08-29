import { API_URL } from '../constants';

// TypeScript interfaces for typing
export interface Book {
  id: number;
  author_id: string;
  title: string;
  pages: string;
  genre: string;
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

// // Create a new user
// export const createUser = async (user: Omit<User, 'id'>): Promise<User> => {
//   const response = await fetch(`${API_URL}/users`, {
//     method: 'POST',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify(user),
//   });
//   if (!response.ok) throw new Error(`Failed to create user: ${response.status}`);
//   const data: User = await response.json();
//   return data;
// };