import { useQuery } from '@tanstack/react-query';
import React, { useContext, useState } from 'react';
import toast from 'react-hot-toast';
import { AuthContext } from '../../../Contexts/AuthProvider';
import ConfirmationModal from '../../Shared/ConfirmationModal/ConfirmationModal';
import Loading from '../../Shared/Loading/Loading';
import DashboardTable from './DashboardTable';

const MyBooks = () => {
  const { user } = useContext(AuthContext);
  const [deletingBook, setDeletingBook] = useState(null);
  const url = `https://my-books-server.vercel.app/books?email=${user?.email}`;

  const { data: books = [], refetch, isLoading } = useQuery({
    queryKey: ['books', user?.email],
    queryFn: async () => {
      const res = await fetch(url);
      const data = await res.json();
      return data;
    }
  })


  const handleDeleteBook = book => {
    fetch(`https://my-books-server.vercel.app/Book/${book._id}`, {
      method: 'DELETE',
      headers: {
        authorization: `bearer ${localStorage.getItem('accessToken')}`
      }
    })
      .then(res => res.json())
      .then(data => {
        if (data.deletedCount > 0) {
          refetch();
          toast.success(`Your Book ${book.name} deleted successfully`)
        }
      })
  }
  const closeModal = () => {
    setDeletingBook(null);
  }
  if (isLoading) {
    <Loading></Loading>
  }


  return (
    <div>
      <h3 className="text-3xl mb-6">My Products</h3>
      <div className="overflow-x-auto w-full">
        <table className="table w-full">
          <thead>
            <tr>
              <th></th>
              <th>Book Name</th>
              <th>author</th>
              <th>price</th>
              <th>status</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {
              books.map((book, i) => <DashboardTable
                key='book._id'
                book={book}
                i={i}
                setDeletingBook={setDeletingBook}
              ></DashboardTable>)
            }
          </tbody>
        </table>
        {
          deletingBook && <ConfirmationModal
            title={`Are you to delete?`}
            message={`If you delete (${deletingBook.name}). It cannot be undone so make sure it.`}
            successAction={handleDeleteBook}
            successButtonName="Delete"
            modalData={deletingBook}
            closeModal={closeModal}
            setDeletingBook={setDeletingBook}
          ></ConfirmationModal>
        }
      </div>
    </div>
  );
};

export default MyBooks;