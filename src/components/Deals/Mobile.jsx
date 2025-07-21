import React from 'react';
import DealCategoryTemplate from './DealCategoryTemplate';

export default function Mobile() {
  const mobileDeals = [
    {
      name: 'Rogers RPP Roaming Plan',
      description: 'BYOD 250GB data in 65 countries — $70/month.',
      link: 'https://www.rogers.com/plans/mobile',
      tags: ['Rogers', 'roaming', 'BYOD', 'data']
    },
    {
      name: 'Samsung Galaxy Unpacked Event',
      description: 'Sign up for July 9th event and get $100 voucher — no code needed.',
      link: 'https://www.samsung.com/ca/unpacked/',
      tags: ['Samsung', 'event', 'voucher']
    },
    {
      name: 'Prime Wireless Rogers RPP',
      description: '150GB Can/US/Mex + $10/month iPhone 15 Pro Max (512GB) — in-store only.',
      link: 'https://www.primewireless.ca',
      tags: ['Rogers', 'in-store', 'bundle', 'iPhone']
    },
    {
      name: 'OnePlus 13 + Trade Credit',
      description: 'OnePlus 13 16/512GB: $1149.99 — includes trade credit and free case.',
      link: 'https://www.oneplus.com/ca',
      tags: ['OnePlus', 'trade-in', 'device']
    },
    {
      name: 'Bell Offer for Lucky Customers',
      description: '40GB for $30 / 100GB for $40 + free US calling & 1000 international minutes.',
      link: 'https://www.bell.ca/Mobility',
      tags: ['Bell', 'limited', 'international']
    },
    {
      name: 'Samsung Unpacked Pricing',
      description: 'Galaxy Z Fold 7 $2499.99, Z Flip 7 $1462.99, Watch 8 Series offers.',
      link: 'https://www.samsung.com/ca',
      tags: ['Samsung', 'foldable', 'pricing']
    },
    {
      name: 'Google Pixel 6a Compensation',
      description: 'Eligible Pixel 6a owners can claim reimbursement from Google.',
      link: 'https://support.google.com/pixelphone/answer/12160797',
      tags: ['Google', 'Pixel', 'compensation']
    },
    {
      name: 'Koodo Winback International Plan',
      description: '$20/month — 30GB + unlimited Canada calling + 1250 LD mins.',
      link: 'https://www.koodomobile.com',
      tags: ['Koodo', 'winback', 'international']
    },
    {
      name: 'Samsung Galaxy A56 5G Deal',
      description: 'Galaxy A56 5G — $649 with $100 discount code.',
      link: 'https://www.samsung.com/ca',
      tags: ['Samsung', 'discount', 'mid-range']
    },
    {
      name: 'Freedom Mobile 80GB (Edmonton)',
      description: 'Regional deal: 80GB for $39 — Edmonton only.',
      link: 'https://www.freedommobile.ca',
      tags: ['Freedom', 'regional', 'Edmonton']
    },
    {
      name: 'TSC Open Box iPhone 16 Pro',
      description: '512GB all colors — $1445.99 (open box).',
      link: 'https://www.tsc.ca',
      tags: ['iPhone', 'open-box', 'TSC']
    },
    {
      name: 'Telus EPP Fold7 Bundle',
      description: 'Z Fold 7 with $1720 credit + $480 trade bonus on S10 or newer.',
      link: 'https://www.telus.com',
      tags: ['Telus', 'trade-in', 'foldable']
    },
    {
      name: 'Telus Winback 5G+ Plan',
      description: '$35/month — 60GB unlimited Canada/US/Mex.',
      link: 'https://www.telus.com',
      tags: ['Telus', 'winback', 'data']
    },
    {
      name: 'Pixel 9 from Google',
      description: '$750 with $350 off promo — available direct.',
      link: 'https://store.google.com/ca',
      tags: ['Google', 'Pixel', 'sale']
    },
    {
      name: 'Koodo Canoo Offer',
      description: 'Free SIM + 1 month service for newcomers via Canoo App.',
      link: 'https://www.koodomobile.com',
      tags: ['Koodo', 'newcomers', 'Canoo']
    },
    {
      name: 'Rogers Winback $25/40GB',
      description: 'Winback offer — $25/month for 40GB (YMMV).',
      link: 'https://www.rogers.com/plans/mobile',
      tags: ['Rogers', 'winback', 'limited']
    },
    {
      name: 'Pixel 7a Battery Replacement Program',
      description: 'Select IMEIs eligible for replacement service.',
      link: 'https://support.google.com/pixelphone/answer/14263968',
      tags: ['Pixel', 'Google', 'battery']
    },
    {
      name: 'Virgin Winback Offers 2025',
      description: 'YMMV targeted deals for Virgin customers.',
      link: 'https://www.virginplus.ca/en/mobile/',
      tags: ['Virgin', 'winback']
    },
    {
      name: 'Samsung S25 Lineup Discounts',
      description: 'Up to $450 off on Galaxy S25 models.',
      link: 'https://www.samsung.com/ca',
      tags: ['Samsung', 'S25', 'discount']
    },
    {
      name: 'Freedom Mobile Annual Plans',
      description: '$159 for 25GB / $179 for 40GB — annual 5G+ plans.',
      link: 'https://www.freedommobile.ca',
      tags: ['Freedom', 'annual', 'plans']
    },
    {
      name: 'Samsung Galaxy A36 Deal',
      description: 'Unlocked 8GB RAM / 256GB — $449.99 on Amazon.ca.',
      link: 'https://www.amazon.ca/dp/B0CN4QY52G',
      tags: ['Samsung', 'Amazon', 'A36']
    },
    {
      name: 'Pixel 9 at Best Buy',
      description: '$200 gift card included with Pixel 9 purchase.',
      link: 'https://www.bestbuy.ca/en-ca/product/google-pixel-9/16648653',
      tags: ['Pixel', 'BestBuy', 'bonus']
    },
    {
      name: 'Koodo Winback $20/40GB + Credits',
      description: '$20 for 40GB + bill credits + no activation fees.',
      link: 'https://www.koodomobile.com',
      tags: ['Koodo', 'winback', 'credits']
    }
  ];

  const seoTagline =
    'Explore exclusive phone deals, winback promos, and mobile plans across Canada — from flagship devices to budget carriers.';
  const seoIntro =
    'Stay connected with top mobile deals updated weekly. From Rogers roaming plans and Telus trade-in bonuses to Freedom Mobile annual bundles and Pixel discounts — MapleDeals helps you compare, activate, and save with confidence.';

  return (
    <DealCategoryTemplate
      title="Mobile Plans & Phones"
      emoji="📱"
      tagline={seoTagline}
      deals={mobileDeals}
    >
      <p style={seoIntroStyle}>{seoIntro}</p>
    </DealCategoryTemplate>
  );
}

const seoIntroStyle = {
  fontSize: '1rem',
  lineHeight: '1.6',
  color: '#4a4a4a',
  maxWidth: '680px',
  margin: '0 auto 32px',
  textAlign: 'center'
};