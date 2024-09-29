import Link from "next/link";
export default function NavList(){
    return (
        <div>
            <Link href="/" className="block text-gray-700 hover:text-gray-900">
              Home
            </Link>
            <Link href="/thumbnail" className="block text-gray-700 hover:text-gray-900">
              Thumbnail
            </Link>
            <Link href="/image" className="block text-gray-700 hover:text-gray-900">
              Image Reduce
            </Link>
            <Link href="/" className="block text-gray-700 hover:text-gray-900">
              Contact
            </Link>
        </div>
    );
}