import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from 'axios';
import { Link, useNavigate } from "react-router-dom";
import logo from "/Logo.png"
import "./user.css"
import { LoginContext } from "../../context/AuthContext"

export default function Login() {
    const { loginData, setLoginData } = useContext(LoginContext)

    const [formData, setFormData] = useState({
        email: "",
        password: "",
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
            const response = await axios.post(`${import.meta.env.VITE_LOCAL_HOST}/zakatcare/login`, formData, { withCredentials: true });
            console.log(response);
            setLoginData(response?.data?.result?.existingUser);
            localStorage.setItem('token', JSON.stringify(response.data?.result?.token))
            localStorage.setItem('user', JSON.stringify(response.data?.result?.existingUser))
            toast.success(response?.data?.message);
            response.data?.result?.existingUser?.role === 'admin' ? navigate("/dashboard") : navigate("/")
            // navigate("/dashboard");

        } catch (error) {
            toast.error(error?.response?.data?.error)
        }

        // setFormData({
        //     email: "",
        //     password: "",
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
                        Log in to your account
                    </h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label htmlFor="email" className="form-label">Email</label>
                            <input
                                type="text"
                                value={formData.email}
                                onChange={handleInputChange}
                                className="form-control"
                                id="email"
                                name="email"
                                placeholder="Enter email"
                                required
                            />
                        </div>

                        <div>
                            <div className="flex items-center justify-between">
                                <label htmlFor="password" className="form-label">Password</label>
                            </div>
                            <div className="mt-2">
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
                        </div>

                        <div className="flex items-center justify-between">
                            <button style={{ width: '50%' }}
                                type="submit"
                                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                Sign in
                            </button>
                            {/* <span><Link to={"/forgot-password"}>Forgot password?</Link></span> */}
                        </div>
                    </form>

                    <p className="mt-3 text-center text-sm text-gray-500">
                        Not a member?{' '}
                        <Link to={"/zakatcare/signup"} className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                            Sign Up
                        </Link>
                    </p>

                </div>
            </div>
        </>
    )
}
