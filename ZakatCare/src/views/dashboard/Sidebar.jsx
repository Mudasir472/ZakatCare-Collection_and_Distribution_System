import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

function Sidebar() {
    const location = useLocation();

    return (
        <>
            <div className="sidebar">
                <div className="sidebar-main">
                    <nav>
                        <ul className="sidebar-lists flex flex-column items-start justify-evenly text-dark">
                            <Link to="">
                                <li
                                    className={`flex items-center justify-evenly ${location.pathname === '/dashboard' ? 'bg-color-sidebar color-white' : ''}`}
                                >
                                    <span><i className="bi bi-speedometer"></i></span>
                                    Dashboard
                                </li>
                            </Link>
                            <Link to="donor-list">
                                <li
                                    className={`flex items-center justify-evenly ${location.pathname === '/dashboard/donor-list' ? 'bg-color-sidebar color-white' : ''}`}
                                >
                                    <span><i className="bi bi-card-checklist"></i></span>
                                    Donor-List
                                </li>
                            </Link>
                            <Link to="contact-list">
                                <li
                                    className={`flex items-center justify-evenly ${location.pathname === '/dashboard/contact-list' ? 'bg-color-sidebar color-white' : ''}`}
                                >
                                    <span><i className="bi bi-check-square"></i></span>
                                    Contact-List
                                </li>
                            </Link>
                            <Link to="reciever-list">
                                <li
                                    className={`flex items-center justify-evenly ${location.pathname === '/dashboard/reciever-list' ? 'bg-color-sidebar color-white' : ''}`}
                                >
                                    <span><i className="bi bi-heart"></i></span>
                                    Reciever-list
                                </li>
                            </Link>
                            <Link to="approved-list">
                                <li
                                    className={`flex items-center justify-evenly ${location.pathname === '/dashboard/approved-list' ? 'bg-color-sidebar color-white' : ''}`}
                                >
                                    <span><i className="bi bi-chat-dots"></i></span>
                                    Approve List
                                </li>
                            </Link>

                        </ul>
                    </nav>
                </div>


            </div>
        </>
    );
}

export default Sidebar;
