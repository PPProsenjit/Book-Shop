/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useContext } from 'react';
import toast from 'react-hot-toast';
import { AuthContext } from '../../Contexts/AuthProvider';

const BookingModal = ({ item, setItem }) => {

    const { user } = useContext(AuthContext);
    const { name, picture, writer, price, location, phone, description } = item;

    const handleAddOrder = event => {
        event.preventDefault();

        const order = {
            userName: user?.displayName,
            email: user?.email,
            picture: picture,
            name: name,
            writer: writer,
            description: description,
            price: price,
            phone: phone,
            location: location
        }
        fetch('https://my-books-server.vercel.app/addorder', {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify(order)
        })
            .then(res => res.json())
            .then(result => {
                if (result.acknowledged) {
                    toast('Order added successfully ')
                    setItem(null);
                }
                console.log(result);
            });


        //console.log(order)
    }


    return (
        <>
            <input type="checkbox" id="booking-Modal" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box relative">
                    <label htmlFor="booking-Modal" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                    <form onSubmit={handleAddOrder} className="grid grid-cols-1 gap-2">
                        <img name="picture" className="p-8 h-[300px] flex justify-center rounded-3xl" src={picture} alt="product image" />
                        <h3 name="name" className="text-lg font-bold">{name}</h3>
                        <h4 name="writer" ><small className='text-red-600 text-sm'>{writer}</small></h4>
                        <p name="description" className="text-lg">Description: {description}</p>
                        <p name="price" className="text-lg">price: ${price}</p>
                        <p name="phone" className="text-lg">Phone: {phone}</p>
                        <p name="location" className="text-lg">Location: {location}</p>

                        <button className='btn btn-primary w-full'>Add to Card</button>
                    </form>

                </div>
            </div>
        </>
    );
};

export default BookingModal;