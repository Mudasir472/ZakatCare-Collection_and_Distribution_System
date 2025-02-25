import { useEffect, useState } from "react";
import axios from 'axios';
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";

import { PhotoIcon, UserCircleIcon } from '@heroicons/react/24/solid'

export default function Donate() {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        firstname: "",
        lastname: "",
        email: "",
        address: "",
        city: "",
        state: "",
        pincode: "",
        amount: "",
        category: "",

    });
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if ((name === 'amount' || name === 'pincode') && !/^\d*$/.test(value)) { // Allow only digits
            toast.error("Must contain only digits.");
            return; // Prevent state update for invalid input
        }
        setFormData((currData) => ({
            ...currData,
            [e.target.name]: e.target.value
        }));
    };
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const resp = await axios.post(`${import.meta.env.VITE_LOCAL_HOST}/zakatcare/donations`, formData, { withCredentials: true });
            toast.success(resp.data.message)
            navigate('/form-submitted')
        } catch (error) {
            console.error('Error:', error);
            toast.error(error.response.data.message);
        }

        // setFormData({
        //     firstname: "",
        //     lastname: "",
        //     email: "",
        //     address: "",
        //     city: "",
        //     state: "",
        //     pincode: "",
        //     amount: "",
        //     category: "",
        // });
    };
    return (
        <form onSubmit={handleSubmit}>
            <div style={{ width: '72%' }} className="space-y-12 container">

                <div className="border-b border-gray-900/10 pb-12">
                    <h2 className="text-base font-semibold leading-7 mt-3 text-gray-900">Personal Information</h2>
                    <p className="mt-1 text-sm leading-6 text-gray-600">
                        This information will be displayed publicly so be careful what you share.
                    </p>

                    <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                        <div className="sm:col-span-3">
                            <label htmlFor="firstname" className="block text-sm font-medium leading-6 text-gray-900">
                                First name
                            </label>
                            <div className="mt-2">
                                <input
                                    id="firstname"
                                    name="firstname"
                                    value={formData.firstname}
                                    onChange={handleInputChange}
                                    type="text"
                                    autoComplete="given-name"
                                    className="block w-full rounded-md  py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    required
                                />
                            </div>
                        </div>

                        <div className="sm:col-span-3">
                            <label htmlFor="lastname" className="block text-sm font-medium leading-6 text-gray-900">
                                Last name
                            </label>
                            <div className="mt-2">
                                <input
                                    value={formData.lastname}
                                    onChange={handleInputChange}
                                    id="lastname"
                                    name="lastname"
                                    type="text"
                                    autoComplete="family-name"
                                    className="block w-full rounded-md  py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    required
                                />
                            </div>
                        </div>

                        <div className="sm:col-span-3">
                            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                Email address
                            </label>
                            <div className="mt-2">
                                <input
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    id="email"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    className="block w-full rounded-md  py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    required
                                />
                            </div>
                        </div>
                        <div className="sm:col-span-3 ">
                            <label htmlFor="amount" className="block text-sm font-medium leading-6 text-gray-900">
                                Amount
                            </label>
                            <div className="mt-2">
                                <input
                                    value={formData.amount}
                                    onChange={handleInputChange}
                                    id="amount"
                                    name="amount"
                                    type="text"
                                    autoComplete="address-level2"
                                    className="block w-full rounded-md   text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    required
                                />
                            </div>
                        </div>

                        <div className="sm:col-span-3">
                            <label htmlFor="category" className="block text-sm font-medium leading-6 text-gray-900">
                                category
                            </label>
                            <div className="mt-2">
                                <select
                                    value={formData.category}
                                    onChange={handleInputChange}
                                    id="category"
                                    name="category"
                                    required
                                    autoComplete="category"
                                    className="block w-full rounded-md  py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                >
                                    <option value="" disabled>Select a category</option>
                                    <option value="Education">Education</option>
                                    <option value="Relief">Relief</option>
                                    <option value="Marriage">Marriage</option>
                                    <option value="Feeding the Poor">Feeding the poor</option>
                                </select>
                            </div>
                        </div>



                        <div className="col-span-full">
                            <label htmlFor="address" className="block text-sm font-medium leading-6 text-gray-900">
                                Street address
                            </label>
                            <div className="mt-2">
                                <input
                                    value={formData.address}
                                    onChange={handleInputChange}
                                    id="address"
                                    name="address"
                                    type="text"
                                    autoComplete="street-address"
                                    className="block w-full rounded-md  py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    required
                                />
                            </div>
                        </div>

                        <div className="sm:col-span-2 sm:col-start-1">
                            <label htmlFor="city" className="block text-sm font-medium leading-6 text-gray-900">
                                City
                            </label>
                            <div className="mt-2">
                                <input
                                    value={formData.city}
                                    onChange={handleInputChange}
                                    id="city"
                                    name="city"
                                    type="text"
                                    autoComplete="address-level2"
                                    className="block w-full rounded-md  py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    required
                                />
                            </div>
                        </div>

                        <div className="sm:col-span-2">
                            <label htmlFor="state" className="block text-sm font-medium leading-6 text-gray-900">
                                State / Province
                            </label>
                            <div className="mt-2">
                                <input
                                    value={formData.state}
                                    onChange={handleInputChange}
                                    id="state"
                                    name="state"
                                    type="text"
                                    autoComplete="address-level1"
                                    className="block w-full rounded-md  py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    required
                                />
                            </div>
                        </div>

                        <div className="sm:col-span-2">
                            <label htmlFor="pincode" className="block text-sm font-medium leading-6 text-gray-900">
                                ZIP / Postal code
                            </label>
                            <div className="mt-2">
                                <input
                                    value={formData.pincode}
                                    onChange={handleInputChange}
                                    id="pincode"
                                    name="pincode"
                                    type="text"
                                    autoComplete="postal-code"
                                    className="block w-full rounded-md  py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    required
                                />
                            </div>
                        </div>
                    </div>
                </div>


            </div>

            <div className="my-6 flex items-center justify-center gap-x-6 container">
                <button
                    type="submit"
                    className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                    Save
                </button>
            </div>
        </form>
    )
}
