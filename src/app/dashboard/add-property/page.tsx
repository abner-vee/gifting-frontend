// app/dashboard/add-property/page.tsx
'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import {Property} from "@/app/types/property";
import {API_BASE_URL} from "@/app/types/constant";

const AddProperty = () => {
    const [formData, setFormData] = useState<Partial<Property>>({
        name: '',
        description: '',
        price: 0,
        image: '',
    });
    const router = useRouter();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: name === "price" ? parseInt(value) : value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            console.log("Raw Form Data:", formData);

            // Ensure formData is serializable
            const formattedData = JSON.parse(JSON.stringify(formData, (key, value) =>
                typeof value === 'undefined' ? null : value
            ));
            console.log("Formatted Data:", formattedData);

            const response = await fetch(`${API_BASE_URL}/properties`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: formattedData.name,
                    description: formattedData.description,
                    price: parseInt(formattedData.price),
                    image: formattedData.image, // Assuming image is a URL string
                }),
            });

            if (response.ok) {
                router.push('/dashboard/properties');
            } else {
                console.error("Failed to submit:", await response.json());
            }
        } catch (error) {
            console.error("Error submitting form:", error);
        }
    };


    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">Add New Property</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Name</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Description</label>
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        required
                        className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Price</label>
                    <input
                        type="number"
                        name="price"
                        value={formData.price}
                        onChange={handleChange}
                        required
                        className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Image URL</label>
                    <input
                        type="text"
                        name="image"
                        value={formData.image}
                        onChange={handleChange}
                        required
                        className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                    />
                </div>
                <button
                    type="submit"
                    className="w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-md shadow hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                    Add Property
                </button>
            </form>
        </div>
    );
};

export default AddProperty;
