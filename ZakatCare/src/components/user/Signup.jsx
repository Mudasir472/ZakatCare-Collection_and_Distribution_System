import { useContext, useState } from "react";
import axios from 'axios';
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import logo from "/Logo.png";
import "./user.css";
import { LoginContext } from "../../context/AuthContext";

export default function Signup() {
    const { loginData, setLoginData } = useContext(LoginContext);
    const [formData, setFormData] = useState({
        name: "",
        username: "",
        email: "",
        password: "",
        role: "" // Initialize role
    });
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        setFormData((currData) => ({
            ...currData,
            [e.target.name]: e.target.value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(`${import.meta.env.VITE_LOCAL_HOST}/zakatcare/signup`, formData, { withCredentials: true });
            toast.success(response.data.message || "Signup successful! ")
            setLoginData(response.data?.result?.user);
            localStorage.setItem('token', JSON.stringify(response.data?.result?.token))
            localStorage.setItem('user', JSON.stringify(response.data?.result?.user))
            response.data?.result?.user?.role === 'admin' ? navigate("/dashboard") : navigate("/")
        } catch (error) {
            console.error('Error:', error);
            toast.error(error.response.data.error);
        }

        // setFormData({
        //     name: "",
        //     username: "",
        //     email: "",
        //     password: "",
        //     role: ""
        // });
    };
    return (
        <>
            <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm comImg">
                    <img
                        alt="Your Company"
                        src={logo}
                        className="mx-auto h-10 w-auto"
                    />
                    <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                        Sign Up
                    </h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label htmlFor="name" className="form-label">Name</label>
                            <input
                                type="text"
                                value={formData.name}
                                onChange={handleInputChange}
                                className="form-control"
                                id="name"
                                name="name"
                                placeholder="Enter Name"
                                required
                            />
                        </div>

                        <div className="mt-2">
                            <label htmlFor="username" className="form-label">Username</label>
                            <input
                                type="text"
                                value={formData.username}
                                onChange={handleInputChange}
                                className="form-control"
                                id="username"
                                name="username"
                                placeholder="Enter username"
                                required
                            />
                        </div>

                        <div className="mt-2">
                            <label htmlFor="email" className="form-label">Email address</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                className="form-control"
                                id="email"
                                placeholder="example@gmail.com"
                                aria-describedby="emailHelp"
                                required
                            />
                        </div>

                        <div className="mt-2">
                            <label htmlFor="password" className="form-label">Password</label>
                            <input
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleInputChange}
                                className="form-control"
                                placeholder="password"
                                id="password"
                                required
                            />
                        </div>

                        <div className="mt-2">
                            <label htmlFor="role" className="form-label">Role</label>
                            <select
                                name="role"
                                value={formData.role}
                                onChange={handleInputChange}
                                className="form-control"
                                id="role"
                                required
                            >
                                <option value="" disabled>Select Role</option>
                                <option value="user">User</option>
                                <option value="admin">Admin</option>
                            </select>
                        </div>

                        <div>
                            <button
                                type="submit"
                                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                Sign Up
                            </button>
                        </div>
                    </form>

                    <p className="mt-10 text-center text-sm text-gray-500">
                        Already a member?{' '}
                        <Link to={"/zakatcare/login"} className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                            Sign In
                        </Link>
                    </p>
                </div>
            </div>
        </>
    );
}
