"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Property } from '@/app/types/property';
import { API_BASE_URL } from '@/app/types/constant';

interface Props {
    params: Promise<{
        id: string;
    }>;
}

const EditPropertyPage: React.FC<Props> = ({ params }) => {
    const [formData, setFormData] = useState<Omit<Property, 'id'>>({
        name: '',
        description: '',
        price: 0,
        image: '',
    });
    const router = useRouter();

    useEffect(() => {
        const fetchData = async () => {
            const { id } = await params;

            if (id) {
                // Fetch property details from your API
                const response = await fetch(`${API_BASE_URL}/properties/${id}`);
                if (response.ok) {
                    const data = await response.json();
                    setFormData({
                        name: data.data.name,
                        description: data.data.description,
                        price: data.data.price,
                        image: data.data.image,
                    });
                } else {
                    // Handle error
                }
            }
        };

        fetchData();
    }, [params]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: name === 'price' ? parseFloat(value) : value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const { id } = await params;
        // Update property in your API
        const response = await fetch(`${API_BASE_URL}/properties/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });

        if (response.ok) {
            router.push('/dashboard/properties');
        } else {
            // Handle error
        }
    };

    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">Edit Property</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                        Name
                    </label>
                    <input
                        id="name"
                        name="name"
                        type="text"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                    />
                </div>
                <div>
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                        Description
                    </label>
                    <textarea
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        required
                        className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                    />
                </div>
                <div>
                    <label htmlFor="price" className="block text-sm font-medium text-gray-700">
                        Price
                    </label>
                    <input
                        id="price"
                        name="price"
                        type="number"
                        value={formData.price}
                        onChange={handleChange}
                        required
                        className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                    />
                </div>
                <div>
                    <label htmlFor="image" className="block text-sm font-medium text-gray-700">
                        Image URL
                    </label>
                    <input
                        id="image"
                        name="image"
                        type="text"
                        value={formData.image}
                        onChange={handleChange}
                        required
                        className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                    />
                </div>
                <button
                    type="submit"
                    className="bg-indigo-600 text-white py-2 px-4 rounded-md shadow hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                    Save Changes
                </button>
            </form>
        </div>
    );
};

export default EditPropertyPage;
