'use client';

import React, { useState } from 'react';
import styles from './blog.module.css';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';

const posts = [
  { id: '1', title: 'Summer Hair Care: Essential Tips for Healthy, Glowing Hair', excerpt: 'Protect your hair from sun damage with our expert guide to summer hair care routines and products.', category: 'Hair Care', date: 'Jun 28, 2026', author: 'Priya Sharma', image: 'https://images.unsplash.com/photo-1562322140-8baeececf3df?w=800&q=80', featured: true, readTime: '5 min read' },
  { id: '2', title: 'The Complete Guide to Bridal Beauty: Hair, Makeup & Skincare', excerpt: 'Everything you need to know about preparing for your wedding day beauty routine.', category: 'Bridal', date: 'Jun 25, 2026', author: 'Sophia D\'Souza', image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=800&q=80', featured: true, readTime: '8 min read' },
  { id: '3', title: 'Skincare Routine: Why Professional Facials Matter', excerpt: 'Discover the benefits of professional facial treatments and how they complement your daily skincare routine.', category: 'Skin Care', date: 'Jun 20, 2026', author: 'Ananya Patel', image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=800&q=80', featured: false, readTime: '6 min read' },
  { id: '4', title: '5 Nail Art Trends Taking Over This Season', excerpt: 'From minimalist designs to bold statements, explore the hottest nail art trends of the season.', category: 'Nails', date: 'Jun 18, 2026', author: 'Maya Krishnan', image: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?w=800&q=80', featured: false, readTime: '4 min read' },
  { id: '5', title: 'Beard Grooming 101: A Complete Guide for Modern Gentlemen', excerpt: 'Master the art of beard grooming with professional tips from our master barber.', category: 'Grooming', date: 'Jun 15, 2026', author: 'Rohit Verma', image: 'https://images.unsplash.com/photo-1503951914875-452cb67b3cbe?w=800&q=80', featured: false, readTime: '5 min read' },
  { id: '6', title: 'The Benefits of Keratin Treatments for All Hair Types', excerpt: 'Learn how keratin treatments can transform your hair, regardless of your hair type or texture.', category: 'Hair Care', date: 'Jun 12, 2026', author: 'Priya Sharma', image: 'https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?w=800&q=80', featured: false, readTime: '6 min read' },
  { id: '7', title: 'Stress Relief Through Aromatherapy Massage', excerpt: 'Explore how aromatherapy massage can help reduce stress and improve your overall well-being.', category: 'Wellness', date: 'Jun 10, 2026', author: 'Ananya Patel', image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=800&q=80', featured: false, readTime: '4 min read' },
  { id: '8', title: 'Winter Skincare: Adjusting Your Routine for Cold Weather', excerpt: 'Protect and nourish your skin during the colder months with these expert skincare tips.', category: 'Skin Care', date: 'Jun 5, 2026', author: 'Ananya Patel', image: 'https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?w=800&q=80', featured: false, readTime: '5 min read' },
];

const categories = ['All', 'Hair Care', 'Skin Care', 'Bridal', 'Nails', 'Grooming', 'Wellness'];

const popular = posts.slice(0, 4);

export default function BlogPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params?.slug as string;
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filtered = posts.filter((p) => {
    const matchCategory = activeCategory === 'All' || p.category === activeCategory;
    const matchSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCategory && matchSearch;
  });

  const featured = posts.filter((p) => p.featured);

  return (
    <>
      <section className={`luxe-hero ${styles.hero}`}>
        <div className="luxe-hero-bg"><img src="https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=1920&q=85" alt="Blog" /></div>
        <div className="luxe-hero-overlay" />
        <div className={`luxe-hero-content ${styles.heroContent}`}>
          <h1 className={`luxe-hero-title ${styles.heroTitle}`}>The LuxeStudio Blog</h1>
          <p className={`luxe-hero-subtitle ${styles.heroSubtitle}`}>Beauty tips, trends, and expert advice from our team.</p>
        </div>
      </section>

      {/* Featured */}
      {featured.length > 0 && (
        <section className={`luxe-section ${styles.sectionNoPadding}`}>
          <div className="luxe-container-lg">
            <div className="luxe-section-header-left">
              <span className="luxe-section-overline">Featured</span>
            </div>
            <div className={styles.featuredGrid}>
              {featured.map((post) => (
                <div key={post.id} className="luxe-blog-card" onClick={() => router.push(`/${slug}/blog/${post.id}`)}>
                  <img src={post.image} alt={post.title} />
                  <div className="blog-body">
                    <div className="blog-category">{post.category}</div>
                    <h3 className="blog-title">{post.title}</h3>
                    <p className="blog-excerpt">{post.excerpt}</p>
                    <div className={styles.postMeta}>
                      <span>{post.author} • {post.date}</span>
                      <span>{post.readTime}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Filters */}
      <section className={`luxe-section ${styles.sectionNoPadding}`}>
        <div className="luxe-container-lg">
          <div className={styles.filterBar}>
            <div className={styles.filterChips}>
              {categories.map((cat) => (
                <button key={cat} className={`luxe-chip ${activeCategory === cat ? 'active' : ''}`} onClick={() => setActiveCategory(cat)}>{cat}</button>
              ))}
            </div>
            <div className={`luxe-search ${styles.searchWrapper}`}>
              <svg className="search-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>
              <input className={`luxe-input ${styles.searchInput}`} placeholder="Search posts..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
            </div>
          </div>
        </div>
      </section>

      {/* All Posts */}
      <section className="luxe-section">
        <div className="luxe-container-lg">
          <div className="luxe-grid-3">
            {filtered.filter((p) => !p.featured).map((post) => (
              <div key={post.id} className="luxe-blog-card" onClick={() => router.push(`/${slug}/blog/${post.id}`)}>
                <img src={post.image} alt={post.title} />
                <div className="blog-body">
                  <div className="blog-category">{post.category}</div>
                  <h3 className="blog-title">{post.title}</h3>
                  <p className="blog-excerpt">{post.excerpt}</p>
                  <div className={styles.postMeta}>
                    <span>{post.author} • {post.date}</span>
                    <span>{post.readTime}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="luxe-newsletter">
        <div className="luxe-newsletter-content">
          <h2 className="luxe-newsletter-title">Stay Inspired</h2>
          <p className="luxe-newsletter-subtitle">Get the latest beauty tips and trends delivered to your inbox.</p>
          <form className="luxe-newsletter-form" onSubmit={(e) => e.preventDefault()}>
            <input type="email" placeholder="Your email address" required />
            <button type="submit" className="luxe-btn luxe-btn-secondary luxe-btn-lg">Subscribe</button>
          </form>
        </div>
      </section>
    </>
  );
}
