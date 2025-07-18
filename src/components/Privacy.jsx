import React from 'react';
import BackButton from './BackButton';

export default function Privacy() {
  return (
    <main style={container}>
      {/* 📜 Header Row with Title + BackButton */}
      <div style={headerRow}>
        <h1 style={heading}>Privacy Policy</h1>
        <div style={backWrap}>
          <BackButton />
        </div>
      </div>

      {/* 🔐 Privacy Sections */}
      <section style={section}>
        <h2 style={subheading}>1. Privacy First</h2>
        <p>
          At <strong>MapleAssist</strong>, your privacy is foundational. No login, no accounts, no personal details required. All tools are built to respect your autonomy.
        </p>
      </section>

      <section style={section}>
        <h2 style={subheading}>2. Local-Only Operation</h2>
        <p>
          All processing happens directly in your browser. We do not track usage, collect identifiers, or transmit information. What you do stays entirely yours.
        </p>
      </section>

      <section style={section}>
        <h2 style={subheading}>3. Offline Support</h2>
        <p>
          MapleAssist is engineered for disconnected environments. Whether you’re traveling, offline, or conserving bandwidth, most tools remain accessible and secure.
        </p>
      </section>

      <section style={section}>
        <h2 style={subheading}>4. Zero Tracking</h2>
        <p>
          No analytics. No cookies. No third-party libraries. No marketing scripts. MapleAssist runs clean, quiet, and private.
        </p>
      </section>

      <section style={section}>
        <h2 style={subheading}>5. External Resources</h2>
        <p>
          Links to other websites may be present. We encourage users to review the privacy practices of third parties independently.
        </p>
      </section>

      <section style={section}>
        <h2 style={subheading}>6. Policy Updates</h2>
        <p>
          We may revise this policy periodically. Any changes will be reflected here. Continued use indicates agreement with the latest version.
        </p>
      </section>

      <section style={section}>
        <h2 style={subheading}>7. Contact</h2>
        <p>
          For inquiries or feedback, reach us anytime at <strong>support@mapleassist.com</strong>.
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
  fontFamily: '"Segoe UI", system-ui, sans-serif',
  fontSize: '1.05rem',
  color: '#2c2c2c',
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