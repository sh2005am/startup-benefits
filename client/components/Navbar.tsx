'use client';

import Link from 'next/link';
import { useAuth } from '../context/authContext';
import { motion } from 'framer-motion';

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav className="fixed top-0 w-full z-50 border-b border-white/10 bg-black/50 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
          StartupBenefits
        </Link>

        {/* Links */}
        <div className="flex items-center gap-6">
          <Link href="/deals" className="text-sm text-gray-300 hover:text-white transition-colors">
            Explore Deals
          </Link>
          
          {user ? (
            <>
              <Link href="/dashboard" className="text-sm text-gray-300 hover:text-white transition-colors">
                Dashboard
              </Link>
              <div className="flex items-center gap-4 ml-2">
                <span className="text-xs text-gray-500 hidden sm:block">
                  {user.email}
                </span>
                <button
                  onClick={logout}
                  className="text-xs bg-red-500/10 text-red-400 px-3 py-1.5 rounded-md hover:bg-red-500/20 transition-colors"
                >
                  Logout
                </button>
              </div>
            </>
          ) : (
            <div className="flex items-center gap-4">
              <Link href="/login" className="text-sm text-gray-300 hover:text-white">
                Login
              </Link>
              <Link
                href="/register"
                className="text-sm bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-full transition-all"
              >
                Get Started
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}