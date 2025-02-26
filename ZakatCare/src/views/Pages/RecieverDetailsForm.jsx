import { PhotoIcon } from '@heroicons/react/24/solid';
import { useState } from 'react';
import { toast } from "react-toastify";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function RecieverDetailsForm() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        fullname: "",
        email: "",
        about: "",
        address: "",
        city: "",
        state: "",
        pincode: "",
        aadhar: "",
        category: "",
        bankOwner: "",
        account: "",
        bankName: "",
        branch: "",
        ifsc: "",
        certificate: null,
        fileAadhar: null
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if ((name === 'pincode' || name === 'aadhar') && !/^\d*$/.test(value)) {
            toast.error("Must contain only digits.");
            return;
        }
        if (name === 'aadhar' && value.length > 12) {
            toast.error("Aadhar number must be exactly 12 digits.");
            return;
        }
        if (name === 'pincode' && value.length > 6) {
            toast.error("Pincode must be exactly 6 digits.");
            return;
        }
        if (name === 'aadhar' && value.length < 12) {
            // Optionally, you could prevent setting state if it's not yet 12 digits
            setFormData((currData) => ({
                ...currData,
                [name]: value
            }));
            return;
        }
        setFormData((currData) => ({
            ...currData,
            [name]: value
        }));
    };

    const handleFileChange = (e) => {
        const { name, files } = e.target;
        const file = files[0];
        if (file) {
            // Check if the file is an image
            const validImageTypes = ['image/png', 'image/jpg', 'image/jpeg'];
            if (!validImageTypes.includes(file.type)) {
                toast.error("Only image files (png, jpg, jpeg) are allowed.");
                e.target.value = '';
                return;
            }
        }
        if (file && file.size > 10 * 1024 * 1024) {
            toast.error("File size must be less than 10MB.");
            return;
        }
        setFormData((prevData) => ({ ...prevData, [name]: file }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Validate Aadhar number
        if (formData.aadhar.length !== 12) {
            toast.error("Aadhar number must be exactly 12 digits.");
            return;
        }
        // Validate Pincode
        if (formData.pincode.length !== 6) {
            toast.error("Pincode must be exactly 6 digits.");
            return;
        }
        setLoading(true);

        const dataToSend = new FormData();
        for (const key in formData) {
            dataToSend.append(key, formData[key]);
        }
        try {
            const resp = await axios.post(`${import.meta.env.VITE_LOCAL_HOST}/zakatcare/recieve-details`, dataToSend, {
                withCredentials: true,
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            if (resp.status === 200) {
                toast.success("Details submitted successfully!");
                // Reset form data after successful submission
                resetFormData();
                navigate('/form-submitted')

            }
        } catch (error) {
            console.error('Error:', error);
            toast.error(error.response.data.err);
        }
        finally {
            // resetFormData();
            setLoading(false);
        }
        setLoading(false);
        console.log(dataToSend)

    };

    const resetFormData = () => {
        // setFormData({
        //     fullname: "",
        //     email: "",
        //     about: "",
        //     address: "",
        //     city: "",
        //     state: "",
        //     pincode: "",
        //     aadhar: "",
        //     category: "",
        //     bankOwner: "",
        //     account: "",
        //     bankName: "",
        //     branch: "",
        //     ifsc: "",
        //     certificate: null,
        //     fileAadhar: null
        // });
    };

    return (
        <div style={{ width: "87%" }} className="reciever-details container">
            <form onSubmit={handleSubmit} encType="multipart/form-data">
                <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
                    <h2 className="text-2xl font-semibold text-gray-800 border-b pb-4">
                        Personal Information
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                        <div>
                            <label className="text-sm text-gray-700 font-medium">Full Name</label>
                            <input
                                value={formData.fullname}
                                onChange={handleInputChange}
                                id="fullname"
                                name="fullname"
                                type="text"
                                required
                                className="w-full p-3 border border-gray-300 rounded-lg focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none"
                                placeholder="Enter your name"
                            />
                        </div>
                        <div>
                            <label className="text-sm text-gray-700 font-medium">Email</label>
                            <input
                                value={formData.email}
                                onChange={handleInputChange}
                                id="email"
                                name="email"
                                type="email"
                                required
                                className="w-full p-3 border border-gray-300 rounded-lg focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none"
                                placeholder="Enter your email"
                            />
                        </div>
                    </div>
                    <div className="mt-6">
                        <label className="text-sm text-gray-700 font-medium">About</label>
                        <textarea
                            value={formData.about}
                            onChange={handleInputChange}
                            id="about"
                            name="about"
                            rows={3}
                            required
                            className="w-full p-3 border border-gray-300 rounded-lg focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none"
                            placeholder="Write your message..."
                        ></textarea>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                        <div>
                            <label className="text-sm text-gray-700 font-medium mb-[17px]">Category</label>
                            <select
                                value={formData.category}
                                onChange={handleInputChange}
                                id="category"
                                name="category"
                                required
                                className="w-full p-3 border border-gray-300 rounded-lg focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none"
                                placeholder="Enter your name"
                            >
                                <option disabled value="">Select a category</option>
                                <option value="Education">Education</option>
                                <option value="Relief">Relief</option>
                                <option value="Marriage">Marriage</option>
                                <option value="Feeding the Poor">Feeding the Poor</option>
                            </select>
                        </div>
                        <div>
                            <label className="text-sm text-gray-700 font-medium">Aadhar Number</label>
                            <input
                                value={formData.aadhar}
                                onChange={handleInputChange}
                                id="aadhar"
                                name="aadhar"
                                type='text'
                                required
                                className="w-full p-3 border border-gray-300 rounded-lg focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none"
                                placeholder="Enter your aadhar"
                            />
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                        <div>
                            <label className="text-sm text-gray-700 font-medium">Address</label>
                            <input
                                value={formData.address}
                                onChange={handleInputChange}
                                id="address"
                                name="address"
                                type="text"
                                required
                                className="w-full p-3 border border-gray-300 rounded-lg focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none"
                                placeholder="Enter your address"
                            />
                        </div>
                        <div>
                            <label className="text-sm text-gray-700 font-medium">City</label>
                            <input
                                value={formData.city}
                                onChange={handleInputChange}
                                id="city"
                                name="city"
                                type="city"
                                required
                                className="w-full p-3 border border-gray-300 rounded-lg focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none"
                                placeholder="Enter your city"
                            />
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                        <div>
                            <label className="text-sm text-gray-700 font-medium">State/Provision</label>
                            <input
                                value={formData.state}
                                onChange={handleInputChange}
                                id="state"
                                name="state"
                                type="text"
                                required
                                className="w-full p-3 border border-gray-300 rounded-lg focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none"
                                placeholder="Enter your State"
                            />
                        </div>
                        <div>
                            <label className="text-sm text-gray-700 font-medium">Pincode</label>
                            <input
                                value={formData.pincode}
                                onChange={handleInputChange}
                                id="pincode"
                                name="pincode"
                                type="text"
                                required
                                className="w-full p-3 border border-gray-300 rounded-lg focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none"
                                placeholder="Enter your Pincode"
                            />
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                        <div>
                            <label className="text-sm text-gray-700 font-medium">Upload your Aadhar</label>
                            <input
                                style={{ padding: "4px", border: '1px  solid' }}
                                type="file"
                                id="fileAadhar"
                                name="fileAadhar"
                                onChange={handleFileChange}
                                required
                                className="w-full p-3 border border-gray-300 rounded-lg focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none"
                                placeholder="Enter your State"
                            />
                        </div>
                        <div>
                            <label className="text-sm text-gray-700 font-medium">Upload Certificate if have</label>
                            <input
                                style={{ padding: "4px", border: '1px  solid' }}
                                type="file"
                                id="certificate"
                                name="certificate"
                                onChange={handleFileChange}
                                required
                                className="w-full p-3 border border-gray-300 rounded-lg focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none"
                                placeholder="Enter your Pincode"
                            />
                        </div>
                    </div>
                    <h2 className="mt-4 col-span-full text-base font-semibold leading-7 text-gray-900">Account Details</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                        <div>
                            <label className="text-sm text-gray-700 font-medium">Account Holder's Full Name</label>
                            <input
                                value={formData.bankOwner}
                                onChange={handleInputChange}
                                id="bankOwner"
                                name="bankOwner"
                                type="text"
                                required
                                className="w-full p-3 border border-gray-300 rounded-lg focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none"
                                placeholder="Enter your State"
                            />
                        </div>
                        <div>
                            <label className="text-sm text-gray-700 font-medium">Bank Account Number</label>
                            <input
                                value={formData.account}
                                onChange={handleInputChange}
                                id="account"
                                name="account"
                                type="text"
                                required
                                className="w-full p-3 border border-gray-300 rounded-lg focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none"
                                placeholder="Enter your Pincode"
                            />
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                        <div>
                            <label className="text-sm text-gray-700 font-medium">Bank Name</label>
                            <input
                                value={formData.bankName}
                                onChange={handleInputChange}
                                id="bankName"
                                name="bankName"
                                type="text"
                                required
                                className="w-full p-3 border border-gray-300 rounded-lg focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none"
                                placeholder="Enter your State"
                            />
                        </div>
                        <div>
                            <label className="text-sm text-gray-700 font-medium">Branch Name</label>
                            <input
                                value={formData.branch}
                                onChange={handleInputChange}
                                id="branch"
                                name="branch"
                                type="text"
                                required
                                className="w-full p-3 border border-gray-300 rounded-lg focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none"
                                placeholder="Enter your Pincode"
                            />
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                        <div>
                            <label className="text-sm text-gray-700 font-medium">IFSC Code</label>
                            <input
                                value={formData.ifsc}
                                onChange={handleInputChange}
                                id="ifsc"
                                name="ifsc"
                                type="text"
                                required
                                className="w-full p-3 border border-gray-300 rounded-lg focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none"
                                placeholder="Enter your Pincode"
                            />
                        </div>
                    </div>
                    <button
                        onClick={handleSubmit}
                        className="w-full mt-6 bg-indigo-600 text-white py-3 rounded-lg font-medium hover:bg-indigo-700 transition-all duration-300 flex items-center justify-center"
                        disabled={loading}
                    >
                        {loading ? <span className="loading loading-spinner loading-lg"></span> : "Submit"}
                    </button>
                </div>
            </form>
        </div>
    );
}

export default RecieverDetailsForm;
