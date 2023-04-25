import React, { Fragment, useEffect, useState } from 'react';
import Comment from './Comment';
import Breadcrumb from './Breadcrumb';

const Comments = () => {
    const [comments, setComments] = useState([]);
    const [visibleComments, setVisibleComments] = useState([]);
    const [toggleLoader, setToggleLoader] = useState(true);

    useEffect(() => {
        fetch("https://jsonplaceholder.typicode.com/comments")
            .then(res => res.json())
            .then(data => {
                data.sort(() => Math.random() - 0.5);
                setComments(data);
                setVisibleComments(data.slice(0, 6));
                setToggleLoader(false);
            });
    }, []);

    const handleSeeMore = () => {
        setVisibleComments(comments.slice(0, visibleComments.length + 6));
    };

    // Preparing Object to send through Breadcrumb component
    let travelledPath = window.location.pathname.split('/');
    travelledPath = travelledPath.slice(1, travelledPath.length);
    const breadcrumbData = {
        name: 'Comments',
        paths: travelledPath
    };

    return (
        <Fragment>
            <Breadcrumb props={breadcrumbData} />
            <h3 className='w-3/4 mx-auto text-secondary text-2xl font-bold text-center mt-10'>Our Comments</h3>
            <span className='block w-11/12 lg:w-1/2 mx-auto text-gray-400 text-center'>Here is our big collection of comments. You can view the original post and also the user profile by clicking on the avatar.</span>
            <div className={`w-14 h-14 mx-auto my-10 ${toggleLoader ? 'block' : 'hidden'}`}>
                <img src="https://i.gifer.com/origin/34/34338d26023e5515f6cc8969aa027bca_w200.gif" alt="Loading..." />
            </div>
            <div className={`w-11/12 mx-auto mt-5 mb-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 transition-opacity duration-500 ease-in ${toggleLoader ? 'opacity-0' : 'opacity-100'}`}>
                {
                    visibleComments.map(comment => <Comment
                        key={comment.id} comment={comment}></Comment>)
                }
            </div>
            <button onClick={handleSeeMore} className="block mx-auto mb-10 btn btn-secondary btn-outline">See More</button>
        </Fragment>
    );
};

export default Comments;