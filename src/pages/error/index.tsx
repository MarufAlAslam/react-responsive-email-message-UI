import React from "react";
import { Link } from "react-router-dom";

const NotFound: React.FC = () => {
    return (
        <div className="min-h-screen bg-white text-black flex flex-col items-center justify-center text-center p-4">
            <h1 className="text-6xl font-bold mb-4">404</h1>
            <p className="text-xl mb-6">Oops! The page you're looking for doesn't exist.</p>
            <Link
                to="/"
                className="text-black border border-black px-4 py-2 rounded hover:bg-black hover:text-white transition"
            >
                Go Back Home
            </Link>
        </div>
    );
};

export default NotFound;
