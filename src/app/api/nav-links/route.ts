import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
  try {
    const projectsDir = path.join(process.cwd(), 'src', 'app', 'projects');
    console.log('Projects directory path:', projectsDir);

    let navLinks = [{ name: 'Home', path: '/' }];

    if (fs.existsSync(projectsDir)) {
      const directories = fs.readdirSync(projectsDir, { withFileTypes: true });
      const projectLinks = directories
        .filter((dirent) => dirent.isDirectory()) // Ensure only directories are included
        .map((dirent) => ({
          name: dirent.name.replace(/-/g, ' '),
          path: `/projects/${dirent.name}`,
        }));

      navLinks = [...navLinks, ...projectLinks];
    } else {
      console.log('Projects directory does not exist.');
    }

    return NextResponse.json(navLinks);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to load projects' }, { status: 500 });
  }
}
