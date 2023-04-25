import React from 'react';
import Breadcrumb from './Breadcrumb';

const Contact = () => {
    // Preparing Object to send through Breadcrumb component
    let travelledPath = window.location.pathname.split('/');
    travelledPath = travelledPath.slice(1, travelledPath.length);
    const breadcrumbData = {
        name: 'Contact',
        paths: travelledPath
    };

    return (
        <div>
            <Breadcrumb props={breadcrumbData}  />
        </div>
    );
};

export default Contact;