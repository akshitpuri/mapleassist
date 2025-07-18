import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import BackButton from '../../BackButton';

const financeTools = [
  {
    name: 'Auto Loan Calculator',
    path: '/calculators/finance/auto-loan',
    description: 'Estimate monthly payments and total cost for vehicle loans.',
    icon: '🚗'
  },
  {
    name: 'Loan Calculator',
    path: '/calculators/finance/loan',
    description: 'Calculate EMI and interest breakdown on personal or home loans.',
    icon: '💳'
  },
  {
    name: 'Salary Calculator',
    path: '/calculators/finance/salary',
    description: 'Convert annual to monthly salary and estimate take-home pay.',
    icon: '📄'
  },
  {
    name: 'Amortization Calculator',
    path: '/calculators/finance/amortization',
    description: 'Visualize how your loan gets paid off over time with interest.',
    icon: '📉'
  },
  {
    name: 'Investment Calculator',
    path: '/calculators/finance/investment',
    description: 'Forecast investment returns based on time, rate, and contribution.',
    icon: '📈'
  },
  {
    name: 'Simple Interest',
    path: '/calculators/finance/simple-interest',
    icon: '💰',
    description: 'Quickly calculate interest on a loan or investment using the simple formula.'
  },
  {
    name: 'Compound Interest',
    path: '/calculators/finance/compound-interest',
    icon: '📈',
    description: 'Visualize money growth with compound interest over time.'
  },
  {
    name: 'Financial',
    path: '/calculators/finance/financial',
    icon: '🧮',
    description: 'Compute FV, PV, PMT, interest rate, and periods with financial math.'
  },
  {
    name: 'Payment',
    path: '/calculators/finance/payment',
    icon: '🗓️',
    description: 'Determine loan payments or time to repay based on terms.'
  },
  {
    name: 'Sales Tax',
    path: '/calculators/finance/sales-tax',
    icon: '🏷️',
    description: 'Calculate total cost including sales tax across regions.'
  },
  {
    name: 'Interest',
    path: '/calculators/finance/interest',
    icon: '🔍',
    description: 'Compute final balances and interest accumulation schedules.'
  },
  {
    name: 'Tip',
    path: '/calculators/finance/tip',
    icon: '🍽️',
    description: 'Know how much to tip and split bills fairly with a group.'
  },
  {
    name: 'Interest Rate',
    path: '/calculators/finance/interest-rate',
    icon: '📊',
    description: 'Estimate loan interest rate based on monthly payment and term.'
  },
  {
    name: 'Mortgage',
    path: '/calculators/finance/mortgage',
    icon: '🏡',
    description: 'Estimate your monthly mortgage payment and total cost.'
  },
  {
    name: 'Personal Loan',
    path: '/calculators/finance/personal-loan',
    icon: '👤',
    description: 'Compute monthly payments and APR for personal loans.'
  },
  {
    name: 'Future Value',
    path: '/calculators/finance/future-value',
    icon: '📈',
    description: 'Find how much your investment will grow over time.'
  },
  {
    name: 'Mortgage Payment',
    path: '/calculators/finance/mortgage-payment',
    icon: '🏠',
    description: 'Plan for bi-weekly payments, early payoffs, or additional payments.'
  },
  {
    name: 'APR',
    path: '/calculators/finance/apr',
    icon: '📉',
    description: 'Calculate the annual percentage rate (APR) of any loan.'
  },
  {
    name: 'ROI',
    path: '/calculators/finance/roi',
    icon: '📦',
    description: 'Measure your return on investment and annualized ROI.'
  },
  {
    name: 'Business Loan',
    path: '/calculators/finance/business-loan',
    icon: '🏢',
    description: 'Estimate payments and total cost for business loans.'
  },
  {
    name: 'Margin',
    path: '/calculators/finance/margin',
    icon: '🧾',
    description: 'Calculate profit margins and markup percentages for sales.'
  },
  {
    name: '401K',
    path: '/calculators/finance/401k',
    icon: '💼',
    description: 'Project your 401K retirement savings growth over time.'
  },
  {
    name: 'Car Loan',
    path: '/calculators/finance/car-loan',
    icon: '🚘',
    description: 'Calculate monthly payments and total cost of an auto loan.'
  },
  {
    name: 'Rental Property',
    path: '/calculators/finance/rental-property',
    icon: '🏘️',
    description: 'Analyze rental ROI and investment comparisons.'
  },
  {
    name: 'Retirement',
    path: '/calculators/finance/retirement',
    icon: '🎯',
    description: 'Plan retirement savings and future income goals.'
  },
  {
    name: 'Present Value',
    path: '/calculators/finance/present-value',
    icon: '⏳',
    description: 'Calculate the current worth of future investments or returns.'
  },
  {
    name: 'Refinance',
    path: '/calculators/finance/refinance',
    icon: '🔁',
    description: 'Compare refinance options and calculate savings potential.'
  },
  {
    name: 'FHA Loan',
    path: '/calculators/finance/fha-loan',
    icon: '🏘️',
    description: 'Estimate payments, interest, and total costs for FHA loans.'
  },
  {
    name: 'Annuity',
    path: '/calculators/finance/annuity',
    icon: '🎁',
    description: 'Calculate annuity values and growth over retirement years.'
  },
  {
    name: 'Simple Investment',
    path: '/calculators/finance/simple-investment',
    icon: '📉',
    description: 'Use basic formulas to project investment returns.'
  },
  {
    name: 'Credit Card Payoff',
    path: '/calculators/finance/credit-card-payoff',
    icon: '💳',
    description: 'Estimate payments and time needed to pay off your credit cards.'
  },
  {
    name: 'CD',
    path: '/calculators/finance/cd',
    icon: '🏦',
    description: 'Calculate interest earned from certificates of deposit.'
  },
  {
    name: 'Home Loan',
    path: '/calculators/finance/home-loan',
    icon: '🏡',
    description: 'Calculate mortgage payments for fixed and adjustable-rate home loans.'
  },
  {
    name: 'EMI',
    path: '/calculators/finance/emi',
    icon: '📅',
    description: 'Calculate equated monthly installments and total loan cost.'
  },
  {
    name: 'SIP',
    path: '/calculators/finance/sip',
    icon: '📥',
    description: 'Project growth from systematic investment plans (SIPs).'
  }

];

export default function FinanceHome() {
  const [query, setQuery] = useState('');
  const inputRef = useRef(null);
  const isMobile = typeof window !== 'undefined' && window.innerWidth <= 640;

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const filteredTools = financeTools.filter(tool =>
    tool.name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <main style={container}>
      <div style={wrapper}>
        {/* 🧭 Header */}
        <div style={{
          ...header,
          flexDirection: isMobile ? 'column' : 'row',
          justifyContent: isMobile ? 'center' : 'space-between',
          textAlign: isMobile ? 'center' : 'left'
        }}>
          <h1 style={{
            ...heading,
            textAlign: isMobile ? 'center' : 'left'
          }}>
            Finance Calculators
          </h1>
          <div style={{
            ...backWrap,
            justifyContent: isMobile ? 'center' : 'flex-end',
            width: isMobile ? '100%' : 'auto'
          }}>
            <BackButton />
          </div>
        </div>

        {/* 🧭 Introduction */}
        <section style={intro}>
          <p style={introText}>
            MapleAssist offers a streamlined suite of finance calculators designed to support accurate decision-making across personal and professional scenarios. From budgeting and loan planning to long-term growth projections, every tool runs securely offline—fast, intuitive, and free from distractions.
          </p>
          <ul style={featureList}>
            <li>📊 EMI, ROI, SIP & APR estimators for real-time financial modeling</li>
            <li>💼 Investment, retirement, and net worth planners</li>
            <li>🔒 Privacy-first interface with zero tracking or cloud dependencies</li>
          </ul>
        </section>

        {/* 🔍 Search */}
        <div style={searchWrap}>
          <input
            ref={inputRef}
            type="text"
            placeholder="Search financial tools..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            style={searchInput}
          />
        </div>

        {/* 🧮 Cards */}
        <section style={grid}>
          {filteredTools.map(({ name, icon, description, path }, i) => (
            <Link key={i} to={path} style={card}>
              <div style={cardIcon}>{icon}</div>
              <h3 style={cardTitle}>{name}</h3>
              <p style={cardDesc}>{description}</p>
            </Link>
          ))}

          {filteredTools.length === 0 && (
            <p style={noMatch}>No matching calculators found.</p>
          )}
        </section>
      </div>
    </main>
  );
}


// 🎨 Styles
const container = {
  backgroundColor: '#f7f9fb',
  minHeight: '100vh',
  padding: '40px 20px',
  display: 'flex',
  justifyContent: 'center'
};

const wrapper = {
  width: '100%',
  maxWidth: '1100px'
};

const header = {
  display: 'flex',
  alignItems: 'center',
  flexWrap: 'wrap',
  gap: '12px',
  marginBottom: '32px',
  width: '100%'
};

const heading = {
  fontSize: '2rem',
  fontWeight: 700,
  color: '#2c2c2c',
  margin: 0
};

const backWrap = {
  display: 'flex',
  flex: '0 1 auto'
};

const intro = {
  marginBottom: '36px',
  color: '#4a4a4a',
  fontSize: '1rem',
  lineHeight: '1.6'
};

const introText = {
  marginBottom: '16px'
};

const featureList = {
  paddingLeft: '20px',
  marginBottom: '16px',
  fontSize: '0.95rem',
  color: '#555',
  lineHeight: '1.6'
};

const searchWrap = {
  textAlign: 'center',
  marginBottom: '40px'
};

const searchInput = {
  padding: '10px 14px',
  fontSize: '1rem',
  borderRadius: '8px',
  border: '1px solid #ccc',
  width: '100%',
  maxWidth: '400px'
};

const grid = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
  gap: '28px',
  marginBottom: '60px'
};

const card = {
  backgroundColor: '#fff',
  padding: '20px',
  borderRadius: '12px',
  boxShadow: '0 1px 6px rgba(0,0,0,0.08)',
  textDecoration: 'none',
  color: '#2c2c2c',
  display: 'flex',
  flexDirection: 'column',
  gap: '10px',
  transition: 'transform 0.2s ease-in-out'
};

const cardIcon = {
  fontSize: '1.8rem'
};

const cardTitle = {
  fontSize: '1.15rem',
  fontWeight: 600
};

const cardDesc = {
  fontSize: '0.95rem',
  color: '#555',
  lineHeight: '1.5'
};

const noMatch = {
  textAlign: 'center',
  fontSize: '1rem',
  color: '#888',
  gridColumn: '1 / -1'
};