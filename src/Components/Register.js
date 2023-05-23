import React, { useContext } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/UserContexts';
import SignInWithGoogle from './SignInWithGoogle';

const Register = () => {
    const { createAccount } = useContext(AuthContext);

    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || '/';

    const handleRegiFormSubmit = (event) => {
        event.preventDefault();
        const fullName = event.target.name.value;
        console.log("Your name is", fullName);
        const email = event.target.email.value;
        const password = event.target.password.value;

        createAccount(email, password)
            .then(result => navigate(from, { replace: true }))
            .catch(error => console.log(error.message));
    };

    return (
        <div className='md:flex border border-gray-500 max-w-6xl mx-auto my-10'>
            <div className='md:w-1/2 bg-secondary p-10 flex justify-center items-center'>
                <div className='text-white'>
                    <img className='w-52 h-28' src="https://reactrouter.com/_brand/react-router-stacked-color.png" alt="..." />
                    <p className='mt-5'>React Router is a routing library for React applications that helps manage navigation and rendering of different views. It synchronizes the URL with the application's UI, allowing components to be rendered based on the current URL. It supports features like nested routing, route parameters, and route switching. With React Router, you can define routes, create navigation links, and handle dynamic segments in URLs. It is widely used and provides a declarative and efficient way to handle client-side routing in React applications, making it easier to build complex single-page applications with multiple views.</p>
                </div>
            </div>
            <div className='md:w-1/2 p-10'>
                <h3 className='text-xl font-semibold mb-5'>Please, Register your Account!!</h3>
                <SignInWithGoogle />
                <div className="divider">OR</div>
                <form onSubmit={handleRegiFormSubmit}>
                    <div className='flex flex-col my-5'>
                        <label htmlFor="nameField" className='mb-2 font-semibold'>Your Full Name</label>
                        <input type="text" name="name" id="nameField" className="input input-bordered input-secondary w-full" placeholder='Enter your name' required />
                    </div>
                    <div className='flex flex-col my-5'>
                        <label htmlFor="emailField" className='mb-2 font-semibold'>Email</label>
                        <input type="email" name="email" id="emailField" className="input input-bordered input-secondary w-full" placeholder='Enter your email' required />
                    </div>
                    <div className='flex flex-col my-5'>
                        <label htmlFor="passField" className='mb-2 font-semibold'>Password</label>
                        <input type="password" name="password" id="passField" className="input input-bordered input-secondary w-full" placeholder='****************' required />
                    </div>
                    <div className='mt-5'>
                        <button type='submit' className="btn btn-secondary w-full">Register your account</button>
                    </div>
                </form>
                <div className='mt-5'>
                    <span>Don't have an account? <Link to='/login' className='text-secondary hover:underline'>Login</Link></span>
                </div>
            </div>
        </div>
    );
};

export default Register;