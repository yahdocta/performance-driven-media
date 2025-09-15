import Link from 'next/link';

export default function NotFound() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-black to-gray-800">
            <div className="text-center px-4">
                <h1 className="text-6xl font-black text-white mb-4">404</h1>
                <h2 className="text-2xl font-bold text-red-500 mb-8">Page Not Found</h2>
                <p className="text-gray-300 mb-8 max-w-md mx-auto">
                    The page you&apos;re looking for doesn&apos;t exist or has been moved.
                </p>
                <Link
                    href="/"
                    className="inline-block bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-8 transition-all duration-300 transform hover:scale-105"
                >
                    Go Home
                </Link>
            </div>
        </div>
    );
}
