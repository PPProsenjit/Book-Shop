import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import ConfirmationModal from '../../Shared/ConfirmationModal/ConfirmationModal';
import Loading from '../../Shared/Loading/Loading';
import BuyerTable from './BuyerTable';

const AllBuyer = () => {

  const [deletingBuyer, setDeletingBuyer] = useState(null);

  const url = `https://my-books-server.vercel.app/sellers/buyer`;

  const { data: buyers = [], isLoading, refetch } = useQuery({
    queryKey: ['buyers'],
    queryFn: async () => {
      const res = await fetch(url);
      const data = await res.json();
      return data;
    }
  })

  const handleDeleteBuyer = buyer => {
    fetch(`https://my-books-server.vercel.app/buyer/${buyer._id}`, {
      method: 'DELETE',
      headers: {
        authorization: `bearer ${localStorage.getItem('accessToken')}`
      }
    })
      .then(res => res.json())
      .then(data => {
        if (data.deletedCount > 0) {
          refetch();
          toast.success(`Your Buyer ${buyer.name} deleted successfully`)
        }
      })
  }

  const closeModal = () => {
    setDeletingBuyer(null);
  }



  if (isLoading) {
    <Loading></Loading>
  }


  return (
    <div>
      <div>
        <h3 className="text-3xl mb-6">All Buyers</h3>
        <div className="overflow-x-auto w-full">
          <table className="table w-full">
            <thead>
              <tr>
                <th></th>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {
                buyers.map((buyer, i) => <BuyerTable
                  key={buyer._id}
                  buyer={buyer}
                  i={i}
                  setDeletingBuyer={setDeletingBuyer}
                ></BuyerTable>)
              }
            </tbody>
          </table>
          {
            deletingBuyer && <ConfirmationModal
              title={`Are you confirm to delete?`}
              message={`If you delete( ${deletingBuyer.name}). It cannot be undone so make sure it.`}
              successAction={handleDeleteBuyer}
              successButtonName="Delete"
              modalData={deletingBuyer}
              closeModal={closeModal}
              setDeletingBuyer={setDeletingBuyer}
            ></ConfirmationModal>
          }
        </div>
      </div>
    </div>
  );
};

export default AllBuyer;