import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import ConfirmationModal from '../../Shared/ConfirmationModal/ConfirmationModal';
import Loading from '../../Shared/Loading/Loading';
import SellerTable from './SellerTable';

const AllSeller = () => {
  const [deletingSeller, setDeletingSeller] = useState(null);
  const url = `https://my-books-server.vercel.app/sellers/seller`;

  const { data: sellers = [], refetch, isLoading } = useQuery({
    queryKey: ['sellers'],
    queryFn: async () => {
      const res = await fetch(url);
      const data = await res.json();
      return data;
    }
  })
  // console.log(sellers);

  const handleDeleteSeller = seller => {
    fetch(`https://my-books-server.vercel.app/seller/${seller._id}`, {
      method: 'DELETE',
      headers: {
        authorization: `bearer ${localStorage.getItem('accessToken')}`
      }
    })
      .then(res => res.json())
      .then(data => {
        if (data.deletedCount > 0) {
          refetch();
          toast.success(`Your Seller ${seller.name} deleted successfully`)
        }
      })
  }
  const closeModal = () => {
    setDeletingSeller(null);
  }
  if (isLoading) {
    <Loading></Loading>
  }

  return (
    <div>
      <h3 className="text-3xl mb-6">All Seller</h3>
      <div className="overflow-x-auto w-full">
        <table className="table w-full">
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {
              sellers.map((seller, i) => <SellerTable
                key={seller._id}
                seller={seller}
                i={i}
                setDeletingSeller={setDeletingSeller}
              ></SellerTable>)
            }
          </tbody>
        </table>
        {
          deletingSeller && <ConfirmationModal
            title={`Are you to delete?`}
            message={`If you delete (${deletingSeller.name}). It cannot be undone so make sure it.`}
            successAction={handleDeleteSeller}
            successButtonName="Delete"
            modalData={deletingSeller}
            closeModal={closeModal}
            setDeletingSeller={setDeletingSeller}
          ></ConfirmationModal>
        }
      </div>
    </div>
  );
};

export default AllSeller;