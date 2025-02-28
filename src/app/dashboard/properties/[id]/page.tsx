'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Property } from '@/app/types/property';
import {API_BASE_URL} from "@/app/types/constant";

const PropertyDetailsPage = () => {
    const { id } = useParams();
    const router = useRouter();
    const [property, setProperty] = useState<Property | null>(null);

    useEffect(() => {
        if (id) {
            // Fetch property details from your API
            const fetchProperty = async () => {
                const response = await fetch(`${API_BASE_URL}/properties/${id}`);
                if (response.ok) {
                    const data = await response.json();
                    setProperty(data.data);
                } else {
                    // Handle error
                    console.error('Failed to fetch property details');
                }
            };

            fetchProperty();
        }
    }, [id]);

    if (!property) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">{property.name}</h1>
            <img
                src={property.image}
                alt={property.name}
                className="w-full h-64 object-cover rounded mb-4"
            />
            <p className="text-gray-700 mb-4">{property.description}</p>
            <p className="text-gray-900 font-semibold mb-4">${property.price}</p>
            <div className="flex space-x-4">
                <button
                    onClick={() => router.push(`/dashboard/properties/edit/${property.id}`)}
                    className="bg-blue-500 text-white py-2 px-4 rounded"
                >
                    Edit
                </button>
                <button
                    onClick={async () => {
                        // Delete property
                        const response = await fetch(`${API_BASE_URL}/properties/${property.id}`, {
                            method: 'DELETE',
                        });
                        if (response.ok) {
                            router.push('/dashboard/properties');
                        } else {
                            // Handle error
                            console.error('Failed to delete property');
                        }
                    }}
                    className="bg-red-500 text-white py-2 px-4 rounded"
                >
                    Delete
                </button>
                <button
                    onClick={() => router.push(`/dashboard/properties/gift/${property.id}`)}
                    className="bg-green-500 text-white py-2 px-4 rounded"
                >
                    Gift
                </button>
            </div>
        </div>
    );
};

export default PropertyDetailsPage;
