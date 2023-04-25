import React, { Fragment, useEffect, useState } from 'react';
import Breadcrumb from './Breadcrumb';

const UserProfile = () => {
    const [user, setUser] = useState({});
    const { name, company, address, website, email, phone, username } = user;
    const [animation, setAnimation] = useState(false);

    useEffect(() => {
        setAnimation(true);
    }, []);

    // Finding the Catch Phrases
    const catchPhrases = company?.catchPhrase?.split(' ');

    // Calculating the user id
    const userid = window.location.pathname?.split('/');
    const userId = userid[userid.length - 1];

    // Generating User's personal informations
    const phoneNo = phone?.split('x')[0];
    const personalInfoObject = {
        name: name,
        username: username,
        email: email,
        phone: phoneNo,
        website: website
    };
    // const personalInfo = [name, username, email, phone, website];
    const personalInfoNames = Object.keys(personalInfoObject);
    const personalInfo = Object.values(personalInfoObject);

    // Generating 2 digits from first letters of name
    const firstName = user?.name?.split(' ')[0]?.split('')[0];
    const lastName = user?.name?.split(' ')[1]?.split('')[0];
    const avatarName = (firstName + lastName).toString();

    useEffect(() => {
        fetch(`https://jsonplaceholder.typicode.com/users/${userId ? userId : 1}`)
            .then(res => res.json())
            .then(data => setUser(data))
            .catch(error => console.log(error.message))
    }, [userId]);

    // Preparing Object to send through Breadcrumb component
    const travelledPath = userid.slice(1, userid.length);
    const breadcrumbData = {
        name: 'User Profile',
        paths: [...travelledPath, name]
    };

    return (
        <Fragment>
            <Breadcrumb props={breadcrumbData}  />
            <div className={`bg-gray-200 relative shadow-2xl border-2 rounded-lg w-5/6 md:w-5/6  lg:w-4/6 xl:w-3/6 mx-auto my-28 transition-opacity duration-1000 ease-linear ${animation ? 'opacity-100' : 'opacity-0'}`}>
                <div data-tip={name} className="tooltip tooltip-bottom tooltip-secondary avatar placeholder flex justify-center cursor-default">
                    <div className="w-32 rounded-full ring ring-secondary ring-offset-base-100 ring-offset-2 bg-base-200 absolute -top-20 transition duration-200 transform hover:scale-110">
                        <span className='overflow-hidden text-4xl'>
                            {
                                avatarName.length === 2 ? avatarName : <img className='w-full h-full rounded-full' src='https://is3-ssl.mzstatic.com/image/thumb/Purple115/v4/20/e3/ac/20e3ac89-9946-686d-0775-8b31d25e5ba2/AppIcon-0-0-1x_U007emarketing-0-0-0-7-0-0-sRGB-0-0-0-GLES2_U002c0-512MB-85-220-0-0.png/512x512bb.jpg' alt='...' />
                            }
                        </span>
                    </div>
                </div>

                <div className="mt-16">
                    <h1 className="font-bold text-center text-3xl text-gray-900">{company?.name}</h1>
                    <p className="text-center text-sm text-gray-400 font-medium">{address?.suite}, {address?.street}, {address?.city}</p>
                    <span className='block w-fit mx-auto text-sm text-primary'>(Company Details)</span>

                    <div className="my-5 px-6">
                        <a href={`https://${website}`} className="text-secondary block rounded-lg text-center font-medium leading-6 px-6 py-3 bg-base-100">Connect via: <span className="font-bold">{website}</span></a>
                    </div>
                    <ul className="flex justify-between items-center my-5 px-6">
                        {
                            catchPhrases?.map((phrase, idx) => <li key={idx} className="text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded transition duration-150 ease-in font-medium text-sm text-center w-full py-3 capitalize cursor-default">{phrase}</li>)
                        }
                    </ul>

                    <div className="w-full">
                        <h3 className="font-medium text-gray-900 text-left px-6">Other Personal Informations</h3>
                        <ul className="mt-5 w-full flex flex-col items-center overflow-hidden text-sm">
                            {
                                personalInfo?.map((perInfo, idx) => <li key={idx} className="w-full border-t border-gray-100 text-gray-600 py-4 pl-6 pr-3 hover:bg-gray-100 transition duration-150 flex justify-between items-center">
                                    <span className='font-bold capitalize'>{personalInfoNames[idx]}:</span>
                                    <span>{perInfo}</span>
                                </li>)
                            }
                        </ul>
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

export default UserProfile;