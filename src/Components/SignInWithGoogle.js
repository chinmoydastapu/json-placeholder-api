import React, { useContext } from 'react';
import { AuthContext } from '../contexts/UserContexts';
import { useLocation, useNavigate } from 'react-router-dom';

const SignInWithGoogle = () => {
    const { signInWithGoogle } = useContext(AuthContext);

    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || '/';

    const handleGoogleSignIn = () => {
        signInWithGoogle()
            .then(result => navigate(from, { replace: true }))
            .catch(error => console.log(error.message));
    };

    return (
        <div className="btn btn-secondary btn-outline w-fit mx-auto flex items-center justify-center" onClick={handleGoogleSignIn}>
            <img className='h-6 w-6' src="https://cdn-icons-png.flaticon.com/512/2991/2991148.png" alt="..." />
            <span className='ml-3'>Sign In with Google</span>
        </div>
    );
};

export default SignInWithGoogle;