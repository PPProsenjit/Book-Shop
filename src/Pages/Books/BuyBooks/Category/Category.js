import React, { useEffect, useState } from 'react';


const Category = () => {
    const [items, setItems] = useState([]);

    useEffect(() => {
        fetch('https://my-books-server.vercel.app/category')
            .then(res => res.json())
            .then(data => setItems(data))
    }, [])
    const handleItem = () => {


    }

    return (
        <div className="drawer drawer-mobile ">
            <input id="category-drawer" type="checkbox" className="drawer-toggle" />
            <div className="drawer-side">
                <label htmlFor="category-drawer" className="drawer-overlay"></label>
                <ul className="menu p-4 w-80 bg-base-100 text-base-content">
                    {
                        items.map(item => <li key={item._id}>
                            <button onClick={handleItem} className='link link-hover'>{item.name}</button>
                        </li>

                        )
                    }
                </ul>

            </div>
        </div>

    );
};

export default Category;