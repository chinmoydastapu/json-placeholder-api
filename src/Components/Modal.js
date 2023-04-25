import React, { useEffect, useState } from 'react';
import { XMarkIcon } from '@heroicons/react/24/solid';
import { Link } from 'react-router-dom';

const Modal = ({ props }) => {
    const { post, setModalOpen } = props;
    const { title, body, userId } = post;

    const [user, setUser] = useState([]);

    // Generating 2 digits from first letter of names
    const firstName = user?.name?.split(' ')[0]?.split('')[0];
    const lastName = user?.name?.split(' ')[1]?.split('')[0];
    const avatarName = (firstName + lastName).toString();

    useEffect(() => {
        fetch(`https://jsonplaceholder.typicode.com/users/${userId ? userId : 1}`)
            .then(res => res.json())
            .then(data => setUser(data))
            .catch(error => console.log(error.message))
    }, [userId]);

    return (
        <div className={`p-4 pb-32 h-full w-full bg-slate-700 rounded-2xl`}>
            <div className="mb-5 flex justify-between items-center">
                <Link to={`/users/${userId ? userId : 1}`} data-tip={user?.name} className="tooltip tooltip-right avatar placeholder">
                    <div className="w-12 rounded-full ring ring-secondary ring-offset-base-100 ring-offset-2">
                        <span className='overflow-hidden'>
                            {
                                avatarName.length === 2 ? avatarName : <img className='w-full h-full rounded-full' src='https://is3-ssl.mzstatic.com/image/thumb/Purple115/v4/20/e3/ac/20e3ac89-9946-686d-0775-8b31d25e5ba2/AppIcon-0-0-1x_U007emarketing-0-0-0-7-0-0-sRGB-0-0-0-GLES2_U002c0-512MB-85-220-0-0.png/512x512bb.jpg' alt='...' />
                            }
                        </span>
                    </div>
                </Link>
                <button className="btn" onClick={() => setModalOpen(false)}>
                    <XMarkIcon className='w-6 h-6' />
                </button>
            </div>
            <h3 className="font-bold text-lg">{title}</h3>
            <p className="py-4">{body}</p>
        </div>
    );
};

export default Modal;