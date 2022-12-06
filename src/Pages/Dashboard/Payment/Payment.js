import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import React from 'react';
import { useLoaderData } from 'react-router-dom';
import CheckoutForm from './CheckoutForm';

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PK);
console.log(stripePromise);
const Payment = () => {
    const order = useLoaderData();
    return (
        <div className='mt-10'>
            <h3 className="text-3xl">Payment: {order.name}</h3>
            <img src={order.picture} alt="Avatar Tailwind CSS Component" />
            <p className='text-xl text-red-400'>contract info: {order.phone} location:{order.location} </p>
            <p className="text-xl">Please pay <span className='text-red-400'>${order.price}</span> for buying this book </p>
            <div className='w-96 my-14'>
                <Elements stripe={stripePromise}>
                    <CheckoutForm order={order}/>
                </Elements>
            </div>
        </div>
    );
};

export default Payment;