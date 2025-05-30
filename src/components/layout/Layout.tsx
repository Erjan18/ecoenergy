import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import { Suspense } from 'react';

export default function Layout() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <Suspense fallback={<div className="flex justify-center items-center py-20">Загрузка...</div>}>
          <Outlet />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}