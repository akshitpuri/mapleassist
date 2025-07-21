import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function Header() {
  const location = useLocation();
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <header style={headerStyle}>
      <div style={brandRow}>
        <h1 style={titleStyle}>MapleAssist</h1>
      </div>

      {isMobile ? (
        <div style={{ position: 'relative' }}>
          <button onClick={() => setMenuOpen(prev => !prev)} style={toggleButton}>
            Menu ▾
          </button>
          {menuOpen && (
            <div style={dropdownMenu}>
              {navLinks.map(link => (
                <Link
                  key={link.path}
                  to={link.path}
                  style={getLinkStyle(location.pathname, link.path)}
                  onClick={() => setMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          )}
        </div>
      ) : (
        <nav style={navRowStyle}>
          {navLinks.map(link => (
            <Link
              key={link.path}
              to={link.path}
              style={getLinkStyle(location.pathname, link.path)}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}

const navLinks = [
  { path: '/', label: 'Home' },
  { path: '/deals', label: 'MapleDeals' },
  { path: '/calculators', label: 'MapleCalc' },
  { path: '/filetools', label: 'MapleForge' },
  { path: '/about', label: 'About' },
  { path: '/terms', label: 'Terms' },
  { path: '/privacy', label: 'Privacy' }
];

const getLinkStyle = (currentPath, targetPath) => ({
  textDecoration: 'none',
  color: currentPath === targetPath ? '#2c2c2c' : '#444',
  fontWeight: currentPath === targetPath ? '600' : '400',
  borderBottom: currentPath === targetPath ? '2px solid #2c2c2c' : 'none',
  padding: '6px 10px',
  display: 'block',
  transition: 'color 0.3s ease, border-bottom 0.3s ease'
});

const headerStyle = {
  padding: '20px 24px',
  backgroundColor: '#f7f7f7',
  color: '#2c2c2c',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  flexWrap: 'wrap',
  position: 'sticky',
  top: 0,
  zIndex: 999,
  borderBottom: '1px solid #ddd'
};

const titleStyle = {
  fontSize: '2rem',
  fontWeight: '700',
  fontFamily: '"Segoe UI", system-ui, sans-serif',
  margin: 0,
  color: '#2c2c2c'
};

const brandRow = {
  display: 'flex',
  alignItems: 'center',
  gap: '12px'
};

const navRowStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '18px',
  flexWrap: 'wrap'
};

const toggleButton = {
  backgroundColor: '#e0e0e0',
  color: '#333',
  border: 'none',
  borderRadius: '6px',
  padding: '6px 12px',
  fontSize: '1rem',
  cursor: 'pointer'
};

const dropdownMenu = {
  position: 'absolute',
  right: 0,
  top: '100%',
  backgroundColor: '#ffffff',
  boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
  padding: '12px',
  borderRadius: '8px',
  zIndex: 1000,
  display: 'flex',
  flexDirection: 'column',
  gap: '8px'
};