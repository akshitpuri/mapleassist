import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';

export default function DealCategoryTemplate({ title, emoji, tagline, bannerUrl, deals }) {
  const [query, setQuery] = useState('');
  const [sortKey, setSortKey] = useState('default');
  const [activeTag, setActiveTag] = useState('');
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const allTags = Array.from(new Set(deals.flatMap(d => d.tags || [])));

  const getWeekRange = () => {
    const today = new Date();
    const monday = new Date(today.setDate(today.getDate() - today.getDay() + 1));
    const sunday = new Date(monday);
    sunday.setDate(monday.getDate() + 6);
    const options = { month: 'short', day: 'numeric' };
    return `${monday.toLocaleDateString('en-CA', options)} – ${sunday.toLocaleDateString('en-CA', options)}`;
  };

  const filteredDeals = deals.filter(d =>
    (d.name + d.description).toLowerCase().includes(query.toLowerCase()) &&
    (activeTag ? d.tags?.includes(activeTag) : true)
  );

  const sortedDeals = [...filteredDeals].sort((a, b) => {
    if (sortKey === 'az') return a.name.localeCompare(b.name);
    if (sortKey === 'za') return b.name.localeCompare(a.name);
    return 0;
  });

  return (
    <div style={outerWrap}>
      <Helmet>
        <title>MapleDeals | Verified {title} Offers</title>
        <meta name="description" content={`Verified deals for ${title.toLowerCase()} shoppers in Canada.`} />
      </Helmet>

      <main style={container}>
        {/* 🧭 Header */}
        <div style={headerRow(isMobile)}>
          <h1 style={heroTitle(isMobile)}>{emoji} {title}</h1>
          <Link to="/deals" style={backBtn(isMobile)}>← Back to Deals</Link>
        </div>

        {/* 📣 Tagline + Week */}
        <div style={taglineWrap}>
          <p style={taglineText}>{tagline}</p>
          <p style={weekInfo}>This week: {getWeekRange()}</p>
        </div>

        {bannerUrl && <img src={bannerUrl} alt={`${title} banner`} style={bannerImage} />}

        {/* 🔎 Filters */}
        <div style={filterBar}>
          <input
            type="text"
            placeholder="Search deals…"
            value={query}
            onChange={e => setQuery(e.target.value)}
            style={inputStyle}
          />
          <select
            value={sortKey}
            onChange={e => setSortKey(e.target.value)}
            style={inputStyle}
          >
            <option value="default">Sort By</option>
            <option value="az">A → Z</option>
            <option value="za">Z → A</option>
          </select>

          {allTags.length > 0 && (
            <select
              value={activeTag}
              onChange={e => setActiveTag(e.target.value)}
              style={inputStyle}
            >
              <option value="">Filter by tag</option>
              {allTags.map(tag => (
                <option key={tag} value={tag}>{tag.toUpperCase()}</option>
              ))}
            </select>
          )}
        </div>

        {/* 📋 List Layout */}
        <section style={dealListWrap}>
          <h2 style={sectionHeading}>
            Verified Offers <span style={verifiedTick}>✅</span>
          </h2>
          <ul style={dealList}>
            {sortedDeals.map((item, i) => (
              <li key={i} style={dealItem}>
                <h3 style={dealTitle}>{item.name}</h3>
                <p style={dealDesc}>{item.description}</p>
                {item.tags?.length > 0 && (
                  <div style={tagWrap}>
                    {item.tags.map((tag, idx) => (
                      <span key={idx} style={tagBadge}>{tag.toUpperCase()}</span>
                    ))}
                  </div>
                )}
                <div style={dealFooter}>
                  {item.link && (
                    <a href={item.link} target="_blank" rel="noopener noreferrer" style={dealLink}>
                      View {item.name} Offer
                    </a>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </section>
      </main>
    </div>
  );
}

// 🎨 Styles
const outerWrap = {
  backgroundImage: `url(${process.env.PUBLIC_URL}/maple-pattern.png)`,
  backgroundRepeat: 'repeat',
  backgroundSize: 'auto',
  backgroundPosition: 'top left',
  backgroundColor: '#f7f9fb',
  minHeight: '100vh',
  width: '100%',
  paddingBottom: '60px',
  fontFamily: '"Segoe UI", system-ui, sans-serif',
  color: '#2c2c2c'
};

const container = {
  maxWidth: '1100px',
  margin: '0 auto',
  padding: '0 24px'
};

const headerRow = isMobile => ({
  display: 'flex',
  flexDirection: isMobile ? 'column' : 'row',
  justifyContent: isMobile ? 'center' : 'space-between',
  alignItems: 'center',
  gap: '12px',
  paddingTop: '64px',
  marginBottom: '8px'
});

const heroTitle = isMobile => ({
  fontSize: '2.4rem',
  fontWeight: 700,
  margin: 0,
  textAlign: isMobile ? 'center' : 'left'
});

const backBtn = isMobile => ({
  fontSize: '1rem',
  padding: '10px 24px',
  backgroundColor: '#2b2b2b',
  color: '#fff',
  textDecoration: 'none',
  borderRadius: '6px',
  fontWeight: 500,
  alignSelf: isMobile ? 'center' : 'flex-end'
});

const taglineWrap = {
  textAlign: 'center',
  margin: '16px auto 24px',
  maxWidth: '680px'
};

const taglineText = {
  fontSize: '1.1rem',
  color: '#5c2e00',
  lineHeight: '1.6',
  marginBottom: '8px'
};

const weekInfo = {
  fontSize: '0.95rem',
  color: '#777'
};

const bannerImage = {
  maxWidth: '100%',
  borderRadius: '12px',
  marginBottom: '32px'
};

const filterBar = {
  display: 'flex',
  gap: '12px',
  justifyContent: 'center',
  alignItems: 'center',
  flexWrap: 'wrap',
  marginBottom: '24px'
};

const inputStyle = {
  padding: '10px 14px',
  fontSize: '1rem',
  borderRadius: '6px',
  border: '1px solid #ccc',
  minWidth: '260px',
  maxWidth: '280px',
  height: '42px',
  boxSizing: 'border-box'
};

const sectionHeading = {
  fontSize: '1.5rem',
  fontWeight: 600,
  marginBottom: '32px',
  textAlign: 'center',
  color: '#2c2c2c'
};

const verifiedTick = {
  fontSize: '1.2rem',
  marginLeft: '6px'
};

const dealListWrap = {
  backgroundColor: '#ffffff',
  padding: '48px 32px',
  borderRadius: '12px',
  boxShadow: '0 2px 10px rgba(0,0,0,0.04)',
  marginTop: '24px'
};

const dealList = {
  listStyle: 'none',
  padding: 0,
  margin: 0,
  display: 'flex',
  flexDirection: 'column',
  gap: '32px'
};

const dealItem = {
  border: '1px solid #ddd',
  borderRadius: '12px',
  padding: '24px',
  backgroundColor: '#fefefe',
  boxShadow: '0 1px 4px rgba(0,0,0,0.03)',
  display: 'flex',
  flexDirection: 'column',
  gap: '12px'
};

const dealTitle = {
  fontSize: '1.2rem',
  fontWeight: 600,
  marginBottom: '8px'
};

const dealDesc = {
  fontSize: '0.95rem',
  color: '#555',
  lineHeight: '1.5',
  marginBottom: '12px'
};

const tagWrap = {
  marginTop: '12px',
  display: 'flex',
  gap: '8px',
  flexWrap: 'wrap'
};

const tagBadge = {
  backgroundColor: '#eee',
  color: '#333',
  fontSize: '0.75rem',
  padding: '4px 10px',
  borderRadius: '14px',
  fontWeight: 500
};

const dealFooter = {
  marginTop: '16px'
};

const dealLink = {
  fontSize: '0.95rem',
  color: '#1a3a5d',
  fontWeight: 500,
  textDecoration: 'none',
  display: 'inline-block'
};
