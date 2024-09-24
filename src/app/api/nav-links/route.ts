import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
  const projectsDir = path.join(process.cwd(), 'src', 'app', 'projects');
  console.log('Projects directory path:', projectsDir);

  let navLinks = [{ name: 'Home', path: '/' }];

  if (fs.existsSync(projectsDir)) {
    console.log('Projects directory exists.');
    const directories = fs.readdirSync(projectsDir, { withFileTypes: true });
    console.log('Directories found:', directories.map((d) => d.name));

    const projectLinks = directories
      .filter((dirent) => dirent.isDirectory() && !dirent.name.startsWith('.'))
      .map((dirent) => ({
        name: dirent.name.replace(/-/g, ' '),
        path: `/projects/${dirent.name}`,
      }));

    navLinks = [...navLinks, ...projectLinks];
  } else {
    console.log('Projects directory does not exist.');

  }

  console.log('Navigation links:', navLinks);
  return NextResponse.json(navLinks);
}
