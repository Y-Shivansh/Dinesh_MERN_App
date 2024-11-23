import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";

export const DonateFood = ({ setIsModalOpen }) => {
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        category: "",
        quantity: "",
        expirationDate: "",
        locationAddress: "",
        longitude: "",
        latitude: "",
        email: "",
        photo: null,
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;

        setFormData((prevData) => ({
            ...prevData,
            [name]: value, // Always store the date as YYYY-MM-DD
        }));
    };




    const handleFileChange = (e) => {
        setFormData((prevData) => ({
            ...prevData,
            photo: e.target.files[0],
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const form = new FormData();
        for (const key in formData) {
            if (key !== "photo") {
                form.append(key, formData[key]);
            }
        }

        if (isNaN(formData.longitude) || isNaN(formData.latitude)) {
            toast.error("Please enter valid longitude and latitude.");
            return;
        }
        if (formData.photo) {
            form.append("photo", formData.photo);
        }

        try {
            const response = await axios.post(
                "http://localhost:3000/api/listings/Create-FoodListings",
                form,
                { withCredentials: true }
            );

            toast.success(response.data.message);

            const emailPayload = {
                email: formData.email,
                title: formData.title,
                quantity: formData.quantity,
                category: formData.category,
                locationAddress: formData.locationAddress,
            };

            await axios.post("http://localhost:3000/api/listings/send-donation-email", emailPayload, {
                withCredentials: true,
            });

            toast.success("Donation email sent successfully!");

            setFormData({
                title: "",
                description: "",
                category: "",
                quantity: "",
                expirationDate: "",
                locationAddress: "",
                longitude: "",
                latitude: "",
                email: "",
                photo: null,
            });
            setIsModalOpen(false); // Close modal after submission
            location.reload()
        } catch (error) {
            console.error(error);
            toast.error("Something went wrong. Please try again.");
        }
    };

    return (
        <div
            className="modal-overlay fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
            onClick={(e) => {
                if (e.target.classList.contains("modal-overlay")) {
                    setIsModalOpen(false);
                }
            }}
        >
            <div className="bg-gray-100 p-6 rounded-lg w-full max-w-3xl relative overflow-auto max-h-screen">
                <button
                    className="absolute top-4 right-4 text-xl text-black"
                    onClick={() => setIsModalOpen(false)}
                >
                    &times;
                </button>
                <h2 className="text-xl font-semibold mb-4 text-red-950">Donate Food</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="mb-4">
                            <label htmlFor="email" className="block text-sm font-medium text-headingCol">
                                Email
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                className="mt-1 px-3 py-2 border border-gray-300 rounded-md w-full bg-transparent focus:outline-none text-black"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="title" className="block text-sm font-medium text-headingCol">
                                Title
                            </label>
                            <input
                                type="text"
                                id="title"
                                name="title"
                                value={formData.title}
                                onChange={handleInputChange}
                                className="mt-1 px-3 py-2 border border-gray-300 rounded-md w-full bg-transparent focus:outline-none text-black"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="description" className="block text-sm font-medium text-headingCol">
                                Description
                            </label>
                            <textarea
                                id="description"
                                name="description"
                                value={formData.description}
                                onChange={handleInputChange}
                                className="mt-1 px-3 py-2 border border-gray-300 rounded-md w-full bg-transparent focus:outline-none text-black"
                                required
                            ></textarea>
                        </div>
                        <div className="mb-4">
                            <label htmlFor="category" className="block text-sm font-medium text-headingCol">
                                Category
                            </label>
                            <input
                                type="text"
                                id="category"
                                name="category"
                                value={formData.category}
                                onChange={handleInputChange}
                                className="mt-1 px-3 py-2 border border-gray-300 rounded-md w-full bg-transparent focus:outline-none text-black"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="quantity" className="block text-sm font-medium text-headingCol">
                                Quantity
                            </label>
                            <input
                                type="number"
                                id="quantity"
                                name="quantity"
                                value={formData.quantity}
                                onChange={handleInputChange}
                                className="mt-1 px-3 py-2 border border-gray-300 rounded-md w-full bg-transparent focus:outline-none text-black"
                                required
                            />
                        </div>
                        <input
                            type="date"
                            id="expirationDate"
                            name="expirationDate"
                            value={formData.expirationDate || ""}
                            onChange={handleInputChange}
                            className="mt-1 px-3 py-2 border border-gray-300 rounded-md w-full bg-transparent focus:outline-none text-black"
                            required
                        />


                        <div className="mb-4">
                            <label htmlFor="locationAddress" className="block text-sm font-medium text-headingCol">
                                Location Address
                            </label>
                            <input
                                type="text"
                                id="locationAddress"
                                name="locationAddress"
                                value={formData.locationAddress}
                                onChange={handleInputChange}
                                className="mt-1 px-3 py-2 border border-gray-300 rounded-md w-full bg-transparent focus:outline-none text-black"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="longitude" className="block text-sm font-medium text-headingCol">
                                Longitude
                            </label>
                            <input
                                type="text"
                                id="longitude"
                                name="longitude"
                                value={formData.longitude}
                                onChange={handleInputChange}
                                className="mt-1 px-3 py-2 border border-gray-300 rounded-md w-full bg-transparent focus:outline-none text-black"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="latitude" className="block text-sm font-medium text-headingCol">
                                Latitude
                            </label>
                            <input
                                type="text"
                                id="latitude"
                                name="latitude"
                                value={formData.latitude}
                                onChange={handleInputChange}
                                className="mt-1 px-3 py-2 border border-gray-300 rounded-md w-full bg-transparent focus:outline-none text-black"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="photo" className="block text-sm font-medium text-headingCol">
                                Photo
                            </label>
                            <input
                                type="file"
                                id="photo"
                                name="photo"
                                onChange={handleFileChange}
                                className="mt-1 px-3 py-2 border border-gray-300 rounded-md w-full bg-transparent focus:outline-none text-black"
                            />
                        </div>
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-headingCol text-white py-2 rounded-md"
                    >
                        Submit
                    </button>
                </form>
            </div>
            <ToastContainer />
        </div>
    );
};
