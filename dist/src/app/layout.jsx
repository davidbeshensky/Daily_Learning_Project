import Header from "./components/Header";
import localFont from "next/font/local";
import "./globals.css";
const geistSans = localFont({
    src: "./fonts/GeistVF.woff",
    variable: "--font-geist-sans",
    weight: "100 900",
});
const geistMono = localFont({
    src: "./fonts/GeistMonoVF.woff",
    variable: "--font-geist-mono",
    weight: "100 900",
});
export const metadata = {
    title: "Daily_Learning_Project",
    description: "A place to test things",
};
async function fetchNavLinks() {
    try {
        // Ensure the base URL is properly set
        const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
        // Check if the base URL exists
        if (!baseUrl) {
            throw new Error("NEXT_PUBLIC_BASE_URL is not defined");
        }
        const res = await fetch(`${baseUrl}/api/nav-links`, {
            cache: 'no-store',
        });
        if (!res.ok) {
            throw new Error('Failed to fetch navigation links');
        }
        return await res.json();
    }
    catch (error) {
        console.error("Error fetching navigation links:", error);
        return [];
    }
}
export default async function RootLayout({ children, }) {
    const navLinks = await fetchNavLinks(); // Fetch data before rendering
    return (<html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Header navLinks={navLinks}/> {/* Pass navLinks to Header */}
        <main className="p-4">{children}</main>
      </body>
    </html>);
}
