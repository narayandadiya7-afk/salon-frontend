'use client';

import React from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import styles from './blog-post.module.css';

const posts = [
  { id: '1', title: 'Summer Hair Care: Essential Tips for Healthy, Glowing Hair', content: 'Summer is here, and while we love the sunshine, our hair often bears the brunt of UV rays, humidity, and heat styling. Here are our top tips for keeping your hair healthy and beautiful all season long.\n\nFirst, invest in a good UV protectant spray for your hair. Just like your skin, your hair needs protection from the sun\'s harmful rays. Look for products with SPF protection specifically formulated for hair.\n\nSecond, adjust your washing routine. In summer, you might be tempted to wash your hair more frequently, but this can strip natural oils. Try using a dry shampoo between washes to absorb excess oil.\n\nThird, deep condition regularly. The combination of sun, salt water, and chlorine can leave hair dry and brittle. A weekly deep conditioning treatment will help restore moisture and maintain shine.', category: 'Hair Care', date: 'Jun 28, 2026', author: 'Priya Sharma', image: 'https://images.unsplash.com/photo-1562322140-8baeececf3df?w=800&q=80', readTime: '5 min read', tags: ['Hair Care', 'Summer', 'Beauty Tips'] },
  { id: '2', title: 'The Complete Guide to Bridal Beauty: Hair, Makeup & Skincare', content: 'Your wedding day is one of the most photographed days of your life, and you deserve to look and feel absolutely radiant. In this comprehensive guide, we walk you through everything you need to know about bridal beauty.\n\nStart your skincare routine at least 3 months before the wedding. Consistency is key. Regular facials, a good home skincare routine, and staying hydrated will ensure your skin is glowing on the big day.\n\nSchedule your bridal makeup trial 4-6 weeks before the wedding. Bring photos of looks you love, and don\'t be afraid to speak up about what you like or don\'t like. The trial is the time to experiment.\n\nFor your hair, consider the style that will complement your dress and veil. A trial run with your hairstylist is essential to ensure everything stays in place throughout the day.', category: 'Bridal', date: 'Jun 25, 2026', author: 'Sophia D\'Souza', image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=800&q=80', readTime: '8 min read', tags: ['Bridal', 'Wedding', 'Makeup', 'Hair'] },
  { id: '3', title: 'Skincare Routine: Why Professional Facials Matter', content: 'While a good home skincare routine is essential, professional facials offer benefits that you simply cannot achieve at home. Here is why incorporating regular facials into your beauty regimen is worth it.\n\nProfessional estheticians have the training and tools to properly analyze your skin and recommend treatments tailored to your specific concerns. They can perform extractions safely and effectively, something that is difficult to do at home without causing damage.\n\nMedical-grade products used in professional facials contain higher concentrations of active ingredients than over-the-counter products. This means more visible results in less time.\n\nRegular monthly facials help maintain skin health, prevent issues before they start, and give your complexion a radiant boost that no amount of at-home products can replicate.', category: 'Skin Care', date: 'Jun 20, 2026', author: 'Ananya Patel', image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=800&q=80', readTime: '6 min read', tags: ['Skincare', 'Facials', 'Beauty'] },
];

const related = [
  { id: '4', title: '5 Nail Art Trends Taking Over This Season', image: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?w=400&q=80' },
  { id: '5', title: 'Beard Grooming 101: A Complete Guide', image: 'https://images.unsplash.com/photo-1503951914875-452cb67b3cbe?w=400&q=80' },
  { id: '6', title: 'The Benefits of Keratin Treatments', image: 'https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?w=400&q=80' },
];

export default function BlogPostPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params?.slug as string;
  const post = posts.find((p) => p.id === params?.id);

  if (!post) {
    return (
      <div className="luxe-404">
        <div className="luxe-404-code">404</div>
        <h1 className="luxe-404-title">Post Not Found</h1>
        <p className="luxe-404-desc">The blog post you are looking for does not exist or has been removed.</p>
        <Link href={`/${slug}/blog`} className="luxe-btn luxe-btn-primary luxe-btn-lg">Back to Blog</Link>
      </div>
    );
  }

  return (
    <>
      <article>
        <section className={`luxe-hero ${styles.heroSection}`}>
          <div className="luxe-hero-bg"><img src={post.image} alt={post.title} /></div>
          <div className="luxe-hero-overlay" />
          <div className="luxe-hero-content">
            <div className="animate-fade-in-up delay-1">
              <span className="luxe-hero-tagline">{post.category}</span>
            </div>
            <h1 className={`luxe-hero-title animate-fade-in-up delay-2 ${styles.heroTitle}`}>{post.title}</h1>
            <div className={`animate-fade-in-up delay-3 ${styles.metaRow}`}>
              <span>{post.author}</span>
              <span>{post.date}</span>
              <span>{post.readTime}</span>
            </div>
          </div>
        </section>

        <section className="luxe-section">
          <div className="luxe-container-sm">
            {post.content.split('\n\n').map((paragraph, i) => (
              <p key={i} className={`luxe-body-text ${styles.paragraph}`}>{paragraph}</p>
            ))}

            <div className={styles.tagsRow}>
              {post.tags.map((tag) => (
                <span key={tag} className="luxe-tag luxe-tag-gold">{tag}</span>
              ))}
            </div>

            <div className={styles.authorCard}>
              <img src="https://images.unsplash.com/photo-1580618672591-eb180b1a973f?w=100&q=80" alt={post.author} className={styles.authorImage} />
              <div>
                <p className={styles.authorName}>{post.author}</p>
                <p className="luxe-caption">Professional stylist at LuxeStudio</p>
              </div>
            </div>
          </div>
        </section>
      </article>

      {/* Related Posts */}
      <section className={`luxe-section ${styles.relatedSection}`}>
        <div className="luxe-container-lg">
          <div className="luxe-section-header">
            <h2 className="luxe-section-title">Related Articles</h2>
          </div>
          <div className="luxe-grid-3">
            {related.map((r) => (
              <div key={r.id} className="luxe-blog-card" onClick={() => router.push(`/${slug}/blog/${r.id}`)}>
                <img src={r.image} alt={r.title} />
                <div className="blog-body">
                  <h3 className={`blog-title ${styles.relatedCardTitle}`}>{r.title}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
