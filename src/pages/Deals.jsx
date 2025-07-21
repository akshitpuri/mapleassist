import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';

export default function Deals() {
  const allDeals = [
    { name: 'Groceries 🛒', path: '/deals/groceries', description: 'Weekly flyers, coupons, and cashback offers on essentials.' },
    { name: 'Automotive 🚗', path: '/deals/automotive', description: 'Oil changes, tire rebates, car wash bundles and more.' },
    { name: 'Cell Phones & Plans 📱', path: '/deals/mobile', description: 'Discounted plans, student bundles and unlocked devices.' },
    { name: 'Restaurants 🍽️', path: '/deals/restaurants', description: 'BOGO meals, student specials, delivery app rewards.' },
    { name: 'Apparel 👕', path: '/deals/apparel', description: 'Fashion sales, seasonal deals, and loyalty discounts.' },
    { name: 'Kids & Babies 🧸', path: '/deals/kids', description: 'Toys, baby gear, kids’ clothing and school supplies.' },
    { name: 'Beauty & Wellness 💅', path: '/deals/wellness', description: 'Skincare, gym promos, spa packages and supplements.' },
    { name: 'Computers & Electronics 💻', path: '/deals/electronics', description: 'Laptop sales, accessories, software bundles.' },
    { name: 'Financial Services 💳', path: '/deals/finance', description: 'Bank offers, credit card rewards, budgeting tools.' },
    { name: 'Travel ✈️', path: '/deals/travel', description: 'Flight discounts, rail passes, vacation packages and more.' }
  ];

  return (
    <div style={outerWrap}>
      <Helmet>
        <title>MapleAssist | Featured Deals & Discounts</title>
        <meta name="description" content="Explore verified Canadian deals across groceries, electronics, travel, and more." />
      </Helmet>

      <main style={container}>
        {/* 🎁 Hero Section */}
        <section style={hero}>
          <h1 style={heroTitle}>MapleDeals</h1>
          <p style={heroSubtitle}>
            Browse real savings across top categories. All deals are hand-picked for Canadian users—no fluff, just value.
          </p>
          <div style={buttonGroup}>
            <Link to="/flyers" style={secondaryBtn}>🗓 View Weekly Flyers</Link>
            <Link to="/" style={primaryBtn}>Back to Home</Link>
            
          </div>
        </section>

        {/* 🧭 Category Grid */}
        <section style={gridWrap}>
          <h2 style={sectionHeading}>Browse Deal Categories</h2>
          <div style={grid}>
            {allDeals.map(({ name, path, description }) => (
              <Link key={path} to={path} style={card}>
                <h3 style={cardTitle}>{name}</h3>
                <p style={cardDesc}>{description}</p>
              </Link>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

// 🧼 Styles (unchanged from your original version, just reused)
const outerWrap = { backgroundImage: `url(${process.env.PUBLIC_URL}/maple-pattern.png)`, backgroundRepeat: 'repeat', backgroundSize: 'auto', backgroundPosition: 'top left', backgroundColor: '#f7f9fb', minHeight: '100vh', width: '100%', padding: '0 0 60px' };
const container = { maxWidth: '1100px', margin: '0 auto', padding: '0 24px', fontFamily: '"Segoe UI", system-ui, sans-serif', color: '#2c2c2c' };
const hero = { textAlign: 'center', padding: '80px 32px', marginBottom: '0', color: '#2b2b2b' };
const heroTitle = { fontSize: '2.6rem', fontWeight: 700, marginBottom: '16px' };
const heroSubtitle = { fontSize: '1.15rem', maxWidth: '680px', margin: '0 auto 32px', color: '#555', lineHeight: '1.6' };
const buttonGroup = { display: 'flex', justifyContent: 'center', gap: '16px', flexWrap: 'wrap', marginTop: '24px' };
const primaryBtn = { fontSize: '1rem', padding: '12px 28px', backgroundColor: '#2b2b2b', color: '#fff', textDecoration: 'none', borderRadius: '6px', fontWeight: 500 };
const secondaryBtn = { fontSize: '1rem', padding: '12px 28px', backgroundColor: '#d4e1f5', color: '#1a3a5d', textDecoration: 'none', borderRadius: '6px', fontWeight: 500 };
const gridWrap = { backgroundColor: '#fff', padding: '48px 32px', borderRadius: '12px', boxShadow: '0 2px 10px rgba(0,0,0,0.04)', marginTop: '40px' };
const sectionHeading = { fontSize: '1.6rem', fontWeight: 600, marginBottom: '28px', textAlign: 'center' };
const grid = { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '28px' };
const card = { backgroundColor: '#fafafa', border: '1px solid #ddd', borderRadius: '10px', padding: '20px', textDecoration: 'none', color: '#2c2c2c', boxShadow: '0 2px 6px rgba(0,0,0,0.03)', transition: 'box-shadow 0.2s ease-in-out' };
const cardTitle = { fontSize: '1.15rem', fontWeight: 600, marginBottom: '8px' };
const cardDesc = { fontSize: '0.95rem', color: '#555', lineHeight: '1.5' };