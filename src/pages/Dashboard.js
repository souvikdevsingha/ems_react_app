import React from 'react'
import { useDataService } from '../services/DataService';
export default function Dashboard() {
    const { setSharedData, getSharedData } = useDataService();
    const userlogindata = JSON.parse(getSharedData());
    return (
        <>
            <div className="flex flex-col min-h-screen">
                {/* <header className="bg-gray-800 text-white text-center py-4">
                    <h1 className="text-3xl">Welcome to Our Website</h1>
                </header> */}
                <main className="flex-grow flex flex-col items-center justify-center">
                    <p className="text-xl text-center mb-4">
                        Thank you for visit Again {userlogindata.name}. We hope you enjoy your stay!
                    </p>
                    <p className="text-xl text-center mb-4">
                        Welcome To Your Dashboard
                    </p>
                    {/* <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                        Get Started
                    </button> */}
                </main>
                {/* <footer className="bg-gray-800 text-white text-center py-4">
                    <p>&copy; 2024 Your Company. All rights reserved.</p>
                </footer> */}
            </div>
        </>
    )
}
