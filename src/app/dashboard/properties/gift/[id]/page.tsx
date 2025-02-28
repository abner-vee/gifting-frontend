'use client';

import React, {useEffect, useState} from 'react';
import {useParams, useRouter} from 'next/navigation';
import {API_BASE_URL} from "@/app/types/constant";
import {User} from "@/app/types/types";
interface GiftRequest{
    recipientEmail: string;
    giverId: number;
    propertyId: number;
}
const GiftPropertyPage = () => {
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const router = useRouter();
    const params = useParams();
    const { id } = params;

    // State to store the parsed propertyId
    const [propertyId, setPropertyId] = useState<number | null>(null);

    useEffect(() => {
        if (typeof id === 'string') {
            const parsedId = parseInt(id, 10);
            if (!isNaN(parsedId)) {
                setPropertyId(parsedId);
            } else {
                setError('Invalid property ID.');
            }
        } else {
            setError('Property ID is missing.');
        }
    }, [id]);

    // Retrieve user from localStorage
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const savedUser = localStorage.getItem('user');
        if (savedUser) {
            try {
                const parsedUser = JSON.parse(savedUser) as User;
                setUser(parsedUser);
            } catch (err) {
                setError('Failed to parse user data.'+err);
            }
        } else {
            setError('User not found.');
        }
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        if (!user || propertyId === null) {
            setError('User or Property ID is not available.');
            return;
        }

        const giftRequest: GiftRequest = {
            recipientEmail: email,
            giverId: user.id,
            propertyId: propertyId,
        };

        try {
            const response = await fetch(`${API_BASE_URL}/gifts`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(giftRequest),
            });

            if (response.ok) {
                setSuccess('Property successfully gifted.');
                setTimeout(() => {
                    router.push('/dashboard/properties');
                }, 2000);
            } else {
                const data = await response.json();
                setError(data.message || 'An error occurred.');
            }
        } catch (err) {
            setError('An error occurred. Please try again. '+err);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8">
                <h1 className="text-2xl font-bold mb-4">Gift Property</h1>
                {error && <p className="text-red-500 mb-4">{error}</p>}
                {success && <p className="text-green-500 mb-4">{success}</p>}
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                            Recipient&#39;s Email
                        </label>
                        <input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-md shadow hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                        Gift Property
                    </button>
                </form>
            </div>
        </div>
    );
};

export default GiftPropertyPage;
