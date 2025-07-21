import React from 'react';
import DealCategoryTemplate from './DealCategoryTemplate';

export default function Finance() {
  const financeDeals = [
    {
      name: 'RBC iPad / MacBook Offer',
      description: 'Deposit $50,000 with RBC to receive a free iPad or MacBook.',
      link: 'https://www.rbc.com',
      tags: ['RBC', 'device', 'deposit']
    },
    {
      name: 'BMO Savings Amplifier',
      description: 'Open account before July 31 — earn 4.75% interest until October 31.',
      link: 'https://www.bmo.com',
      tags: ['BMO', 'savings']
    },
    {
      name: 'BMO Air Miles World Elite',
      description: '$225 rebate + 3,000 miles bonus + $200 gas credit.',
      link: 'https://www.creditcardgenius.ca',
      tags: ['BMO', 'AirMiles', 'creditcard']
    },
    {
      name: 'Webull Deposit Bonus',
      description: 'Up to $10k tiered bonus + 2% rate + referral promo.',
      link: 'https://www.webull.ca',
      tags: ['Webull', 'investing']
    },
    {
      name: 'Air Miles Shop the Block',
      description: 'Earn 100–500 bonus miles July 25 – Aug 8.',
      link: 'https://www.airmiles.ca',
      tags: ['AirMiles', 'bonus']
    },
    {
      name: 'TD Easy Trade $100',
      description: 'Hold $500 for 181 days — both new & existing clients.',
      link: 'https://www.td.com',
      tags: ['TD', 'investing']
    },
    {
      name: 'Chexy Aeroplan Promo',
      description: '10k Aeroplan points for bill payments — new users. 4k for existing.',
      link: 'https://www.chexy.com',
      tags: ['Aeroplan', 'Chexy']
    },
    {
      name: 'Amex Cobalt to Gold Upgrade',
      description: 'Up to 90,000 MR points — YMMV for existing customers.',
      link: 'https://www.americanexpress.ca',
      tags: ['Amex', 'upgrade']
    },
    {
      name: 'Scotiabank Gold Amex Offer',
      description: '$150 rebate + 50,000 Scene+ points — FYF — $650 value.',
      link: 'https://www.scotiabank.com',
      tags: ['Scotiabank', 'Scene+', 'Amex']
    },
    {
      name: 'CIBC Aventura Card Offer',
      description: 'Up to 60k points + FYF — $3,000–$5,000 spend required.',
      link: 'https://www.cibc.com',
      tags: ['CIBC', 'Aventura']
    },
    {
      name: 'CIBC Smart Account Deal',
      description: '$450+ cash + $100 Skip gift card — no fee for first year.',
      link: 'https://www.cibc.com',
      tags: ['CIBC', 'banking']
    },
    {
      name: 'TD Chequing Account Bonus',
      description: 'Get up to $700 back — open before Oct 1.',
      link: 'https://www.td.com',
      tags: ['TD', 'chequing']
    },
    {
      name: 'Amex Shop Small Promo',
      description: 'Spend $25, get $5 back — 5x redemption (ends soon).',
      link: 'https://www.americanexpress.ca',
      tags: ['Amex', 'ShopSmall']
    },
    {
      name: 'RBC Leo’s Young Savers',
      description: 'Kids (0–12) get $25 bonus for opening no-fee account.',
      link: 'https://www.rbc.com',
      tags: ['RBC', 'youth']
    },
    {
      name: 'RBC Student Account',
      description: 'Free AirPods 4 when you open RBC Zero Fee Student Account.',
      link: 'https://www.rbc.com',
      tags: ['RBC', 'student']
    },
    {
      name: 'Amex Gold Referral Bonus',
      description: '20,000 MR points via referral — YMMV.',
      link: 'https://www.americanexpress.ca',
      tags: ['Amex', 'Gold']
    },
    {
      name: 'Scotiabank $600 Offer',
      description: 'Get up to $600 with new Ultimate/Preferred Chequing + Investment Account.',
      link: 'https://www.scotiabank.com',
      tags: ['Scotiabank', 'banking']
    },
    {
      name: 'Tangerine RRSP/TFSA Transfer',
      description: '2% bonus for moving your RRSP or TFSA.',
      link: 'https://www.tangerine.ca',
      tags: ['Tangerine', 'RRSP']
    },
    {
      name: 'CT Triangle Credit Card',
      description: 'New users — get $150 in CT Money (July 1–31).',
      link: 'https://www.canadiantire.ca/en/credit.html',
      tags: ['CanadianTire', 'Triangle']
    },
    {
      name: 'Amex Travel Redemption Bonus',
      description: 'Get 30% points back on travel redemptions — July 7 to Aug 24.',
      link: 'https://www.americanexpress.ca',
      tags: ['Amex', 'travel']
    },
    {
      name: 'Meridian + Aviso PAD Offer',
      description: 'Set up $250/month for 3 months — get $250 back.',
      link: 'https://www.meridiancu.ca',
      tags: ['Meridian', 'PAD']
    },
    {
      name: 'Amex Cobalt Additional Card Bonus',
      description: 'Earn 7,500 MR points for adding a second card.',
      link: 'https://www.americanexpress.ca',
      tags: ['Amex', 'Cobalt']
    },
    {
      name: 'Gift Cards Deal Roundup',
      description: 'Ongoing discounts at various retailers — expires 2025.',
      link: 'https://www.retailmenot.ca',
      tags: ['giftcard', 'multi-retailer']
    }
  ];

  const seoTagline =
    'Claim bonuses, earn rewards and unlock banking perks — updated financial promotions across Canadian banks & cards.';
  const seoIntro =
    'Explore weekly promotions from RBC, TD, CIBC, BMO, Amex and more. Whether you’re opening a new account, applying for a card, or switching banks, MapleDeals rounds up verified offers with the clearest terms and biggest returns.';

  return (
    <DealCategoryTemplate
      title="Finance & Banking"
      emoji="💰"
      tagline={seoTagline}
      deals={financeDeals}
    >
      <p style={introStyle}>{seoIntro}</p>
    </DealCategoryTemplate>
  );
}

const introStyle = {
  fontSize: '1rem',
  lineHeight: '1.6',
  color: '#4a4a4a',
  maxWidth: '680px',
  margin: '0 auto 32px',
  textAlign: 'center'
};