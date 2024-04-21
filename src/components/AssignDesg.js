import React, { useState } from 'react'

function AssignDesg({ isOpen, onClose, children }) {
    //const [formData, setFormData] = useState({ name: "", email: "", option1: "", option2: "" });
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        option1: '',
        option2: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };
    if (!isOpen) return null;
    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission logic here
        console.log("Form submitted with data:", formData);
    };
    return (
        // <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
        //     <div className="bg-white p-4 rounded shadow-lg">
        //         <h2 className="text-lg font-bold mb-4">Modal Title</h2>
        //         <form onSubmit={handleSubmit} className="flex flex-col">
        //             <div className="mb-4">
        //                 {/* <h3 className="text-sm font-semibold mb-2">Row 1</h3> */}
        //                 <div className="flex mb-2">
        //                     {/* <h4>Name</h4> */}
        //                     <input
        //                         type="text"
        //                         value={formData.name}
        //                         onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        //                         placeholder="Name"
        //                         className="border border-gray-300 p-2 rounded mr-2"
        //                     />
        //                     <input
        //                         type="email"
        //                         value={formData.email}
        //                         onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        //                         placeholder="Email"
        //                         className="border border-gray-300 p-2 rounded mr-2"
        //                     />
        //                     <select
        //                         value={formData.option1}
        //                         onChange={(e) => setFormData({ ...formData, option1: e.target.value })}
        //                         className="border border-gray-300 p-2 rounded"
        //                     >
        //                         <option value="">Option 1</option>
        //                         {/* Add more options as needed */}
        //                     </select>
        //                 </div>
        //             </div>
        //             <div className="mb-4">
        //                 {/* <h3 className="text-sm font-semibold mb-2">Row 2</h3> */}
        //                 <div className="flex mb-2">
        //                     <select
        //                         value={formData.option2}
        //                         onChange={(e) => setFormData({ ...formData, option2: e.target.value })}
        //                         className="border border-gray-300 p-2 rounded mr-2"
        //                     >
        //                         <option value="">Option 2</option>
        //                         {/* Add more options as needed */}
        //                     </select>
        //                     <input
        //                         type="text"
        //                         placeholder="Additional Field"
        //                         className="border border-gray-300 p-2 rounded mr-2"
        //                     />
        //                     <input
        //                         type="text"
        //                         placeholder="Another Field"
        //                         className="border border-gray-300 p-2 rounded"
        //                     />
        //                 </div>
        //             </div>
        //             <div className="flex justify-end">
        //                 <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded mr-2">
        //                     Submit
        //                 </button>
        //                 <button onClick={onClose} className="bg-red-500 text-white px-4 py-2 rounded">
        //                     Close
        //                 </button>
        //             </div>
        //         </form>
        //     </div>
        // </div>
        // <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
        //     <div className="bg-white p-4 rounded shadow-lg">
        //         <h2 className="text-lg font-bold mb-4">Modal Title</h2>
        //         <form onSubmit={handleSubmit} className="flex flex-col">
        //             <div className="mb-4">
        //                 <h3 className="text-sm font-semibold mb-2">Row 1</h3>
        //                 <div className="flex mb-2">
        //                     <label htmlFor="name">Name:</label>
        //                     <input
        //                         type="text"
        //                         id="name"
        //                         value={formData.name}
        //                         onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        //                         placeholder="Enter your name"
        //                         className="border border-gray-300 p-2 rounded mr-2"
        //                     />
        //                     <label htmlFor="email">Email:</label>
        //                     <input
        //                         type="email"
        //                         id="email"
        //                         value={formData.email}
        //                         onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        //                         placeholder="Enter your email"
        //                         className="border border-gray-300 p-2 rounded mr-2"
        //                     />
        //                     <label htmlFor="option1">Option 1:</label>
        //                     <select
        //                         id="option1"
        //                         value={formData.option1}
        //                         onChange={(e) => setFormData({ ...formData, option1: e.target.value })}
        //                         className="border border-gray-300 p-2 rounded"
        //                     >
        //                         <option value="">Select Option 1</option>
        //                         {/* Add more options as needed */}
        //                     </select>
        //                 </div>
        //             </div>
        //             <div className="mb-4">
        //                 <h3 className="text-sm font-semibold mb-2">Row 2</h3>
        //                 <div className="flex mb-2">
        //                     <label htmlFor="option2">Option 2:</label>
        //                     <select
        //                         id="option2"
        //                         value={formData.option2}
        //                         onChange={(e) => setFormData({ ...formData, option2: e.target.value })}
        //                         className="border border-gray-300 p-2 rounded mr-2"
        //                     >
        //                         <option value="">Select Option 2</option>
        //                         {/* Add more options as needed */}
        //                     </select>
        //                     <label htmlFor="additionalField">Additional Field:</label>
        //                     <input
        //                         type="text"
        //                         id="additionalField"
        //                         placeholder="Enter additional field"
        //                         className="border border-gray-300 p-2 rounded mr-2"
        //                     />
        //                     <label htmlFor="anotherField">Another Field:</label>
        //                     <input
        //                         type="text"
        //                         id="anotherField"
        //                         placeholder="Enter another field"
        //                         className="border border-gray-300 p-2 rounded"
        //                     />
        //                 </div>
        //             </div>
        //             <div className="flex justify-end">
        //                 <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded mr-2">
        //                     Submit
        //                 </button>
        //                 <button onClick={onClose} className="bg-red-500 text-white px-4 py-2 rounded">
        //                     Close
        //                 </button>
        //             </div>
        //         </form>
        //     </div>
        // </div>
        // <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
        //     <div className="bg-white p-4 rounded shadow-lg">
        //         <h2 className="text-lg font-bold mb-4">Modal Title</h2>
        //         <form onSubmit={handleSubmit} className="flex flex-col">
        //             <div className="mb-4">
        //                 <h3 className="text-sm font-semibold mb-2">Row 1</h3>
        //                 <div className="flex mb-2">
        //                     <label htmlFor="name">Name:</label>
        //                     <input
        //                         type="text"
        //                         id="name"
        //                         value={formData.name}
        //                         onChange={handleChange}
        //                         name="name"
        //                         placeholder="Enter your name"
        //                         className="border border-gray-300 p-2 rounded mr-2"
        //                     />
        //                     <label htmlFor="email">Email:</label>
        //                     <input
        //                         type="email"
        //                         id="email"
        //                         value={formData.email}
        //                         onChange={handleChange}
        //                         name="email"
        //                         placeholder="Enter your email"
        //                         className="border border-gray-300 p-2 rounded mr-2"
        //                     />
        //                     <label htmlFor="option1">Option 1:</label>
        //                     <select
        //                         id="option1"
        //                         value={formData.option1}
        //                         onChange={handleChange}
        //                         name="option1"
        //                         className="border border-gray-300 p-2 rounded"
        //                     >
        //                         <option value="">Select Option 1</option>
        //                         {/* Add more options as needed */}
        //                     </select>
        //                 </div>
        //             </div>
        //             <div className="mb-4">
        //                 <h3 className="text-sm font-semibold mb-2">Row 2</h3>
        //                 <div className="flex mb-2">
        //                     <label htmlFor="option2">Option 2:</label>
        //                     <select
        //                         id="option2"
        //                         value={formData.option2}
        //                         onChange={handleChange}
        //                         name="option2"
        //                         className="border border-gray-300 p-2 rounded mr-2"
        //                     >
        //                         <option value="">Select Option 2</option>
        //                         {/* Add more options as needed */}
        //                     </select>
        //                     <label htmlFor="additionalField">Additional Field:</label>
        //                     <input
        //                         type="text"
        //                         id="additionalField"
        //                         placeholder="Enter additional field"
        //                         className="border border-gray-300 p-2 rounded mr-2"
        //                     />
        //                     <label htmlFor="anotherField">Another Field:</label>
        //                     <input
        //                         type="text"
        //                         id="anotherField"
        //                         placeholder="Enter another field"
        //                         className="border border-gray-300 p-2 rounded"
        //                     />
        //                 </div>
        //             </div>
        //             <div className="flex justify-end">
        //                 <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded mr-2">
        //                     Submit
        //                 </button>
        //                 <button onClick={onClose} className="bg-red-500 text-white px-4 py-2 rounded">
        //                     Close
        //                 </button>
        //             </div>
        //         </form>
        //     </div>
        // </div>

        // <div className="popup-form">
        //     <label htmlFor="first-name">First Name</label>
        //     <input type="text" name="firstName" value={formData.name} onChange={handleChange} />

        //     {/* Add similar input fields for Last Name, Email, Country, Street Address, City, Region, and Postal Code */}

        // </div>
        <div className="popup">
            <div className="popup-inner">
                <h2>Login</h2>
                <form >
                    <label>
                        Username:
                        <input type="text" />
                    </label>
                    <label>
                        Password:
                        <input type="password" />
                    </label>
                    <button type="submit">Login</button>
                </form>
                <button>Close</button>
            </div>
        </div>
    )
}

export default AssignDesg;