import Link from "next/link";

// components/Navbar.js
export default function Navbar() {
    return (
      <nav className="bg-white border-b border-gray-200 fixed w-full z-50 top-0 left-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              {/* Logo */}
              <Link href="/" className="text-xl font-semibold text-gray-900">Brand</Link>
            </div>
            
            {/* Navigation Links */}
            <div className="hidden md:flex items-center space-x-4">
              <Link href="/" className="text-gray-700 hover:text-gray-900">Home</Link>
              <Link href="/thumbnail" className="text-gray-700 hover:text-gray-900">Thumbnail</Link>
              <Link href="/image" className="text-gray-700 hover:text-gray-900">Image Reduce</Link>
              <a href="#" className="text-gray-700 hover:text-gray-900">Contact</a>
            </div>
  
            {/* Mobile Menu Button */}
            <div className="flex md:hidden items-center">
              <button type="button" className="text-gray-700 hover:text-gray-900">
                <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </nav>
    );
  }
  