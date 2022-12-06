import React from 'react';
import banner from '../../../assets/images/Others/bg-banner3.jpg'


const Banner = () => {
    return (
        <section className='lg:h-[600px] bg-opacity-10 w-full'>
            <div style={{ background: `url(${banner})` }} className="hero ">
                <div className="hero-content flex justify-center text-center items-center lg:py-40">
                    {/* <img src={img} className="w-1/2 rounded-lg shadow-2xl" alt='' /> */}

                    <div className='text-white '>
                        <h1 className="text-5xl font-bold">Used books!</h1>
                        <p className="py-6 mx-28">Since 2005, we have been doing online secondhand book sales. Find millions of copies of gently used books available for purchase from vendors worldwide. You may save money, support independent booksellers, be environmentally friendly, and get access to an unrivaled range of historical literature by opting to shop for secondhand books.</p>
                        <button className="btn btn-primary text-white">See your favorite books</button>
                    </div>
                </div>
            </div>
        </section>

    );
};

export default Banner;