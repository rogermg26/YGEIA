import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Ygeia",
  description: "Dashboard",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}

        {/* <div className="flex flex-col min-h-screen" style={{ backgroundColor: '#EEEEEEFF', fontFamily: 'Montserrat, sans-serif' }}>
          {/* Content */}
          {/* <div className="flex-grow">{children}</div> */}
        {/* </div> */}
        
        <footer className="bg-gray-800 text-white text-center py-4">
          <div className="container mx-auto">
            {/* Footer*/}
            © 2024 Ygeia. All rights reserved.
          </div>
        </footer>
      </body>
    </html>
  );
}
