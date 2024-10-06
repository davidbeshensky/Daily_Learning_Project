'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

interface NavLink {
  name: string;
  path: string;
}

export default function Header() {
  const [navLinks, setNavLinks] = useState<NavLink[]>([]);
  const pathname = usePathname();

  useEffect(() => {
    async function fetchNavLinks() {
      try {
        const res = await fetch('/api/nav-links');
        const data: NavLink[] = await res.json();
        setNavLinks(data);
      } catch (error) {
        console.error('Error fetching navigation links:', error);
      }
    }

    fetchNavLinks();
  }, []);

  if (!navLinks.length) {
    return (
      <header className="bg-gray-400 p-4 flex justify-center items-center min-h-[100px]">
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 border-4 border-blue-600 border-dashed rounded-full animate-spin"></div>
          <p className="text-blue-600">Loading navigation...</p>
        </div>
      </header>
    );
  }

  return (
    <header className="border-b-2 p-4">
      <nav>
        <ul className="flex list-none">
          {navLinks.map(({ name, path }) => (
            <li key={path} className="mr-4">
              <Link
                href={path}
                className={`hover:underline ${
                  pathname === path ? 'font-bold text-blue-600' : ''
                }`}
              >
                {name}
              </Link>
            </li>
          ))}
          {/* Add the Data Structures link manually */}
          <li className="mr-4">
            <Link
              href="/components/data-structures"
              className={`hover:underline ${
                pathname === '/components/data-structures' ? 'font-bold text-blue-600' : ''
              }`}
            >
              Data Structures
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
