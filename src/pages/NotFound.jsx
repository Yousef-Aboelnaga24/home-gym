import { Link } from "react-router-dom";

export function NotFound() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-zinc-950 text-white px-4">
            <div className="text-center space-y-4">

                <h1 className="text-6xl font-bold text-yellow-500">
                    404
                </h1>

                <h2 className="text-2xl font-semibold">
                    Page Not Found
                </h2>

                <p className="text-zinc-400">
                    The page you’re looking for doesn’t exist or has been moved.
                </p>

                <Link
                    to="/"
                    className="inline-block mt-4 px-6 py-2 bg-yellow-500 text-black rounded-xl font-medium hover:bg-yellow-400 transition"
                >
                    Go Home
                </Link>

            </div>
        </div>
    );
}