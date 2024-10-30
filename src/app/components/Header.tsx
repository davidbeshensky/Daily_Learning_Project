"use client";

import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface NavLink {
  name: string;
  path: string;
  children?: NavLink[];
}

export default function Header({ navLinks }: { navLinks: NavLink[] }) {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const toggleDropdown = (name: string) => {
    setOpenDropdown((prev) => (prev === name ? null : name));
  };

  const closeDropdown = () => {
    setOpenDropdown(null);
  };

  if (!navLinks.length) {
    return (
      <header className="bg-gray-400 p-4 flex justify-center items-center">
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 border-4 border-blue-600 border-dashed rounded-full animate-spin"></div>
          <p className="text-blue-600">Loading navigation...</p>
        </div>
      </header>
    );
  }

  const dropdownVariants = {
    hidden: {
      opacity: 0,
      y: -10,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 15,
        stiffness: 120,
        staggerChildren: 0.075,
      },
    },
    exit: {
      opacity: 0,
      y: -10,
      transition: {
        duration: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 15,
        stiffness: 150,
      },
    },
  };

  return (
    <header className="border-b-2 p-4">
      <nav>
        <ul className="flex list-none items-center">
          {navLinks.map((link) => (
            <li key={link.path} className="relative mr-4">
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
                <Link
                  className="hover:bg-slate-800 bg-slate-900 rounded-md px-4 py-3"
                  href={link.path}
                >
                  {link.name}
                </Link>
              )}

              <AnimatePresence>
                {openDropdown === link.name && link.children && (
                  <motion.ul
                    variants={dropdownVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="absolute left-0 mt-2 bg-slate-600 shadow-lg rounded-lg"
                  >
                    {link.children.map((child) => (
                      <motion.li
                        key={child.path}
                        variants={itemVariants}
                        className="px-4 py-2 text-slate-100"
                      >
                        <Link
                          className="hover:bg-slate-500 p-1 rounded"
                          href={child.path}
                          onClick={closeDropdown}
                        >
                          {child.name}
                        </Link>
                      </motion.li>
                    ))}
                  </motion.ul>
                )}
              </AnimatePresence>
            </li>
          ))}
          <li className="mr-4">
            <Link
              href="/components/data-structures"
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
