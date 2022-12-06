import { useQuery } from '@tanstack/react-query';
import React, { useContext, useState } from 'react';
import toast from 'react-hot-toast';
import { AuthContext } from '../../../Contexts/AuthProvider';
import ConfirmationModal from '../../Shared/ConfirmationModal/ConfirmationModal';
import Loading from '../../Shared/Loading/Loading';
import OrderTable from './OrderTable';

const MyOrder = () => {

    const { user } = useContext(AuthContext);

    const [deletingOrder, setDeletingOrder] = useState(null)

    const url = `https://my-books-server.vercel.app/orders?email=${user?.email}`;

    const { data: orders = [], isLoading, refetch } = useQuery({
        queryKey: ['orders', user?.email],
        queryFn: async () => {
            const res = await fetch(url);
            const data = await res.json();
            return data;
        }
    })

    const handleDeleteOrder = order => {
        fetch(`https://my-books-server.vercel.app/order/${order._id}`, {
            method: 'DELETE',
            headers: {
                authorization: `bearer ${localStorage.getItem('accessToken')}`
            }
        })
            .then(res => res.json())
            .then(data => {
                if (data.deletedCount > 0) {
                    refetch();
                    toast.success(`Your Order ${order.name} deleted successfully`)
                }
            })

    }

    const closeModal = () => {
        setDeletingOrder(null);
    }
    if (isLoading) {
        <Loading></Loading>
    }

    return (
        <div>
            <h3 className="text-3xl mb-6">My Order</h3>
            <div className="overflow-x-auto w-full">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Book Name</th>
                            <th>price</th>
                            <th>Location</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            orders.map((order, i) => <OrderTable
                                key='order._id'
                                order={order}
                                i={i}
                                setDeletingOrder={setDeletingOrder}
                            ></OrderTable>)
                        }
                    </tbody>
                </table>
                {
                    deletingOrder && <ConfirmationModal
                        title={`Are you confirm to delete?`}
                        message={`If you delete (${deletingOrder.name}). It cannot be undone so makeSure it`}
                        successAction={handleDeleteOrder}
                        successButtonName="Delete"
                        modalData={deletingOrder}
                        closeModal={closeModal}
                        setDeletingOrder={setDeletingOrder}
                    ></ConfirmationModal>
                }
            </div>
        </div>
    );
};

export default MyOrder;