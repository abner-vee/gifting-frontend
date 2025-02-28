// components/Page.tsx
import Link from 'next/link';

const Page = () => {
    return (
        <div className="h-screen w-64 bg-gray-800 text-white flex flex-col">
            <div className="p-4 text-2xl font-bold">Dashboard</div>
            <nav className="flex-1">
                <ul>
                    <li className="p-4 hover:bg-gray-700">
                        <Link href="../../dashboard">Home</Link>
                    </li>
                    <li className="p-4 hover:bg-gray-700">
                        <Link href="../../dashboard/properties/">My Properties</Link>
                    </li>
                    <li className="p-4 hover:bg-gray-700">
                        <Link href="../../dashboard/add-property">Add Property</Link>
                    </li>
                    <li className="p-4 hover:bg-gray-700">
                        <Link href="../../dashboard/logout">Logout</Link>
                    </li>
                    <li className="p-4 hover:bg-gray-700">
                        <Link href="../../dashboard/settings">Settings</Link>
                    </li>
                </ul>
            </nav>
        </div>
    );
};

export default Page;
