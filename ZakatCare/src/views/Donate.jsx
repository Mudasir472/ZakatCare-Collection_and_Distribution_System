import { useEffect, useState } from "react";
import axios from 'axios';
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

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
        if ((name === 'amount' || name === 'pincode') && !/^[0-9]*$/.test(value)) {
            toast.error("Must contain only digits.");
            return;
        }
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const resp = await axios.post(`${import.meta.env.VITE_LOCAL_HOST}/zakatcare/donations`, formData, { withCredentials: true });
            toast.success(resp.data.message);
            navigate('/form-submitted');
        } catch (error) {
            toast.error(error.response?.data?.message || "An error occurred.");
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100 py-10">
            <form onSubmit={handleSubmit} className="bg-white shadow-xl rounded-lg p-8 w-full max-w-3xl">
                <h2 className="text-2xl font-bold text-center text-indigo-600">Donate for a Cause</h2>
                <p className="text-gray-600 text-center mt-2">Your generous donation helps those in need.</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                    {[
                        { label: "First Name", name: "firstname", type: "text" },
                        { label: "Last Name", name: "lastname", type: "text" },
                        { label: "Email", name: "email", type: "email" },
                        { label: "Amount", name: "amount", type: "text" },
                        { label: "Address", name: "address", type: "text", fullWidth: true },
                        { label: "City", name: "city", type: "text" },
                        { label: "State", name: "state", type: "text" },
                        { label: "Pincode", name: "pincode", type: "text" },
                    ].map(({ label, name, type, fullWidth }, index) => (
                        <div key={index} className={fullWidth ? "col-span-2" : ""}>
                            <label className="block text-sm font-medium text-gray-700">{label}</label>
                            <input
                                type={type}
                                name={name}
                                value={formData[name]}
                                onChange={handleInputChange}
                                className="mt-1 w-full rounded-md border border-gray-300 p-2 focus:ring-indigo-500 focus:border-indigo-500"
                                required
                            />
                        </div>
                    ))}
                    <div className="col-span-2">
                        <label className="block text-sm font-medium text-gray-700">Category</label>
                        <select
                            name="category"
                            value={formData.category}
                            onChange={handleInputChange}
                            className="mt-1 w-full rounded-md border border-gray-300 p-2 focus:ring-indigo-500 focus:border-indigo-500"
                            required
                        >
                            <option value="" disabled>Select a category</option>
                            <option value="Education">Education</option>
                            <option value="Relief">Relief</option>
                            <option value="Marriage">Marriage</option>
                            <option value="Feeding the Poor">Feeding the Poor</option>
                        </select>
                    </div>
                </div>
                <div className="mt-6 flex justify-center">
                    <button
                        type="submit"
                        className="w-full bg-indigo-600 text-white px-6 py-2 rounded-md hover:bg-indigo-700 transition"
                    >
                        Donate Now
                    </button>
                </div>
            </form>
        </div>
    );
}
