import React from 'react';

const Breadcrumb = ({ props }) => {
    const { name, paths } = props;

    return (
        <div className="bg-[url('https://vjscl.com.mt/wp-content/uploads/2019/05/breadcrumbBackground.jpg')] bg-cover py-10">
            <div className='text-center text-5xl font-semibold text-white'>
                {name}
            </div>
            <div className="text-sm breadcrumbs flex justify-center items-center text-gray-400">
                <ul>
                    <li>Home</li>
                    {
                        paths.map((path, idx) => <li key={idx} className='capitalize'>{path}</li>)
                    }
                </ul>
            </div>
        </div>
    );
};

export default Breadcrumb;