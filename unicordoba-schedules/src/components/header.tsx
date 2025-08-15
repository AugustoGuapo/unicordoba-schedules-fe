import Link from "next/link";

export default function Header() {
  return (
    <header className="w-full py-4 px-6 bg-white shadow flex items-center">
        <Link href="/" className="text-2xl font-bold tracking-wider hover:text-blue-600 transition">
        HU
        </Link>
    </header>
  );
}