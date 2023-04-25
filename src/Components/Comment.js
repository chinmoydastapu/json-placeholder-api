import React, { Fragment, useState } from 'react';
import Modal from './Modal';

const Comment = ({ comment }) => {
    const { body: commentBody, email, name } = comment;

    const [post, setPost] = useState({});
    const [modalOpen, setModalOpen] = useState(false);

    const handleModalBtn = (postId) => {
        fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`)
            .then(res => res.json())
            .then(data => setPost(data));

        setModalOpen(true);
    };

    const props = {
        post: post,
        setModalOpen: setModalOpen
    };

    return (
        <Fragment>
            <div className="card bg-base-100 shadow-xl image-full overflow-hidden">
                <figure><img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRNbZtXvo7xDfcn69sZcUeeg8UtHEMNVj6zUgo_mDJTsh4q4MUk1472aYGCSPP7aJMigVA&usqp=CAU" alt="..." /></figure>
                <div className="card-body">
                    <div className={`transition-all duration-700 ease-in-out ${modalOpen && 'translate-x-[400px]'}`}>
                        <small className='text-secondary'>{email}</small>
                        <h2 className="card-title text-green-500 font-bold">{name}</h2>
                        <p className='text-gray-300 font-serif'>{commentBody}</p>
                    </div>
                    <div className="card-actions justify-end mt-10">
                        <button className="btn text-secondary font-bold btn-link absolute bottom-0"
                            onClick={() => handleModalBtn(comment.postId)}>View Post
                        </button>
                    </div>
                    <div className={`absolute left-0 ${modalOpen ? 'block top-0' : 'top-[-500px]'} transition-all duration-500 ease-in-out delay-500`}>
                        {
                            modalOpen ? <Modal props={props}></Modal> : undefined
                        }
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

export default Comment;