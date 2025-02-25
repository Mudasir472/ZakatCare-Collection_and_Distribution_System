import React, { useState } from 'react';
import axios from 'axios';
import { toast } from "react-toastify";

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [loader, setLoader] = useState(false); // Initially false to not show loader
    const [mailSent, setMailSent] = useState(false); // Track whether the mail has been sent

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoader(true); // Show loader when form is submitted
        try {
            const res = await axios.post(`${import.meta.env.VITE_LOCAL_HOST}/forgot-password`, { email });
            setLoader(false); // Hide loader when response is received
            setMailSent(true); // Set mailSent to true when email is successfully sent
            toast.success(res?.data?.message);
            console.log(res.data);
        } catch (error) {
            setLoader(false); // Hide loader on error
            toast.error(error?.response?.data?.message);
            console.log(error);
        }
        finally {
            setEmail('')
        }
    };

    return (
        <div>
            <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <h3>Forgot Password</h3>
                    <p>We'll email you a password reset link.</p>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                Email address
                            </label>
                            <div className="mt-2">
                                <input
                                    placeholder='Enter your email'
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    className="block w-full rounded-md  py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>
                        <div>
                            <button
                                type="submit"
                                disabled={loader || mailSent} // Disable button when loading or mail is sent
                                className={`flex w-full justify-center rounded-md px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm 
                                    ${loader || mailSent ? 'bg-success' : 'bg-indigo-600 hover:bg-indigo-500'} 
                                    focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600`}
                            >
                                {loader ? (
                                    <span className="flex items-center">
                                        <svg
                                            className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                        >
                                            <circle
                                                className="opacity-25"
                                                cx="12"
                                                cy="12"
                                                r="10"
                                                stroke="currentColor"
                                                strokeWidth="4"
                                            />
                                            <path
                                                className="opacity-75"
                                                fill="currentColor"
                                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                                            />
                                        </svg>
                                        Sending...
                                    </span>
                                ) : mailSent ? (
                                    <span>
                                        Mail has been sent <i className="bi bi-check2"></i>
                                    </span>
                                ) : (
                                    'Reset Password'
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ForgotPassword;
