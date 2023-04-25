import React, { Fragment, useState } from 'react';
import Modal from './Modal';

const Comment = ({ comment }) => {
    const { body: commentBody, email, name } = comment;

    const [post, setPost] = useState({});
    const [modalOpen, setModalOpen] = useState(false);
    const [tooltipData, setTooltipData] = useState('Copy email');

    const handleModalBtn = (postId) => {
        fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`)
            .then(res => res.json())
            .then(data => setPost(data));

        setModalOpen(true);
    };

    // Click to copy feature
    const copyTextToClipboard = async (e) => {
        const text = e.target.innerText;
        if('clipboard' in navigator) {
            setTooltipData('Copied');

            // For showing Copy email again after 5 seconds
            setTimeout(() => {
                setTooltipData('Copy email');
            }, 5000);

            return await navigator.clipboard.writeText(text);
        } else {
            return document.execCommand('copy', true, text);
        }
    };

    // Preparing data to send into Modal component
    const props = {
        post: post,
        setModalOpen: setModalOpen
    };

    return (
        <Fragment>
            <div className="card bg-base-100 shadow-xl image-full overflow-hidden transition-all duration-300 ease-linear hover:scale-105">
                <figure><img className='w-full' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRNbZtXvo7xDfcn69sZcUeeg8UtHEMNVj6zUgo_mDJTsh4q4MUk1472aYGCSPP7aJMigVA&usqp=CAU" alt="..." /></figure>
                <div className="card-body">
                    <div className={`transition-all duration-1000 ease-in-out ${modalOpen && 'translate-x-[400px]'}`}>
                        <small data-tip={tooltipData} className={`tooltip tooltip-right ${tooltipData.toLowerCase() === 'copied' ? 'tooltip-success' : 'tooltip-secondary'} cursor-copy text-secondary`} onClick={copyTextToClipboard}>{email}</small>
                        <h2 className="card-title text-green-500 font-bold">{name}</h2>
                        <p className='text-gray-300 font-serif'>{commentBody}</p>
                    </div>
                    <div className="card-actions justify-end mt-10">
                        <button className="btn text-secondary font-bold btn-link absolute bottom-0 hover:animate-pulse"
                            onClick={() => handleModalBtn(comment.postId)}>View Post
                        </button>
                    </div>
                    <div className={`absolute left-0 ${modalOpen ? 'block top-0' : 'top-[-500px]'} transition-all duration-700 ease-in-out delay-700`}>
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