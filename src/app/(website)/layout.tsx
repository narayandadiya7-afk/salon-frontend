import React from 'react';
import Navbar from '../../components/website/Navbar';
import Footer from '../../components/website/Footer';
import './website.css';

export default function WebsiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <main className="website-main">{children}</main>
      <Footer />
    </>
  );
}
