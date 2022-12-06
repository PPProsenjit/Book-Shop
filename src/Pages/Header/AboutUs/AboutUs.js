import React from 'react';
import book1 from '../../../assets/images/Others/book1.jpg'
import book2 from '../../../assets/images/Others/jhankar2.png'
import book3 from '../../../assets/images/Others/book3.jpg'
import book4 from '../../../assets/images/Others/book4.jpg'
import book5 from '../../../assets/images/Others/jhankar.png'
const AboutUs = () => {
    return (
        <section className="dark:bg-gray-200 dark:text-gray-900">
            <div className="container flex flex-col items-center justify-center mx-auto sm:py-12 lg:py-12 lg:flex-row lg:justify-between">
                <div className="flex flex-col p-6 text-center rounded-sm  lg:max-w-md xl:max-w-lg lg:text-left lg:w-1/2">
                    <h1 className="text-xl font-bold leading-none sm:text-3xl">Millions of used
                        <span className="dark:text-violet-400"> copies for sale</span>
                    </h1>
                    <p className="mt-6 mb-8 text-lg sm:mb-12">Used paperbacks and hardcovers from all the major authors.
                    used hardcovers and paperbacks by all the top writers. lovely old versions with distinctive dust covers. Large volumes at affordable rates, including coffee-table and art books hundreds of thousands of secondhand romance books. used self-help literature, including books on business and spirituality. There are countless mystery, crime, and adventure books.
                    </p>
                </div>
                <div className="p-6 dark:bg-gray-300 lg:mx-28 dark:text-gray-50">
                    <div className="container grid grid-cols-2 mx-auto md:grid-cols-4">
                        <img src={book1} alt="" className="w-full h-full col-span-2 row-span-2 rounded shadow-sm min-h-96 md:col-start-3 md:row-start-1 aspect-square" />
                        <img alt="" className="w-full h-full rounded shadow-sm min-h-48 aspect-square" src={book2} />
                        <img alt="" className="w-full h-full rounded shadow-sm min-h-48 aspect-square" src={book3} />
                        <img alt="" className="w-full h-full rounded shadow-sm min-h-48 aspect-square" src={book4} />
                        <img alt="" className="w-full h-full rounded shadow-sm min-h-48 aspect-square" src={book5} />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AboutUs;