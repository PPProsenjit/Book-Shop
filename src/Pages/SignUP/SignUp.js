import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Contexts/AuthProvider';

const SignUp = () => {

    const { register, formState: { errors }, handleSubmit } = useForm();
    const { createUser, updateUser, signInWithGoogle } = useContext(AuthContext);
    const [signUPError, steSignUpError] = useState('');
    const navigate = useNavigate();
    const handleSignUp = data => {
        console.log(data);
        steSignUpError('');
        createUser(data.email, data.password)
            .then(result => {
                const user = result.user;
                console.log(user);
                toast('User Created Successfully!')
                const userInfo = {
                    displayName: data.name
                }
                updateUser(userInfo)
                    .then(() => {
                        saveSeller(data.name, data.email, data.role)

                    })
                    .catch(error => console.log(error)
                    )
            })
            .catch(error => {
                console.error(error);
                steSignUpError(error.message)
            })
    };

    const handleSignInWithGoogle = () => {
        signInWithGoogle()
            .then(result => {
                const user = result.user
                saveSeller(user.displayName, user.email, "Buyer");
                console.log(user)
                navigate('/')
            })
            .fetch(error => { console.error(error) })
    }

    const saveSeller = (name, email, role) => {
        const seller = { name, email, role };
        fetch('https://my-books-server.vercel.app/sellers', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(seller)
        })
            .then(res => res.json())
            .then(result => {
                getSellerToken(email);
            })

    };

    const getSellerToken = email => {
        fetch(`https://my-books-server.vercel.app/jwt?email=${email}`)
            .then(res => res.json())
            .then(result => {
                if (result.accessToken) {
                    localStorage.setItem('accessToken', result.accessToken)
                    navigate('/');
                }
            })
    }



    return (
        <div className='h-[800px] flex justify-center items-center'>
            <div className='w-96 p-6' >
                <h2 className='font-bold text-center text-2xl'>Sign Up</h2>
                <form onSubmit={handleSubmit(handleSignUp)}>
                    <div className="form-control w-full">
                        <label className="label"> <span className="label-text">name</span> </label>
                        <input type="text"{...register('name', {
                            required: 'Name is required'
                        })} className="input input-bordered w-full" />
                        {errors.name && <span className='text-red-600'>{errors.name.message}</span>}
                    </div>

                    <div className="form-control w-full">
                        <label className="label"> <span className="label-text">Email</span> </label>
                        <input type="email" {...register('email', {
                            required: 'email is required'
                        })} className="input input-bordered w-full" />
                        {errors.email && <span className='text-red-600'>{errors.email.message}</span>}
                    </div>
                    <div className="form-control w-full">
                        <label className="label"> <span className="label-text">Select Role</span> </label>
                        <select type="role" {...register('role', {
                            required: 'role is required'
                        })} className="select select-bordered">
                            <option>Seller</option>
                            <option>Buyer</option>
                        </select>
                        {errors.role && <span className='text-red-600'>{errors.role.message}</span>}
                    </div>
                    <div className="form-control w-full">
                        <label className="label"><span className="label-text">password</span></label>
                        <input type="password" {...register('password', {
                            required: 'password is required',
                            minLength: { value: 6, message: 'password must be 6 character' },
                            pattern: { value: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])/, message: 'Password must have uppercase, number and special characters' }
                        })} className="input input-bordered w-full" />
                        {errors.password && <span className='text-red-600'>{errors.password.message}</span>}
                    </div>
                    <input className='btn btn-accent w-full mt-6' value='Sign Up' type="submit" />
                    {signUPError && <p className='text-red-600'>{signUPError}</p>}
                </form>
                <p>Already have an account !<Link to='/login' className='text-secondary'>Please Sign in </Link></p>
                <div className="divider">OR</div>
                <button onClick={handleSignInWithGoogle} className='btn btn-outline w-full'>CONTINUE WITH GOOGLE</button>
            </div>
        </div>
    );
};

export default SignUp;