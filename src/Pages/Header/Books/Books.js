import React, { useEffect, useState } from 'react';
import BookCard from '../../Books/BuyBooks/BookCard';
import { Link } from 'react-router-dom';
import BookingModal from '../../BookingModal/BookingModal';
const Books = () => {
    const [seeBooks, setSeeBooks] = useState([]);
    const [item, setItem] = useState(null);
    useEffect(() => {
        fetch('https://my-books-server.vercel.app/allbooks')
            .then(res => res.json())
            .then(data => setSeeBooks(data))
    }, [])
    return (
        <div className='w-full mt-5'>

            <div className='grid lg:grid-cols-3 md:grid-cols-2 place-items-center'>
                {
                    seeBooks.slice(0, 4).map((book) => <BookCard
                        key={book._id}
                        book={book}
                        setItem = {setItem}
                    ></BookCard>)
                }

            </div>
            <Link to='/buybooks' className='text-bold text-3xl flex justify-center link link-hover'>See All Books</Link>
            {item && <BookingModal
                item={item}
                setItem={setItem}
            ></BookingModal>}
        </div>
    );
};

export default Books;