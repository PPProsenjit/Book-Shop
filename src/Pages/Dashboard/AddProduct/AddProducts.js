import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { AuthContext } from '../../../Contexts/AuthProvider';
import Loading from '../../Shared/Loading/Loading';

const AddProducts = () => {

    const { register, formState: { errors }, handleSubmit } = useForm();

    const imageApiKey = process.env.REACT_APP_imageBBKey;
    const { user } = useContext(AuthContext);
    const { data: categories, isLoading } = useQuery({
        queryKey: ['specialty'],
        queryFn: async () => {
            const res = await fetch('https://my-books-server.vercel.app/dashboardCategory')
            const data = await res.json();
            return data;
        }
    })

    if (isLoading) {
        return <Loading></Loading>
    }

    const handleAddBook = data => {
        const image = data.image[0];
        const formData = new FormData();
        formData.append('image', image);
        const url = `https://api.imgbb.com/1/upload?key=${imageApiKey}`
        fetch(url, {
            method: 'POST',
            body: formData
        })
            .then(res => res.json())
            .then(imageData => {
                if (imageData.success) {
                    // console.log(imageData.data.url);
                    const addBook = {
                        name: data.name,
                        writer: data.writer,
                        location: data.location,
                        displayName: user.displayName,
                        email: user.email,
                        category: data.category,
                        condition: data.condition,
                        price: data.price,
                        phone: data.phone,
                        description: data.description,
                        picture: imageData.data.url
                    }
                    console.log(addBook)
                    //save book information 
                    fetch('https://my-books-server.vercel.app/addBooks', {
                        method: 'POST',
                        headers: {
                            'content-type': 'application/json',
                        },
                        body: JSON.stringify(addBook)
                    })
                        .then(res => res.json())
                        .then(result => {
                            toast('Added Product successfully')
                            console.log(result);
                        });
                    ///console.log(addBook)     
                }
            });
    }
    return (
        <div className='w-full p-6'>
            <h3 className="text-3xl">Add A Product</h3>
            <form onSubmit={handleSubmit(handleAddBook)}>
                <div className='grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3' >
                    <div className="form-control w-full">
                        <label className="label"> <span className="label-text">Book Name</span> </label>
                        <input type="text"{...register('name', {
                            required: 'book name is required'
                        })} className="input input-bordered w-full" />
                        {errors.name && <span className='text-red-600'>{errors.name.message}</span>}
                    </div>
                    <div className="form-control w-full">
                        <label className="label"> <span className="label-text">writer</span> </label>
                        <input type="text"{...register('writer', {
                            required: 'writer name is required'
                        })} className="input input-bordered w-full" />
                        {errors.writer && <span className='text-red-600'>{errors.writer.message}</span>}
                    </div>

                    <div className="form-control w-full">
                        <label className="label"> <span className="label-text">Location</span> </label>
                        <input type="location" {...register('location', {
                            required: 'Location is required'
                        })} className="input input-bordered w-full" />
                        {errors.Location && <span className='text-red-600'>{errors.Location.message}</span>}
                    </div>
                    <div className="form-control w-full">
                        <label className="label"> <span className="label-text">Category</span> </label>
                        <select type="category" {...register('category')} className="select select-bordered">
                            <option disabled selected>Please select a Option</option>
                            {
                                categories.map(category => <option
                                    key={category._id}
                                    value={category.name}
                                >{category.name}</option>)
                            }

                        </select>

                    </div>
                    <div className="form-control w-full">
                        <label className="label"> <span className="label-text">Condition</span> </label>
                        <select {...register('condition')} type="Condition" className="select select-bordered">
                            <option disabled selected>Please select a Option</option>
                            <option>Excellent</option>
                            <option>Good</option>
                            <option>Fine</option>
                        </select>

                    </div>
                    <div className="form-control w-full">
                        <label className="label"><span className="label-text">Price</span></label>
                        <input type="price" {...register('price', {
                            required: 'price is required'
                        })} className="input input-bordered w-full" />
                        {errors.price && <span className='text-red-600'>{errors.price.message}</span>}
                    </div>
                    <div className="form-control w-full">
                        <label className="label"> <span className="label-text">Add Book Image</span> </label>
                        <input type="file"{...register('image', {
                            required: 'book image is required'
                        })} className="border input w-full" />
                        {errors.image && <span className='text-red-600'>{errors.image.message}</span>}
                    </div>
                    <div className="form-control w-full">
                        <label className="label"><span className="label-text">Phone Number</span></label>
                        <input type="phone" {...register('phone', {
                            required: 'phone is required'
                        })} className="input input-bordered w-full" />
                        {errors.phone && <span className='text-red-600'>{errors.phone.message}</span>}
                    </div>
                    <div className="form-control w-full">
                        <label className="label"><span className="label-text">Description</span></label>
                        <textarea {...register('description')} type='description' placeholder="Add purchase year and other relevant information" className="w-full rounded-md border focus:ring focus:ring-opacity-75 focus:ring-violet-400 dark:border-gray-700 dark:text-gray-900" spellcheck="false"></textarea>

                    </div>
                </div>
                <input className='btn btn-accent w-full mt-6' value='Add Product' type="submit" />

            </form>
        </div>
    );
};

export default AddProducts;
