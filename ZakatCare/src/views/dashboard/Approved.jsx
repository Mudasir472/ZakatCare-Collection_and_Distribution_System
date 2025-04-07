import React, { useEffect, useState } from 'react';
import axios from "axios";
import approve from "../../assets/images/approve.svg";

const Approve = () => {
    const [data, setData] = useState([]);
    const [done, setDone] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedUser, setSelectedUser] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        const fetchContactData = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_LOCAL_HOST}/zakatcare/recieve-details`);
                const approvedData = response.data?.recieverData?.filter(item => item.status === 'Approved');
                setData(approvedData);
            } catch (error) {
                console.error("Error fetching listing data:", error);
            }
        };

        fetchContactData();
    }, []);

    // Filtered data based on the search term
    const filteredData = data.filter((product) =>
        product.fullname.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleDetails = (user) => {
        setSelectedUser(user);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const handleStatusChange = async (userId, paymentStatus) => {
        try {
            if (paymentStatus === 'Done') {
                setDone(true);
            }
            await axios.post(`${import.meta.env.VITE_LOCAL_HOST}/zakatcare/payment-status`, {
                id: userId,
                paymentStatus
            });

            setData((prevData) =>
                prevData.map((user) =>
                    user._id === userId ? { ...user, paymentStatus } : user
                )
            );
        } catch (error) {
            console.error(`Error updating status to ${paymentStatus}:`, error);
        }
    };

    return (
        <div className="w-full px-4 py-6">
            <div className="container mx-auto">
                <div className="flex items-center justify-between mb-6 h-16">
                    <h3 className="text-xl font-bold">Payment Approve List</h3>
                    {/* Search Bar */}
                    <input
                        type="text"
                        placeholder="Search by name..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="p-2 border w-1/2 border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div className="bg-white rounded-lg shadow-md p-4">
                    <div className="mt-2">
                        <div className="grid grid-cols-4 gap-4 border-b border-gray-300 pb-2">
                            {/* Header */}
                            <div className="font-bold text-gray-700">Name</div>
                            <div className="font-bold text-gray-700">Email</div>
                            <div className="font-bold text-gray-700">State</div>
                            <div className="font-bold text-gray-700">Payment Status</div>
                        </div>
                        {/* Product Rows */}
                        {filteredData.length > 0 ? (
                            filteredData.map((product, index) => (
                                <div key={index} className="grid grid-cols-4 gap-4">
                                    <div
                                        className="border-b border-gray-300 p-2 text-blue-600 hover:text-blue-800 cursor-pointer"
                                        onClick={() => handleDetails(product)}
                                    >
                                        {product.fullname}
                                    </div>
                                    <div className="border-b border-gray-300 p-2">{product.email}</div>
                                    <div className="border-b border-gray-300 p-2">{product.state}</div>
                                    <div className="border-b border-gray-300 p-2 flex items-center justify-between">
                                        {product.paymentStatus === 'Done' ? (
                                            <div className="bg-green-100 text-green-800 px-3 py-1 rounded">Payment Done</div>
                                        ) : (
                                            <button
                                                className="cursor-pointer"
                                                title="Approve"
                                                onClick={() => handleStatusChange(product._id, 'Done')}
                                            >
                                                <img src={approve} alt="Approve" className="w-6 h-6" />
                                            </button>
                                        )}
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="border-b border-gray-300 p-2 text-gray-500 col-span-4">No results found</div>
                        )}
                    </div>
                </div>
            </div>

            {/* Modal for User Details - Tailwind Implementation */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50 flex items-center justify-center">
                    <div className="relative mx-auto p-5 border w-11/12 md:w-2/3 lg:w-1/2 shadow-lg rounded-md bg-white">
                        <div className="flex items-center justify-between border-b pb-3">
                            <h3 className="text-lg font-semibold text-gray-700">All Details</h3>
                            <button
                                onClick={closeModal}
                                className="text-gray-400 hover:text-gray-500 focus:outline-none"
                            >
                                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        <div className="modal-body max-h-96 overflow-y-auto mt-4">
                            {selectedUser && (
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="p-2 font-semibold text-gray-700">Name:</div>
                                    <div className="p-2">{selectedUser.fullname}</div>

                                    <div className="p-2 font-semibold text-gray-700">Email:</div>
                                    <div className="p-2">{selectedUser.email}</div>

                                    <div className="p-2 font-semibold text-gray-700">Address:</div>
                                    <div className="p-2">{selectedUser.address}</div>

                                    <div className="p-2 font-semibold text-gray-700">State:</div>
                                    <div className="p-2">{selectedUser.state}</div>

                                    <div className="p-2 font-semibold text-gray-700">Category:</div>
                                    <div className="p-2">{selectedUser.category}</div>

                                    <div className="p-2 font-semibold text-gray-700">Name as per Bank:</div>
                                    <div className="p-2">{selectedUser.bankOwner}</div>

                                    <div className="p-2 font-semibold text-gray-700">Account Number:</div>
                                    <div className="p-2">{selectedUser.account}</div>

                                    <div className="p-2 font-semibold text-gray-700">Bank Name:</div>
                                    <div className="p-2">{selectedUser.bankName}</div>

                                    <div className="p-2 font-semibold text-gray-700">Branch:</div>
                                    <div className="p-2">{selectedUser.branch}</div>

                                    <div className="p-2 font-semibold text-gray-700">IFSC code:</div>
                                    <div className="p-2">{selectedUser.ifsc}</div>
                                </div>
                            )}
                        </div>

                        <div className="mt-4 flex justify-end border-t pt-3">
                            <button
                                onClick={closeModal}
                                className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 focus:outline-none"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Approve;