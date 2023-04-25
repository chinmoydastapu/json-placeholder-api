import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
    MoonIcon,
    SunIcon,
    Bars2Icon,
    XMarkIcon
} from '@heroicons/react/24/solid';

const HeaderNav = ({ handleTheme }) => {
    const [toggleMenu, setToggleMenu] = useState(false);
    const [activeNavItem, setActiveNavItem] = useState('/');
    const [toggleTheme, setToggleTheme] = useState(false);

    const handleThemeMode = () => {
        handleTheme();
        setToggleTheme(!toggleTheme);
    };

    const navItems = [
        { path: '/home', name: 'Home' },
        { path: '/comments', name: 'Comments' },
        { path: '/about', name: 'About' },
        { path: '/contact', name: 'Contact' },
        { path: '/todos', name: 'Tasks' },
    ];

    return (
        <div className="navbar bg-base-100 sticky top-0 z-50">
            <div className="navbar-start">
                <div className="dropdown">
                    <label tabIndex={0} className="btn btn-outline lg:hidden"
                        onClick={() => setToggleMenu(!toggleMenu)}>
                        {
                            !toggleMenu ? <Bars2Icon className='h-6 w-6' /> : <XMarkIcon className='h-6 w-6' />
                        }
                    </label>
                    <ul tabIndex={0} className={`menu menu-compact transition-all duration-500 ease-in-out absolute mt-3 p-2 pr-24 shadow bg-base-300 rounded-lg w-fit ${toggleMenu ? 'block left-0' : 'left-[-250px]'}`}>
                        {
                            navItems.map((item, idx) => <li onClick={() => setToggleMenu(!toggleMenu)} className={`${activeNavItem === item.path ? 'text-secondary' : ''}`} key={idx}><Link className='hover:bg-transparent focus:bg-transparent' onClick={() => setActiveNavItem(item.path)} to={item.path}>{item.name}</Link></li>)
                        }
                    </ul>
                </div>
                <Link to='/' className="btn btn-ghost normal-case text-xl hover:bg-base-100 focus:bg-none active:bg-none font-bold">Rout<span className='text-secondary'>Ex</span></Link>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    {
                        navItems.map((item, idx) => <li className={`${activeNavItem === item.path ? 'text-secondary' : ''}`} key={idx}><Link className='hover:bg-transparent focus:bg-transparent' onClick={() => setActiveNavItem(item.path)} to={item.path}>{item.name}</Link></li>)
                    }
                </ul>
            </div>
            <div className="navbar-end">
                <button className="mr-2 text-secondary focus:outline-none"
                    onClick={handleThemeMode}>
                    {
                        !toggleTheme ? <MoonIcon className='h-6 w-6' />
                            : <SunIcon className='h-6 w-6' />
                    }
                </button>
            </div>
        </div>
    );
};

export default HeaderNav;