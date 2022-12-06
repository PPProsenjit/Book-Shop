import React from 'react';
import { Link } from 'react-router-dom';

const OrderTable = ({ order, i, setDeletingOrder }) => {
    const { name, picture, price, location } = order;
    return (
        <tr>
            <th>{i + 1}</th>
            <td>
                <div className="flex items-center space-x-3">
                    <div className="avatar">
                        <div className="mask mask-squircle w-12 h-12">
                            <img src={picture} alt="Avatar Tailwind CSS Component" />
                        </div>
                    </div>
                    <div>
                        <div className="font-bold">{name}</div>
                        <div className="text-sm opacity-50">{location}</div>
                    </div>
                </div>
            </td>
            <td>${price}</td>
            <td>
                {
                    order.price && !order.paid && <Link to={`/dashboard/payment/${order._id}`}>
                        <button className="btn btn-ghost btn-xs">checkout</button></Link>
                }
                {
                    order.price && order.paid && <button className="btn btn-success btn-xs">paid</button>
                }
            </td>
            <th>
                <label onClick={() => setDeletingOrder(order)} htmlFor="confirmation-modal" className="btn btn-ghost btn-xs text-red-600">Delete</label>
            </th>
        </tr>
    );
};

export default OrderTable;