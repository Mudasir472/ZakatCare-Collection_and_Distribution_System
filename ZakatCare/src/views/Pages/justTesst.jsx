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