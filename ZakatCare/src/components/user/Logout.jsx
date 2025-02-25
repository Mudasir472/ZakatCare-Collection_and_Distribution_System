import axios from 'axios';
import { toast } from "react-toastify"
import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from 'react';
import { LoginContext } from '../../context/AuthContext';

export default function Logout() {
    const { setLoginData } = useContext(LoginContext);
    const [loader, setLoader] = useState(false);
    const navigate = useNavigate();
    useEffect(() => {
        const loggout = async () => {
            try {
                setLoader(true);
                const token = localStorage.getItem('token')
                const response = await axios.post(`${import.meta.env.VITE_LOCAL_HOST}/zakatcare/logout`, {}, {
                    headers: { Authorization: `Bearer ${token}` },
                    withCredentials: true,
                });
                // Clear token from local storage
                localStorage.removeItem("token");
                localStorage.removeItem("user");
                // Clear login data in context to reflect logout
                setLoginData(null);
                toast.success(response?.data?.message);
                navigate("/zakatcare/login");
            } catch (error) {
                // console.error('Error logging out:', error);
            } finally {
                setLoader(false);
            }
        }

        loggout();
    }, [])

    return (
        <>
            {
                loader ? (<>Loading...</>) : (<>null</>)
            }
        </>
    )
}