import React from 'react';


const SellerTable = ({ seller, i, setDeletingSeller }) => {

    const { name, email, role } = seller;

    return (

        <tr>
            <th>{i + 1}</th>
            <td>
                <div className="font-bold">{name}</div>
            </td>
            <td>
                <span>{email}</span>
            </td>
            <td>{role}</td>

            <th>
                <label onClick={() => setDeletingSeller(seller)} htmlFor="confirmation-modal" className="btn btn-ghost btn-xs text-red-600">Delete</label>
            </th>
        </tr>

    );
};

export default SellerTable;