import React, { useContext, useRef, useState } from "react";
import { LoginContext } from "../../context/AuthContext";
import axios from "axios";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";


const UserProfile = () => {
    const { loginData, setLoginData } = useContext(LoginContext);
    const [loading, setLoading] = useState(false);

    const fileInputRef = useRef(null);
    const token = localStorage.getItem('token');

    const handleImageClick = () => {
        fileInputRef.current.click();
    };
    const handleFileChange = async (event) => {
        const file = event.target.files[0];
        if (file) {
            const formData = new FormData();
            formData.append('profilePic', file);
            setLoading(true);
            try {
                const response = await axios.post(`${import.meta.env.VITE_LOCAL_HOST}/zakatcare/changeprofile`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        'Authorization': `Bearer ${token}`,
                    },
                    withCredentials: true,
                });
                toast.success("profile changed successfully")
                console.log(response);

                const updatedLoginData = {
                    ...loginData,
                    image: { url: response?.data?.user?.image?.url },
                };

                setLoginData(updatedLoginData);
            } catch (error) {
                console.error('Error uploading the file:', error);
                toast.error("Failed to upload image")
            }
            finally {
                setLoading(false);
            }
        }
    };
    console.log(loginData);

    return (
        <div className="bg-gradient-to-br from-blue-50 to-purple-50 min-h-screen flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl shadow-2xl w-full max-w-4xl overflow-hidden">
                <div className="p-8">
                    <h1 className="text-3xl font-bold text-gray-800 mb-8">Personal Information</h1>
                    <div className="flex flex-col md:flex-row items-center md:items-start space-y-8 md:space-y-0 md:space-x-8">
                        <div className="flex-shrink-0 relative">
                            <form encType="multipart/form-data">
                                {/* Hidden file input */}
                                <input
                                    type="file"
                                    ref={fileInputRef}
                                    style={{ display: 'none' }}
                                    onChange={handleFileChange}
                                    name="profilePic"
                                />
                            </form>
                            <div className="relative group cursor-pointer" onClick={handleImageClick}>
                                {loading ? (
                                    <>
                                        <img
                                            className="h-40 w-40 rounded-full object-cover border-4 border-purple-200 cursor-pointer hover:border-purple-400 transition-all duration-300"
                                            src={loginData?.image?.url}
                                            alt="Profile"
                                            onClick={handleImageClick}
                                        />
                                        <div className="absolute  inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-full opacity-100  transition-opacity">
                                            <span className="loading text-white loading-spinner loading-md"></span>
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <img
                                            className="h-40 w-40 rounded-full object-cover border-4 border-purple-200 cursor-pointer hover:border-purple-400 transition-all duration-300"
                                            src={loginData?.image?.url}
                                            alt="Profile"
                                            onClick={handleImageClick}
                                        />
                                        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                                            <i class="bi bi-pencil text-white"></i>
                                        </div>
                                    </>
                                )}

                            </div>
                            <div className="absolute bottom-0 right-0 bg-purple-500 rounded-full p-2 cursor-pointer hover:bg-purple-600 transition-all duration-300">
                                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"></path>
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"></path>
                                </svg>
                            </div>
                        </div>
                        <div className="text-center md:text-left">
                            <h3 className="text-2xl font-semibold text-gray-800">{loginData?.name}</h3>
                            <p className="text-purple-600 font-medium">Admin</p>
                        </div>
                    </div>
                    <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-4">
                            <div className="bg-gray-50 p-4 rounded-lg">
                                <p className="text-sm text-gray-500">Full Name</p>
                                <p className="text-lg font-semibold text-gray-800">{loginData?.name}</p>
                            </div>
                            <div className="bg-gray-50 p-4 rounded-lg">
                                <p className="text-sm text-gray-500">Role</p>
                                <p className="text-lg font-semibold text-gray-800">{loginData?.role}</p>
                            </div>
                        </div>
                        <div className="space-y-4">
                            <div className="bg-gray-50 p-4 rounded-lg">
                                <p className="text-sm text-gray-500">Email Address</p>
                                <p className="text-lg font-semibold text-gray-800">{loginData?.email}</p>
                            </div>
                        </div>
                    </div>
                    <div className="mt-8 flex justify-end">
                        <button className="bg-purple-500 text-white px-6 py-2 rounded-lg hover:bg-purple-600 transition-all duration-300">
                            Edit Profile
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserProfile;