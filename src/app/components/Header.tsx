'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import DataStructuresGrid from './data-structures/page';

interface NavLink {
  name: string;
  path: string;
  children?: NavLink[];
}

export default function Header() {
  const [navLinks, setNavLinks] = useState<NavLink[]>([]);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null); //tracking open dropdown
  const [clickedLink, setClickedLink] = useState<boolean>(false);
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

  const toggleDropdown = (name: string) => {
    setOpenDropdown((prev) => (prev === name ? null : name));
  };

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
        <ul className="flex list-none items-center">
          {navLinks.map((link) => (
            <li key={link.path} className="relative mr-4">
              {/* Render parent link as button if it has children */}
              {link.children && link.children.length > 0 ? (
                <button
                  onClick={() => toggleDropdown(link.name)}
                  className={`hover:bg-slate-800 bg-slate-900 rounded-md px-4 py-2 ${
                    openDropdown === link.name
                  }`}
                >
                  {link.name}
                </button>
              ) : (
                <Link className="hover:bg-slate-800 bg-slate-900 rounded-md px-4 py-3" href={link.path} passHref>
                    {link.name}
                </Link>
              )}

              {/* Dropdown for children */}
              <AnimatePresence>
                {openDropdown === link.name && link.children && (
                  <motion.ul
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.25 }}
                    className="absolute left-0 mt-2 bg-slate-600 shadow-lg rounded-lg"
                  >
                    {link.children.map((child) => (
                      <li key={child.path} className="px-4 py-2 text-slate-100">
                        <Link className="hover:bg-slate-500 p-1 rounded" href={child.path}>
                            {child.name}                       
                        </Link>
                      </li>
                    ))}
                  </motion.ul>
                )}
              </AnimatePresence>
            </li>
          ))}
          {/* Manually entered Data Structures link */}
          <li className="mr-4">
            <Link href="/components/data-structures"
            className="hover:bg-slate-800 bg-slate-900 rounded-md px-4 py-3"
            >
                Data Structures
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}