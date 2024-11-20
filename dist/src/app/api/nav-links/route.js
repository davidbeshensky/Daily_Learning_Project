import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
function getDirectoryStructure(dirPath, parentPath = "/projects", visitedPaths = new Set()) {
    // Prevent infinite recursion due to circular references or symlinks
    if (visitedPaths.has(dirPath)) {
        return []; // Stop recursion on this path but continue processing other branches
    }
    visitedPaths.add(dirPath);
    const directories = fs.readdirSync(dirPath, { withFileTypes: true });
    return directories
        .filter((dirent) => dirent.isDirectory()) // Only include directories
        .map((dirent) => {
        const childPath = path.join(dirPath, dirent.name);
        const fullPath = `${parentPath}/${dirent.name}`; // Build full path dynamically
        return {
            name: dirent.name.replace(/-/g, " "), // Format name for display
            path: fullPath, // Link to the directory
            children: getDirectoryStructure(childPath, fullPath, visitedPaths), // Recursively add child directories
        };
    });
}
export async function GET() {
    try {
        const projectsParentDir = path.join(process.cwd(), "src", "app", "projects");
        let navStructure = [{ name: "Home", path: "/" }];
        if (fs.existsSync(projectsParentDir)) {
            const projectFolders = getDirectoryStructure(projectsParentDir);
            navStructure = [...navStructure, ...projectFolders];
            console.log(JSON.stringify(navStructure, null, 2));
        }
        else {
            console.log("Projects directory does not exist");
        }
        return NextResponse.json(navStructure);
    }
    catch (error) {
        console.error("Error reading project folders:", error);
        return NextResponse.json({ error: "Failed to load projects" }, { status: 500 });
    }
}
