import type { Metadata } from 'next';
import { AuthProvider } from '@/context/AuthContext';
import Navbar from '@/components/Navbar';
import ToastContainer from '@/components/ToastContainer';
import '@/styles/globals.css';

export const metadata: Metadata = {
  title: 'BookStore - Buy and Sell Books Online',
  description: 'A modern bookstore application for readers and authors',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <Navbar />
          <main>{children}</main>
          <ToastContainer />
        </AuthProvider>
      </body>
    </html>
  );
}
