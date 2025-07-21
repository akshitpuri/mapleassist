import React from 'react';
import DealCategoryTemplate from './DealCategoryTemplate';

export default function Groceries() {
  const groceriesDeals = [
    {
      name: 'Staples BOGO Keurig Pods',
      description: 'Buy One Get One Free on Keurig K-Cup coffee pods (July 18–31).',
      link: 'https://www.staples.com/lp/bogo-kcups',
      tags: ['BOGO', 'coffee', 'expires-2025-07-31']
    },
    {
      name: 'Costco Quebec Flyer',
      description: 'Current flyer deals at Quebec Costco warehouses: Boucherville, Candiac, Sherbrooke.',
      link: 'https://www.circulars.ca/Costco/?region=QC',
      tags: ['Costco', 'Quebec', 'flyer']
    },
    {
      name: 'Amazon Tampax Pearl Multipack',
      description: 'Tampax Pearl Tampons 64ct — $16.97 on Amazon.ca.',
      link: 'https://www.amazon.ca/Tampax-Tampons-LeakGuard-Absorbency-Unscented/dp/B0BZZV3WZJ',
      tags: ['Amazon', 'health', 'tampons']
    },
    {
      name: 'Costco GTA Photo Report',
      description: 'Scarborough/GTA warehouse walkthrough with item pricing (July 21–27).',
      link: 'https://cocoeast.ca/costco-east-july-21-2025',
      tags: ['local', 'Costco', 'photo-report']
    },
    {
      name: 'Foodbasics Red Mango Case',
      description: 'Ontario flyer deal — ~$6 for ~9lb mango case (valid through July 23).',
      link: 'https://www.foodbasics.ca/flyer',
      tags: ['fruit', 'local', 'expires-2025-07-23']
    },
    {
      name: 'Costco $25 Membership Voucher',
      description: 'Enroll in auto-renewal with Mastercard to get $25 voucher — ends July 25.',
      link: 'https://www.costco.ca/auto-renew.html',
      tags: ['voucher', 'Costco', 'cashback', 'expires-2025-07-25']
    },
    {
      name: 'Loblaws PC Optimum Offers',
      description: 'Load PC Optimum points offers — valid July 17 to August 20.',
      link: 'https://www.pcoptimum.ca/load?page=MKDi',
      tags: ['points', 'Loblaws', 'expires-2025-08-20']
    },
    {
      name: 'The Beer Store – HACKER Lager',
      description: 'Save 28¢ on HACKER-PSCHORR Munich Gold Lager 500ml: $2.56.',
      link: 'https://www.thebeerstore.ca/beers/hacker-pschorr-munich-gold-lager_1-X-Can-500-ml',
      tags: ['beer', 'discount', 'imported']
    },
    {
      name: 'RCSS Cavendish Coupon Deal',
      description: 'Cavendish fries for $1–$2 after digital coupon at RCSS.',
      link: 'https://get.cavendishfarms.com/save-now/',
      tags: ['coupon', 'RCSS', 'fries']
    },
    {
      name: 'PC Optimum 10K Points Promo',
      description: 'Earn 10,000 points when you spend $20 at RCSS or Esso (ends July 22).',
      link: 'https://www.pcoptimum.ca',
      tags: ['RCSS', 'Esso', 'points', 'expires-2025-07-22']
    },
    {
      name: 'Loblaws July Hit of the Month',
      description: 'Bundle deals valid across No Frills, SDM, and RCSS — all July.',
      link: 'https://www.nofrills.ca/flyer',
      tags: ['multi-store', 'bundle', 'Loblaws']
    },
    {
      name: 'Costco UberEats 20% Off',
      description: 'Starting August 4 — get 20% off orders $120+ via UberEats.',
      link: 'https://www.ubereats.com/ca/costco-promo',
      tags: ['UberEats', 'promo', 'starts-2025-08-04']
    },
    {
      name: 'Metro Corn on the Cob Deal',
      description: '[ON] 6 fresh cobs for $1.00 — valid July 17–23.',
      link: 'https://www.metro.ca/en/flyer',
      tags: ['local', 'corn', 'expires-2025-07-23']
    },
    {
      name: 'No Frills Knorr Bouillon Cubes',
      description: 'Discounted Knorr beef bouillon cubes in flyer — limited time.',
      link: 'https://www.nofrills.ca/flyer',
      tags: ['Knorr', 'soup', 'flyer']
    }
  ];

  const seoTagline =
    'Find the best grocery deals in Canada — weekly flyers, cashback, coupons and student bundles from top retailers.';
  const seoIntro =
    'Looking for the best grocery discounts in Canada? MapleDeals brings together verified flyers, loyalty programs, cashback offers, and student bundles from top brands like Loblaws, Rakuten, Instacart, and more. Every deal is privacy-forward and updated regularly.';

  return (
    <DealCategoryTemplate
      title="Groceries"
      emoji="🛒"
      tagline={seoTagline}
      deals={groceriesDeals}
    >
      <p style={seoIntroStyle}>{seoIntro}</p>
    </DealCategoryTemplate>
  );
}

// ✨ Optional styling for intro text
const seoIntroStyle = {
  fontSize: '1rem',
  lineHeight: '1.6',
  color: '#4a4a4a',
  maxWidth: '680px',
  margin: '0 auto 32px',
  textAlign: 'center'
};