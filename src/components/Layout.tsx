import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';

export default function Layout() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar  />
      <main className="flex-grow max-w-5xl mx-auto w-full p-4">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
