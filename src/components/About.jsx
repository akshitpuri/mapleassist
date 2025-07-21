import React from 'react';
import BackButton from './BackButton';

export default function About() {
  return (
    <main style={container}>
      {/* 🧭 Header Row */}
      <div style={headerRow}>
        <h1 style={heading}>About MapleAssist</h1>
        <div style={backWrap}>
          <BackButton />
        </div>
      </div>

      {/* 📝 Content Sections */}
      <section style={section}>
        <p>
          <strong>MapleAssist</strong> is a curated collection of tools built with simplicity, speed, and privacy in mind. Whether you're balancing numbers, converting files, making calculations, or saving money, our platform ensures access—online or offline—without distractions or signups.
        </p>
        <p>
          We believe productivity tools should be quiet, fast, and respectful. MapleAssist is designed to stay out of your way while helping you move forward.
        </p>
      </section>

      <section style={section}>
        <h2 style={subheading}>Calculators That Work Smarter</h2>
        <p>
          From health metrics and grade averages to finance and logic tools, our calculators are tailored for clarity. Every interaction is optimized to be usable, fast-loading, and precise—no formulas required.
        </p>
      </section>

      <section style={section}>
        <h2 style={subheading}>File Utilities Without the Fuss</h2>
        <p>
          Rename files, compress folders, and convert formats effortlessly within your browser. MapleForge operates fully offline, respecting your time and bandwidth.
        </p>
      </section>

      <section style={section}>
        <h2 style={subheading}>Canada’s Weekly Deal Finder</h2>
        <p>
          We’ve added a full suite of curated savings pages for Canadian shoppers—sorted by category and updated weekly. From flyers and cashback offers to food freebies and phone plans, MapleDeals highlights verified promotions across major brands. It’s privacy-first, no login required.
        </p>
      </section>

      <section style={section}>
        <h2 style={subheading}>Why We Build</h2>
        <p>
          Our goal is to deliver over 150 tools that serve a broad spectrum of everyday tasks. We value minimalism, security, and usefulness. MapleAssist isn’t trying to be everything—it’s trying to be exactly what you need.
        </p>
      </section>

      <section style={section}>
        <h2 style={subheading}>Cross-Platform Access</h2>
        <p>
          MapleAssist runs on Windows, macOS, Android, and iOS—straight from your browser. Whether you're at a desk or on the go, your tools are ready when you are.
        </p>
      </section>

      <section style={section}>
        <h2 style={subheading}>Contact & Support</h2>
        <p>
          For feedback, support, or partnership inquiries, reach us anytime at <strong>support@mapleassist.com</strong>.
        </p>
      </section>
    </main>
  );
}

// 🎨 Styles
const container = {
  padding: '40px 24px',
  maxWidth: '800px',
  margin: '0 auto',
  fontFamily: 'Segoe UI, sans-serif',
  color: '#2c2c2c',
  fontSize: '1.05rem',
  lineHeight: '1.7'
};

const headerRow = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: '32px',
  gap: '16px',
  flexWrap: 'wrap'
};

const heading = {
  fontSize: '2.4rem',
  fontWeight: '700',
  margin: 0,
  color: '#2c2c2c'
};

const backWrap = {
  display: 'flex',
  alignItems: 'center'
};

const subheading = {
  fontSize: '1.3rem',
  fontWeight: '600',
  marginBottom: '12px',
  color: '#b22222'
};

const section = {
  marginBottom: '36px'
};