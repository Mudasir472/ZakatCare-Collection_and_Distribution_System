import React, { useEffect, useState } from "react";
import axios from "axios";
import download from "../../assets/images/download.png";
import approve from "../../assets/images/approve.svg";
import reject from "../../assets/images/reject.svg";

const Receiver = () => {
    const [data, setData] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showModal, setShowModal] = useState(false);

    // Fetch receiver data on component mount
    useEffect(() => {
        const fetchReceiverData = async () => {
            try {
                setIsLoading(true);
                const response = await axios.get(`${import.meta.env.VITE_LOCAL_HOST}/zakatcare/recieve-details`);
                setData(response.data?.recieverData || []);
                setError(null);
            } catch (error) {
                console.error("Error fetching receiver data:", error);
                setError("Failed to load receiver details. Please try again later.");
            } finally {
                setIsLoading(false);
            }
        };

        fetchReceiverData();
    }, []);

    // Handle status change (approve/reject)
    const handleStatusChange = async (userId, status) => {
        try {
            await axios.post(`${import.meta.env.VITE_LOCAL_HOST}/zakatcare/update-status`, {
                id: userId,
                status
            });

            // Update local state to reflect the change
            setData(prevData =>
                prevData.map(user =>
                    user._id === userId ? { ...user, status } : user
                )
            );
        } catch (error) {
            console.error(`Error updating status to ${status}:`, error);
            alert(`Failed to update status to ${status}. Please try again.`);
        }
    };

    // Handle user selection for detail view
    const handleDetails = (user) => {
        setSelectedUser(user);
        setShowModal(true);
    };

    // Close modal
    const closeModal = () => {
        setShowModal(false);
    };

    // Filter data based on search term
    const filteredData = data.filter(user =>
        user.fullname.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Stop propagation for modal content clicks
    const handleModalContentClick = (e) => {
        e.stopPropagation();
    };

    return (
        <div className="contactList">
            <div className="contactListMain">
                <div className="contactListHead w-1/2 flex items-center justify-between mb-3 h-16">
                    <h4>Receiver Details</h4>

                    {/* Search Bar */}
                    <input
                        type="text"
                        placeholder="Search by name..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="p-2 border w-1/2 border-gray-300 rounded"
                    />
                </div>

                {isLoading ? (
                    <div className="text-center p-5">Loading...</div>
                ) : error ? (
                    <div className="text-center text-red-500 p-5">{error}</div>
                ) : (
                    <div className="allLists">
                        <div className="product-details mt-2">
                            <div className="grid grid-cols-4 gap-4 border-gray-300 mt-3">
                                {/* Header */}
                                <div className="font-bold">Name</div>
                                <div className="font-bold">Email</div>
                                <div className="font-bold">Files</div>
                                <div className="font-bold">Status</div>

                                {/* User Rows */}
                                {filteredData.length > 0 ? (
                                    filteredData.map((user, index) => (
                                        <React.Fragment key={user._id || index}>
                                            <div
                                                className="link-underline-primary border-b border-gray-300 p-2 cursor-pointer text-blue-600 hover:text-blue-800"
                                                onClick={() => handleDetails(user)}
                                            >
                                                {user.fullname}
                                            </div>
                                            <div className="border-b border-gray-300 p-2">{user.email}</div>
                                            <div className="border-b border-gray-300 p-2">{user.aadhar}</div>
                                            <div className="border-b border-gray-300 p-2 flex items-center justify-between status">
                                                {user.status === 'Approved' ? (
                                                    <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded">
                                                        Approved
                                                    </span>
                                                ) : user.status === 'Rejected' ? (
                                                    <span className="bg-red-100 text-red-800 text-xs font-medium px-2.5 py-0.5 rounded">
                                                        Rejected
                                                    </span>
                                                ) : (
                                                    <>
                                                        <button
                                                            className="cursor-pointer hover:opacity-80"
                                                            title="Approve"
                                                            onClick={() => handleStatusChange(user._id, 'Approved')}
                                                        >
                                                            <img src={approve} alt="Approve" />
                                                        </button>
                                                        <button
                                                            className="cursor-pointer hover:opacity-80"
                                                            title="Reject"
                                                            onClick={() => handleStatusChange(user._id, 'Rejected')}
                                                        >
                                                            <img src={reject} alt="Reject" />
                                                        </button>
                                                    </>
                                                )}
                                            </div>
                                        </React.Fragment>
                                    ))
                                ) : (
                                    <div className="col-span-4 border-b border-gray-300 p-2 text-gray-500">
                                        No results found
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Tailwind Modal for User Details */}
            {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-50" onClick={closeModal}>
                    <div className="relative w-full max-w-md mx-auto" onClick={handleModalContentClick}>
                        <div className="relative bg-white rounded-lg shadow">
                            {/* Modal header */}
                            <div className="flex items-center justify-between p-4 border-b rounded-t">
                                <h3 className="text-lg font-semibold text-gray-900">
                                    All Details
                                </h3>
                                <button
                                    type="button"
                                    className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
                                    onClick={closeModal}
                                >
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path>
                                    </svg>
                                </button>
                            </div>

                            {/* Modal body */}
                            <div className="p-6 overflow-y-auto max-h-[calc(100vh-200px)]">
                                {selectedUser && (
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="p-2 font-semibold">Name:</div>
                                        <div className="p-2">{selectedUser.fullname}</div>

                                        <div className="p-2 font-semibold">Email:</div>
                                        <div className="p-2">{selectedUser.email}</div>

                                        <div className="p-2 font-semibold">Aadhar Number:</div>
                                        <div className="p-2">{selectedUser.aadhar}</div>

                                        <div className="p-2 font-semibold">Aadhar photo:</div>
                                        <div className="p-2">
                                            {selectedUser.uploadAdhaar && (
                                                <a
                                                    href={selectedUser.uploadAdhaar}
                                                    download
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="inline-block"
                                                >
                                                    <img
                                                        src={download}
                                                        alt="Download Aadhar"
                                                        className="w-6 h-6 cursor-pointer hover:opacity-80"
                                                        title="Download Aadhar"
                                                    />
                                                </a>
                                            )}
                                        </div>

                                        <div className="p-2 font-semibold">Address:</div>
                                        <div className="p-2">{selectedUser.address}</div>

                                        <div className="p-2 font-semibold">State:</div>
                                        <div className="p-2">{selectedUser.state}</div>

                                        <div className="p-2 font-semibold">City:</div>
                                        <div className="p-2">
                                            {selectedUser.city}{selectedUser.pincode ? ` ${selectedUser.pincode}` : ''}
                                        </div>

                                        <div className="p-2 font-semibold">Category:</div>
                                        <div className="p-2">{selectedUser.category}</div>
                                    </div>
                                )}
                            </div>

                            {/* Modal footer */}
                            <div className="flex items-center justify-end p-4 border-t border-gray-200 rounded-b">
                                <button
                                    type="button"
                                    className="px-4 py-2 text-sm font-medium text-white bg-gray-600 rounded-lg hover:bg-gray-700 focus:ring-4 focus:ring-gray-300"
                                    onClick={closeModal}
                                >
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Receiver;