// app/dashboard/layout.tsx
import React from 'react';
import Page from "@/app/components/sidebar/page";

export default function DashboardLayout({
                                            children,
                                        }: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex">
            <Page />
            <main className="flex-1 p-8 bg-gray-100">{children}</main>
        </div>
    );
}
