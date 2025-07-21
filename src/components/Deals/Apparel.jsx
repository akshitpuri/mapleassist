import React from 'react';
import DealCategoryTemplate from './DealCategoryTemplate';

export default function Apparel() {
  const apparelDeals = [
    {
      name: 'Pantie Packs',
      description: '10 for $16 (Save 20%) — limited time offer.',
      link: 'https://www.gianttiger.com/en/category/womens-underwear',
      tags: ['women', 'underwear', 'bundle']
    },
    {
      name: 'Patagonia Nano Puff Jacket',
      description: 'Save 30% — now $208.99 on Patagonia.ca.',
      link: 'https://www.patagonia.ca',
      tags: ['men', 'Patagonia', 'outerwear']
    },
    {
      name: 'SoftMoc OOriginal Sport Sandals',
      description: 'Men’s sandals — Save 50%.',
      link: 'https://www.softmoc.com',
      tags: ['men', 'shoes', 'SoftMoc']
    },
    {
      name: 'Adidas Canada Extra 25% Off',
      description: 'Limited time sitewide savings online.',
      link: 'https://www.adidas.ca',
      tags: ['adidas', 'sale', 'apparel']
    },
    {
      name: 'ECCO Street Tray Slip-Ons',
      description: 'Women’s tan slip-ons — $9.99 (Save 67%).',
      link: 'https://wellwise.ca',
      tags: ['women', 'ECCO', 'shoes']
    },
    {
      name: 'Marimekko Crocs Sandal',
      description: 'Classic sandals — $34.99 (Save 50%).',
      link: 'https://www.crocs.ca',
      tags: ['Crocs', 'summer', 'footwear']
    },
    {
      name: 'Adidas Cloudfoam Pure',
      description: 'Women’s shoes — $36.',
      link: 'https://www.adidas.ca',
      tags: ['adidas', 'women', 'shoes']
    },
    {
      name: 'Maison Birks Jewellery Sale',
      description: '18K gold pieces discounted online.',
      link: 'https://www.maisonbirks.com',
      tags: ['Birks', 'jewellery', 'women']
    },
    {
      name: 'New Balance CT302 Athletic Shoes',
      description: 'Blue Oasis / White — $49.98 (YMMV at Journeys).',
      link: 'https://www.journeys.ca',
      tags: ['Journeys', 'NewBalance', 'shoes']
    },
    {
      name: 'Adidas Corporate BBQ Event',
      description: '50% Off Store Day in Vaughan, ON — free BBQ, kids’ games, July 19.',
      link: 'https://www.adidas.ca',
      tags: ['event', 'adidas', 'family']
    },
    {
      name: 'Simons Designer Sale',
      description: 'Up to 70% off designer apparel.',
      link: 'https://www.simons.ca',
      tags: ['Simons', 'sale', 'designer']
    },
    {
      name: 'Amex × Uniqlo Offer',
      description: 'Spend $50, get $10 back — YMMV.',
      link: 'https://www.amex.ca/en-ca/benefits/offers',
      tags: ['Amex', 'Uniqlo', 'cashback']
    },
    {
      name: 'CE’ CERDR Men’s Workout Shorts',
      description: '5-pack quick-dry — $39.32 (Save 40%).',
      link: 'https://www.amazon.ca/dp/B0896MRZ74',
      tags: ['men', 'shorts', 'Amazon']
    },
    {
      name: 'Costco Clothing Promo',
      description: 'Spend $75 on clothing, save $20.',
      link: 'https://www.costco.ca',
      tags: ['Costco', 'apparel', 'discount']
    },
    {
      name: 'Reebok Floatzig 1 Running Shoes',
      description: 'Men’s & women’s — $99.99 (Save 43%).',
      link: 'https://www.reebok.ca',
      tags: ['Reebok', 'shoes', 'running']
    },
    {
      name: 'Under Armour Outlet Promo',
      description: 'Extra 50% off + 10% Rakuten cashback.',
      link: 'https://www.underarmour.ca',
      tags: ['UnderArmour', 'cashback', 'Rakuten']
    },
    {
      name: 'Serengeti Sunglasses at Costco',
      description: '$40 off various styles — $100–$110 after discount.',
      link: 'https://www.costco.ca',
      tags: ['Costco', 'sunglasses']
    },
    {
      name: 'Adidas Terry Fox Runners',
      description: '45th Anniversary special edition — July 3 launch.',
      link: 'https://www.adidas.ca',
      tags: ['adidas', 'men', 'shoes']
    },
    {
      name: 'Saucony Women’s Socks',
      description: 'Performance heel tab — 8 pairs for $13.86 (Save 40%).',
      link: 'https://www.amazon.ca/dp/B07PGBFQSD',
      tags: ['Saucony', 'socks', 'women']
    },
    {
      name: 'Casio Men’s MDV106 Watch',
      description: '$59.99 — classic diver style (40% off).',
      link: 'https://www.amazon.ca/dp/B009KYJAJY',
      tags: ['Amazon', 'watch', 'men']
    },
    {
      name: 'Tilley Hats + Rakuten',
      description: '20% off at Tilley.com + 10% Rakuten cashback.',
      link: 'https://www.tilley.com',
      tags: ['Tilley', 'Rakuten', 'apparel']
    },
    {
      name: 'Outdoor Research Sale',
      description: '60% off 260+ items + 15% email signup bonus.',
      link: 'https://www.outdoorresearch.com',
      tags: ['OutdoorResearch', 'clearance']
    },
    {
      name: 'Amazon Women’s Flip-Flops',
      description: 'Price drop — $25.64–$26.99 (Save 48%).',
      link: 'https://www.amazon.ca',
      tags: ['women', 'shoes', 'Amazon']
    },
    {
      name: 'Old Navy Online Event',
      description: '50% off everything — next 34 hours only.',
      link: 'https://oldnavy.gapcanada.ca',
      tags: ['OldNavy', 'clearance']
    },
    {
      name: 'Triangle Rewards CT Money Bonus',
      description: '$30 bonus CT Money on $200+ online spend (July 8–9).',
      link: 'https://triangle.canadiantire.ca',
      tags: ['CanadianTire', 'rewards']
    },
    {
      name: 'Casio F91 Watches',
      description: 'Various resin styles — $24 (warm deal).',
      link: 'https://www.amazon.ca',
      tags: ['Casio', 'watch']
    },
    {
      name: 'KITS Eyewear Offer',
      description: 'Get 50% off designer frames.',
      link: 'https://www.kits.com',
      tags: ['eyewear', 'KITS', 'sale']
    },
    {
      name: 'Skims Fits Everybody Sale',
      description: '30% off sitewide — limited time.',
      link: 'https://skims.com',
      tags: ['Skims', 'sale', 'intimates']
    },
    {
      name: 'Kirkland Men’s Shorts at Costco',
      description: '$9.99 in-store — social media exclusive.',
      link: 'https://www.costco.ca',
      tags: ['Kirkland', 'shorts', 'men']
    },
    {
      name: 'Montelle Intimates — Miel Sports Bras',
      description: 'Special pricing on comfy bras for women.',
      link: 'https://montelleintimates.com',
      tags: ['intimates', 'Montelle', 'women']
    }
  ];

  const seoTagline =
    'From performance socks to luxury outerwear — explore limited-time fashion, footwear and accessories promos across Canada.';
  const seoIntro =
    'MapleDeals rounds up the week’s best apparel discounts — from Patagonia puff jackets and Kirkland shorts to designer eyewear, Rakuten stackable savings, and brand outlet events. Style smart, spend less.';

  return (
    <DealCategoryTemplate
      title="Apparel & Accessories"
      emoji="🧥"
      tagline={seoTagline}
      deals={apparelDeals}
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