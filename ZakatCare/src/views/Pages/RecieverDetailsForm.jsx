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
        }
        setLoading(false);
        console.log(dataToSend)

    };

    const resetFormData = () => {
        setFormData({
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
    };

    return (
        <div style={{ width: "87%" }} className="reciever-details container">
            <form onSubmit={handleSubmit} encType="multipart/form-data">
                <div className="space-y-12">
                    <div className="border-b border-gray-900/10 pb-12">
                        <h2 className="mt-4 text-base font-semibold leading-7 text-gray-900">Personal Information</h2>
                        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                            <div className="sm:col-span-3">
                                <label htmlFor="fullname" className="block text-sm font-medium leading-6 text-gray-900">
                                    Your Full Name
                                </label>
                                <div className="mt-2">
                                    <input
                                        value={formData.fullname}
                                        onChange={handleInputChange}
                                        id="fullname"
                                        name="fullname"
                                        type="text"
                                        autoComplete="given-name"
                                        className="block w-full rounded-md py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
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
                                        className="block w-full rounded-md py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="col-span-full">
                                <label htmlFor="about" className="block text-sm font-medium leading-6 text-gray-900">
                                    About
                                </label>
                                <div className="mt-2">
                                    <textarea
                                        value={formData.about}
                                        onChange={handleInputChange}
                                        id="about"
                                        name="about"
                                        rows={3}
                                        className="block w-full rounded-md py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        required
                                        defaultValue={''}
                                    />
                                </div>
                                <p className="mt-3 text-sm leading-6 text-gray-600">Write a few sentences about yourself.</p>
                            </div>

                            <div className="sm:col-span-3">
                                <label htmlFor="category" className="block text-sm font-medium leading-6 text-gray-900">
                                    Category of Need
                                </label>
                                <div className="mt-2">
                                    <select
                                        value={formData.category}
                                        onChange={handleInputChange}
                                        id="category"
                                        name="category"
                                        required
                                        className="block w-full rounded-md py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    >
                                        <option disabled value="">Select a category</option>
                                        <option value="Education">Education</option>
                                        <option value="Relief">Relief</option>
                                        <option value="Marriage">Marriage</option>
                                        <option value="Feeding the Poor">Feeding the Poor</option>
                                    </select>
                                </div>
                            </div>
                            <div className="sm:col-span-3">
                                <label htmlFor="aadhar" className="block text-sm font-medium leading-6 text-gray-900">
                                    Aadhar Number
                                </label>
                                <div className="mt-2">
                                    <input
                                        value={formData.aadhar}
                                        onChange={handleInputChange}
                                        id="aadhar"
                                        name="aadhar"
                                        type="text"
                                        autoComplete="off"
                                        className="block w-full rounded-md py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        required
                                    />
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
                                        autoComplete="address"
                                        className="block w-full rounded-md py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
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
                                        className="block w-full rounded-md py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
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
                                        className="block w-full rounded-md py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
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
                                        autoComplete="pincode"
                                        className="block w-full rounded-md py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        required
                                    />
                                </div>
                            </div>



                            <div className="sm:col-span-6">
                                <label htmlFor="fileAadhar" className="block text-sm font-medium leading-6 text-gray-900">
                                    Upload Aadhar Document
                                </label>
                                <div className="mt-2">
                                    <input
                                        style={{ height: "40px", padding: "4px", border: '1px  solid' }}
                                        type="file"
                                        id="fileAadhar"
                                        name="fileAadhar"
                                        onChange={handleFileChange}
                                        className="block w-full text-sm text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="sm:col-span-6">
                                <label htmlFor="certificate" className="block text-sm font-medium leading-6 text-gray-900">
                                    Upload Any Certificate if have
                                </label>
                                <div className="mt-2">
                                    <input
                                        style={{ height: "40px", padding: "4px", border: '1px  solid' }}
                                        type="file"
                                        id="certificate"
                                        name="certificate"
                                        onChange={handleFileChange}
                                        className="block w-full text-sm text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>
                            <h2 className="mt-4 col-span-full text-base font-semibold leading-7 text-gray-900">Account Details</h2>

                            <div className="sm:col-span-3">
                                <label htmlFor="bankOwner" className="block text-sm font-medium leading-6 text-gray-900">
                                    Account Holder's Full Name
                                </label>
                                <div className="mt-2">
                                    <input
                                        value={formData.bankOwner}
                                        onChange={handleInputChange}
                                        id="bankOwner"
                                        name="bankOwner"
                                        type="text"
                                        autoComplete="bankOwner"
                                        className="block w-full rounded-md py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        required
                                    />
                                </div>
                            </div>
                            <div className="sm:col-span-3">
                                <label htmlFor="account" className="block text-sm font-medium leading-6 text-gray-900">
                                    Bank Account Number
                                </label>
                                <div className="mt-2">
                                    <input
                                        value={formData.account}
                                        onChange={handleInputChange}
                                        id="account"
                                        name="account"
                                        type="text"
                                        autoComplete="account"
                                        className="block w-full rounded-md py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        required
                                    />
                                </div>
                            </div>
                            <div className="sm:col-span-2 sm:col-start-1">
                                <label htmlFor="bankName" className="block text-sm font-medium leading-6 text-gray-900">
                                    Bank Name
                                </label>
                                <div className="mt-2">
                                    <input
                                        value={formData.bankName}
                                        onChange={handleInputChange}
                                        id="bankName"
                                        name="bankName"
                                        type="text"
                                        autoComplete="bankName"
                                        className="block w-full rounded-md py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="sm:col-span-2">
                                <label htmlFor="branch" className="block text-sm font-medium leading-6 text-gray-900">
                                    Branch Name
                                </label>
                                <div className="mt-2">
                                    <input
                                        value={formData.branch}
                                        onChange={handleInputChange}
                                        id="branch"
                                        name="branch"
                                        type="text"
                                        className="block w-full rounded-md py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="sm:col-span-2">
                                <label htmlFor="ifsc" className="block text-sm font-medium leading-6 text-gray-900">
                                    IFSC Code
                                </label>
                                <div className="mt-2">
                                    <input
                                        value={formData.ifsc}
                                        onChange={handleInputChange}
                                        id="ifsc"
                                        name="ifsc"
                                        type="text"
                                        autoComplete="ifsc"
                                        className="block w-full rounded-md py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        required
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="submitBtn  w-full flex items-center justify-center">
                        <button
                            type="submit"
                            disabled={loading}
                            className={`mb-7 mt-6 w-1/4 inline-flex items-center justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                        >
                            {loading ? "Submitting..." : "Submit"}
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default RecieverDetailsForm;
