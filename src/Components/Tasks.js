import React, { useEffect, useState } from 'react';
import Breadcrumb from './Breadcrumb';
import { Link } from 'react-router-dom';
import { ChevronDoubleDownIcon } from '@heroicons/react/24/solid';

const Tasks = () => {
    const [tasks, setTasks] = useState([]);
    const [users, setUsers] = useState([]);
    const [visibleTasks, setVisibleTasks] = useState([]);
    const [sortedTasks, setSortedTasks] = useState([]);
    const [hoverSortBtn, setHoverSortBtn] = useState(false);
    const [toggleLoader, setToggleLoader] = useState(true);

    useEffect(() => {
        fetch("https://jsonplaceholder.typicode.com/todos")
            .then(res => res.json())
            .then(data => {
                // For Shuffling Array element
                data.sort(() => Math.random() - 0.5);
                setTasks(data);
                setVisibleTasks(data);
                // For initially showing 10 data
                setSortedTasks(data.slice(0, 10));
                setToggleLoader(false);
            })
            .catch(error => console.log(error.message));

        fetch("https://jsonplaceholder.typicode.com/users")
            .then(res => res.json())
            .then(data => setUsers(data))
            .catch(error => console.log(error.message));
    }, []);

    const handleViewMoreBtn = () => {
        setSortedTasks(visibleTasks.slice(0, sortedTasks.length + 10));
    };

    const handleSortByDropdown = (e) => {
        if (e.target.innerText.toLowerCase() === 'all') {
            setVisibleTasks(tasks);
            setSortedTasks(tasks.slice(0, 10));
        } else if (e.target.innerText.toLowerCase() === 'completed') {
            const filteredTasks = tasks.filter(task => task.completed === true);
            setVisibleTasks(filteredTasks);
            setSortedTasks(filteredTasks.slice(0, 10));
        } else {
            const filteredTasks = tasks.filter(task => task.completed === false);
            setVisibleTasks(filteredTasks);
            setSortedTasks(filteredTasks.slice(0, 10));
        }
    };

    // Preparing Object to send through Breadcrumb component
    let travelledPath = window.location.pathname.split('/');
    travelledPath = travelledPath.slice(1, travelledPath.length);
    const breadcrumbData = {
        name: 'Tasks',
        paths: travelledPath
    };

    return (
        <div>
            <Breadcrumb props={breadcrumbData} />
            {
                toggleLoader ?
                    <div className={`w-14 h-14 mx-auto my-10 ${toggleLoader ? 'block' : 'hidden'}`}>
                        <img src="https://i.gifer.com/origin/34/34338d26023e5515f6cc8969aa027bca_w200.gif" alt="Loading..." />
                    </div>
                    :
                    <>
                        <div className='w-11/12 md:w-3/4 mx-auto mt-10 flex justify-end'>
                            <div className="dropdown dropdown-hover">
                                <label tabIndex={0} className="btn btn-outline m-1" onMouseEnter={() => setHoverSortBtn(true)} onMouseLeave={() => setHoverSortBtn(false)}>Sort By<ChevronDoubleDownIcon className={`text-secondary ml-2 w-5 h-5 ${hoverSortBtn ? 'animate-bounce' : 'animate-pulse'}`} /></label>
                                <ul onClick={handleSortByDropdown} tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
                                    <li><Link>All</Link></li>
                                    <li><Link>Completed</Link></li>
                                    <li><Link>Not Completed</Link></li>
                                </ul>
                            </div>
                        </div>
                        <div className="w-11/12 md:w-3/4 h-[70vh] mt-10 mx-auto overflow-auto shadow-xl">
                            <table className="table mx-auto w-full">
                                {/* head */}
                                <thead className='sticky top-0 z-10'>
                                    <tr>
                                        <th>User</th>
                                        <th>Task</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {/* row 1 */}
                                    {
                                        sortedTasks.map(task => {
                                            return (
                                                <tr key={task.id}>
                                                    <td>
                                                        <div className="flex items-center space-x-3">
                                                            <div data-tip={users[task?.userId - 1]?.username} className="tooltip tooltip-right tooltip-secondary avatar placeholder hover:animate-pulse">
                                                                <Link to={`/users/${task?.userId}`} className="w-12 h-12 rounded-full ring ring-secondary ring-offset-base-100 ring-offset-2 flex justify-center items-center">
                                                                    {
                                                                        users[task?.userId - 1]?.name ? users[task?.userId - 1]?.name.split(' ')[0]?.split('')[0] + users[task?.userId - 1]?.name.split(' ')[1]?.split('')[0] : <img className='w-full h-full rounded-full' src='https://is3-ssl.mzstatic.com/image/thumb/Purple115/v4/20/e3/ac/20e3ac89-9946-686d-0775-8b31d25e5ba2/AppIcon-0-0-1x_U007emarketing-0-0-0-7-0-0-sRGB-0-0-0-GLES2_U002c0-512MB-85-220-0-0.png/512x512bb.jpg' alt='...' />
                                                                    }
                                                                </Link>
                                                            </div>
                                                            <div>
                                                                <div className="font-bold">{users[task?.userId - 1]?.name ? users[task?.userId - 1]?.name : 'Not Available'}</div>
                                                                <div className="text-sm opacity-50">{users[task?.userId - 1]?.address?.city ? users[task?.userId - 1]?.address?.city : 'Not Available'}</div>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        {task?.title ? task?.title : 'Task Not Available'}
                                                        <br />
                                                        <span className="badge badge-ghost badge-sm">{task?.completed ? 'Completed' : 'Not completed yet'}</span>
                                                    </td>
                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                            </table>
                        </div>
                        <button className="btn btn-secondary btn-outline mt-5 mb-10 block mx-auto" onClick={handleViewMoreBtn}>View More Tasks</button>
                    </>
            }
        </div>
    );
};

export default Tasks;