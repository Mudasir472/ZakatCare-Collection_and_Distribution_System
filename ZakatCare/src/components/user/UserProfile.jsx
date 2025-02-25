import React, { useContext, useRef, useState } from "react";
import { LoginContext } from "../../context/AuthContext";
import axios from "axios";
import { Link } from "react-router-dom";
// import { URI } from "../../../env";
import { toast } from "react-toastify";

const UserProfile = () => {
    const { loginData, setLoginData } = useContext(LoginContext);
    const [loading, setLoading] = useState(false);

    const fileInputRef = useRef(null);
    const token = localStorage.getItem('token');

    const handleImageClick = () => {
        fileInputRef.current.click();
    };
    console.log(loginData);

    return (
        <div className="bg-white h-[42rem] container mx-auto text-black font-sans  flex flex-col  justify-center">
            <div style={{ boxShadow: "#64646f33 0 7px 29px" }} className=" h-[89%] w-full  rounded-lg p-6 ">
                <h1 className="text-2xl font-bold mb-6">Personal Information</h1>
                <div className="flex items-center mb-5 gap-[30rem]">
                    <div className="flex items-center">
                        <img
                            className="h-[9rem] w-[9rem] rounded-full "
                            src={loginData?.image?.url}
                            alt="Profile"
                        />
                        <div className="ms-4">
                            <h3>{loginData?.name}</h3>
                            <h2>Admin</h2>
                        </div>
                    </div>

                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-[4rem]">
                    {/* Left Column */}
                    <div className="flex flex-col gap-[2rem]">
                        <p className="mb-2">
                            <span className="font-semibold">Full Name: </span>{loginData?.name}
                        </p>


                    </div>
                    {/* Right Column */}
                    <div className="flex flex-col gap-[2rem]">
                        <p className="mb-2">
                            <span className="font-semibold">Email Address: </span>
                            {loginData?.email}
                        </p>

                        {/* <p className="mb-2">
                            <span className="font-semibold">Phone Number: </span>{loginData?.number}
                        </p> */}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserProfile;
