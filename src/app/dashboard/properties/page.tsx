// app/dashboard/properties/page.tsx
'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import {Property} from "@/app/types/property";
import {API_BASE_URL} from "@/app/types/constant";
import Image from "next/image";


const PropertiesPage = () => {
    const [properties, setProperties] = useState<Property[] | []>([]);

    useEffect(() => {
        // Fetch properties from your API
        const fetchProperties = async () => {
            const response = await fetch(`${API_BASE_URL}/properties`);
            if (response.ok) {
                const data = await response.json();
                console.log("RESPONSE DATA ::: " + JSON.stringify(data.data));
                setProperties(data.data);
            } else {
                // Handle error
            }
        };

        fetchProperties();
    }, []);

    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">My Properties</h1>
            <Link href="/dashboard/add-property" className="mb-4 inline-block bg-indigo-600 text-white py-2 px-4 rounded">
                    Add New Property
            </Link>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {properties?.map((property) => (
                    <div key={property.id} className="bg-white p-4 rounded shadow">
                        <Image src={property.image} alt={property.name} className="w-full h-48 object-cover rounded mb-4" />
                        <h2 className="text-xl font-bold">{property.name}</h2>
                        <p className="text-gray-700">{property.description}</p>
                        <p className="text-gray-900 font-semibold">${property.price}</p>
                        <Link href={`/dashboard/properties/${property.id}`}>
                            <button className="text-indigo-600 hover:underline">View Details</button>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PropertiesPage;
