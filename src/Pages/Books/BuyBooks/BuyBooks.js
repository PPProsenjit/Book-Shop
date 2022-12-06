
import React, { useEffect, useState } from 'react';
import Category from './Category/Category';
import BookCard from './BookCard';
import BookingModal from '../../BookingModal/BookingModal';

const BuyBooks = () => {
    const [seeBooks, setSeeBooks] = useState([]);
    const [item, setItem] = useState(null);

    useEffect(() => {
        fetch('https://my-books-server.vercel.app/allbooks')
            .then(res => res.json())
            .then(data => setSeeBooks(data))
    }, [])
    return (
        <div className='flex'>
            <div className='w-2/6'>
                <Category></Category>
            </div>
            <div className='w-full'>
                <div className='flex justify-evenly text-bold text-3xl'>
                    <label htmlFor="category-drawer" className="btn text-black hover:text-white hover:bg-sky-500 bg-white flex justify-start lg:hidden">Category</label>
                    <h3 className=' text-center'>All Books</h3></div>
                <div className='grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1'>
                    {
                        seeBooks.map((book) => <BookCard
                            key={book._id}
                            book={book}
                            setItem = {setItem}
                        ></BookCard>)
                    }
                </div>
                   { item && <BookingModal
                    item ={item}
                    setItem = {setItem}
                    ></BookingModal>}
            </div>

        </div>
    );
};

export default BuyBooks;