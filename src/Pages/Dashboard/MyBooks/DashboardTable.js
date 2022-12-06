import React from 'react';

const DashboardTable = ({book, i, setDeletingBook}) => {
    const {name, picture,writer, price, location} =book;
    return (
        <tr>
            <th>{i+1}</th>
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
            <td>
                <span>{writer}</span>
            </td>
            <td>${price}</td>
            <th>
                <button className="btn btn-ghost btn-xs">Advertise</button>
            </th>
            <th>
            <label onClick={() => setDeletingBook(book)} htmlFor="confirmation-modal" className="btn btn-ghost btn-xs text-red-600">Delete</label>
            </th>
        </tr>

    );
};

export default DashboardTable;