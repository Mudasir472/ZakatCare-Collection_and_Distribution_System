import React, { useEffect, useState } from 'react';
import axios from "axios";


const DonorList = () => {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchContactData = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_LOCAL_HOST}/zakatcare/donations`);

        setData(response.data?.allDonations);
      } catch (error) {
        console.error("Error fetching listing data:", error);
      }
    };
    fetchContactData();
  }, []);

  // Filtered data based on the search term
  const filteredData = data.filter((product) =>
    product.firstname.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="contactList">
      <div className="contactListMain">
        <div style={{ marginBottom: "11px", height: "4rem" }} className="contactListHead w-1/2 flex items-center justify-between">
          <h3>All Donors</h3>
          {/* Search Bar */}
          <input
            type="text"
            placeholder="Search by name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="p-2 border w-1/2 border-gray-300 rounded "
          />
        </div>

        <div className="allLists">
          <div className="product-details mt-2">
            <div className="grid grid-cols-4 gap-4 border-gray-300 mt-3">
              {/* Header */}
              <div className="font-bold">Name</div>
              <div className="font-bold">Email</div>
              <div className="font-bold">Amount(&#8377;)</div>
              <div className="font-bold">Category</div>

              {/* Filtered Product Rows */}
              {filteredData.length > 0 ? (
                filteredData.map((product, index) => (
                  <React.Fragment key={index}>
                    <div className="border-b border-gray-300 p-2">{product.firstname}</div>
                    <div className="border-b border-gray-300 p-2">{product.email}</div>
                    <div className="border-b border-gray-300 p-2">{product.amount}</div>
                    <div className="border-b border-gray-300 p-2"><span>{product.category}</span></div>
                  </React.Fragment>
                ))
              ) : (
                <div className="border-b border-gray-300 p-2 text-gray-500">No results found</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DonorList;
