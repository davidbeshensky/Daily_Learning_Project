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

  if (!navLinks) {
    return (
      <header className="bg-gray-100 p-4">
        <nav>
          <p>Loading navigation...</p>
        </nav>
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
        </ul>
      </nav>
    </header>
  );
}
