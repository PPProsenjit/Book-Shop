import React from 'react';

const BuyerTable = ({ buyer, i, setDeletingBuyer }) => {
    const { name, email, role } = buyer;
    return (
        <tr>
            <th>{i + 1}</th>
            <td>
                <div className="font-bold">{name}</div>
            </td>
            <td>{email}</td>
            <td>{role}</td>
            <th>
                <label onClick={() => setDeletingBuyer(buyer)} htmlFor="confirmation-modal" className="btn btn-ghost btn-xs text-red-600">Delete</label>
            </th>
        </tr>
    );
};

export default BuyerTable;