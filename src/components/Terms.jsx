import React from 'react';
import BackButton from './BackButton';

export default function Terms() {
  return (
    <main style={container}>
      {/* 🧾 Header Row: Title + BackButton */}
      <div style={headerRow}>
        <h1 style={heading}>Terms of Use</h1>
        <div style={backWrap}>
          <BackButton />
        </div>
      </div>

      <section style={section}>
        <h2 style={subheading}>1. Acceptance of Terms</h2>
        <p>
          By accessing or using MapleAssist, you agree to these Terms of Use. If you do not agree, please discontinue use of the platform.
        </p>
      </section>

      <section style={section}>
        <h2 style={subheading}>2. Scope of Services</h2>
        <p>
          MapleAssist provides calculators, file utilities, and productivity tools that function without accounts, installations, or internet access.
        </p>
      </section>

      <section style={section}>
        <h2 style={subheading}>3. User Responsibility</h2>
        <p>
          You agree to use MapleAssist lawfully and respectfully. Abuse, unauthorized redistribution, or disruption of service is prohibited.
        </p>
      </section>

      <section style={section}>
        <h2 style={subheading}>4. Privacy & Data</h2>
        <p>
          We do not collect personal information. No login is required. View our&nbsp;
          <a href="/privacy" style={linkStyle}>Privacy Policy</a> for details.
        </p>
      </section>

      <section style={section}>
        <h2 style={subheading}>5. Intellectual Property</h2>
        <p>
          Unless otherwise stated, all content and code are owned by MapleAssist. Reuse, replication, or modification without consent is not permitted.
        </p>
      </section>

      <section style={section}>
        <h2 style={subheading}>6. Limitation of Liability</h2>
        <p>
          Use of MapleAssist is at your own discretion. We are not liable for direct or indirect damages resulting from tool usage.
        </p>
      </section>

      <section style={section}>
        <h2 style={subheading}>7. Amendments</h2>
        <p>
          These terms may be updated periodically. Continued use of the platform constitutes acceptance of any changes.
        </p>
      </section>

      <section style={section}>
        <h2 style={subheading}>8. Contact</h2>
        <p>
          Questions or concerns? Email us anytime at <strong>support@mapleassist.com</strong>.
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

const linkStyle = {
  color: '#b22222',
  textDecoration: 'underline'
};