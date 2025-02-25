import React, { useContext, useEffect, useState } from 'react';
import logo from '/Logo.png';
import './dashboard.css';
import { useNavigate } from 'react-router-dom';
import { LoginContext } from '../../context/AuthContext';

function Headbar() {
    const navigate = useNavigate();
    const { loginData } = useContext(LoginContext)
    const [dropdownVisible, setDropdownVisible] = useState(false);

    const toggleDropdown = () => {
        setDropdownVisible(!dropdownVisible);
    };

    const handleOptionClick = (option) => {
        if (option === 'profile') {
            window.location.href = '/zakatcare/userprofile';
        } else if (option === 'logout') {
            handleLogout();
        }
        setDropdownVisible(false); // Close the dropdown after selection
    };

    const handleLogout = () => {
        navigate("/zakatcare/logout");
        // window.location.href = '/zakatcare/login';
    };
    
    return (
        <>
            <div className="headbar">
                <div className="headbar-main container">
                    <nav className="flex items-center justify-between">
                        <img className="admin-logo" src={logo} alt="Logo" />
                        <div className="admin flex items-center justify-between">
                            <img src={loginData?.image?.url} alt="User" />
                            <div className="adminBdy flex flex-column items-start justify-center">
                                <h4>{loginData?.name}</h4>
                                <p>{loginData?.role}</p>
                            </div>
                            <span
                                className="flex items-center justify-center dropdown-toggle"
                                onClick={toggleDropdown}
                            >
                                {/* <i className="bi bi-chevron-down"></i> */}
                            </span>
                            {/* Dropdown Menu */}
                            {dropdownVisible && (
                                <div className="dropdown-menuu">
                                    <div
                                        className="dropdown-items"
                                        onClick={() => handleOptionClick('profile')}
                                    >
                                        Profile
                                    </div>
                                    <div
                                        className="dropdown-items"
                                        onClick={() => handleOptionClick('logout')}
                                    >
                                        Logout
                                    </div>
                                </div>
                            )}
                        </div>
                    </nav>
                </div>
            </div>
        </>
    );
}

export default Headbar;
