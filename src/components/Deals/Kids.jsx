import React from 'react';
import DealCategoryTemplate from './DealCategoryTemplate';

export default function Kids() {
  const kidsDeals = [
    {
      name: 'Crinkle Cloth Books',
      description: 'Baby Farm or Forest cloth books — 0–6 months — $11.99.',
      link: 'https://www.amazon.ca',
      tags: ['baby', 'books']
    },
    {
      name: 'LEGO F1 Race Cars',
      description: 'Collectible 71049 set — $5.00 at Dollarama.',
      link: 'https://www.dollarama.com',
      tags: ['LEGO', 'Dollarama', 'toys']
    },
    {
      name: 'Indigo Summer of Fun',
      description: 'Kids’ in-store summer events — ends in 4 days.',
      link: 'https://www.indigo.ca',
      tags: ['Indigo', 'event', 'kids']
    },
    {
      name: 'Funko Pop! Superman Krypto',
      description: '2025 limited figure — $6.99 on Amazon.ca.',
      link: 'https://www.amazon.ca',
      tags: ['Funko', 'DC', 'toys']
    },
    {
      name: 'Canada Computers Toy Savings',
      description: 'Select toys discounted up to $100 off.',
      link: 'https://www.canadacomputers.com',
      tags: ['CanadaComputers', 'toys']
    },
    {
      name: 'Crayola Crayons 24-pack',
      description: 'Just $1 — Save 49% at Walmart.',
      link: 'https://www.walmart.ca',
      tags: ['Walmart', 'crayons', 'school']
    },
    {
      name: 'Graco Extend2Fit Convertible',
      description: 'Car seat for 4–65 lbs — $262.98 (Save $150) at Walmart.',
      link: 'https://www.walmart.ca',
      tags: ['Graco', 'carseat', 'Walmart']
    },
    {
      name: 'Home Depot Kids Build Workshop',
      description: 'Space Odyssey build event — Aug 9, 2025 (register online).',
      link: 'https://www.homedepot.ca',
      tags: ['event', 'kids', 'HomeDepot']
    },
    {
      name: 'Oxford Baby Dressers',
      description: 'Babies R Us — Save 50% (YMMV) — $224.97.',
      link: 'https://www.babiesrus.ca',
      tags: ['furniture', 'BabiesRUs']
    },
    {
      name: 'Staples 3-Ring Binder',
      description: 'Economy 1" black binder — $1.99 (Save 69%).',
      link: 'https://www.staples.ca',
      tags: ['school', 'Staples', 'supplies']
    },
    {
      name: 'Thule Coaster XT Trailer',
      description: '2-seat bike trailer + stroller — $299.99 (Save 40%).',
      link: 'https://www.amazon.ca',
      tags: ['Thule', 'bike', 'stroller']
    },
    {
      name: 'Picasso Tiles ATL Sets',
      description: '100-piece magnetic tiles — $42 (ATL) at Amazon.',
      link: 'https://www.amazon.ca',
      tags: ['PicassoTiles', 'STEM', 'toys']
    },
    {
      name: 'LEGO Millennium Falcon 25th Ed.',
      description: '$67.81 — 38% off collectible model on Amazon.ca.',
      link: 'https://www.amazon.ca',
      tags: ['LEGO', 'StarWars', 'toys']
    },
    {
      name: 'Harmony Highback Booster',
      description: 'Elite Dreamtime booster seat — $64.99 at Best Buy.',
      link: 'https://www.bestbuy.ca',
      tags: ['booster', 'BestBuy', 'Graco']
    },
    {
      name: 'Huggies Box at SDM Streetsville',
      description: '$20 — multiple variants available (YMMV).',
      link: 'https://www.shoppersdrugmart.ca',
      tags: ['SDM', 'Huggies', 'baby']
    },
    {
      name: 'SERVD Game (Family Edition)',
      description: 'Board/card hybrid — $19.99 (ATL).',
      link: 'https://www.amazon.ca',
      tags: ['games', 'SERVD', 'family']
    },
    {
      name: 'Graco Extend2fit 2in1 Car Seat',
      description: 'Amazon Prime Day — $263 • Two colors available.',
      link: 'https://www.amazon.ca',
      tags: ['Graco', 'carseat', 'Amazon']
    },
    {
      name: 'Playmobil Kits',
      description: '50% off online — July 1–14.',
      link: 'https://www.playmobil.ca',
      tags: ['Playmobil', 'toys']
    },
    {
      name: 'Graco 4Ever All-in-One (USA)',
      description: '4-in-1 car seat — Save 32% via Amazon.com.',
      link: 'https://www.amazon.com',
      tags: ['Graco', 'carseat', 'Amazon']
    },
    {
      name: 'Amazon Echo Dot Kids',
      description: 'Voice assistant with kid mode — available online.',
      link: 'https://www.amazon.ca',
      tags: ['EchoDot', 'smart', 'kids']
    },
    {
      name: 'LEGO Arc Dragon of Focus',
      description: 'Set #71836 — $79.99 at London Drugs.',
      link: 'https://www.londondrugs.com',
      tags: ['LEGO', 'dragon', 'LondonDrugs']
    },
    {
      name: 'Nestlé Baby Formula',
      description: 'Good Start Plus 1 (15 x 250ml) — $28.40 w/ Subscribe & Save.',
      link: 'https://www.amazon.ca',
      tags: ['Nestle', 'formula', 'baby']
    },
    {
      name: 'Coco Village Balance Board',
      description: 'Natural board — Save 69% — $30 at Mastermind Toys.',
      link: 'https://www.mastermindtoys.com',
      tags: ['CocoVillage', 'toys', 'balance']
    },
    {
      name: '7 Wonders Duel Board Game',
      description: '$20.95 — Save 25% at Amazon.ca.',
      link: 'https://www.amazon.ca',
      tags: ['boardgame', '7Wonders']
    },
    {
      name: 'Azul Board Games',
      description: 'Azul Queen’s Garden $33.59 • Azul Mini $18.72.',
      link: 'https://www.amazon.ca',
      tags: ['Azul', 'boardgame', 'family']
    },
    {
      name: 'Koenigsegg Jesko LEGO Hypercar',
      description: 'Technic set — $47.48 (Save 27%) on Amazon.ca.',
      link: 'https://www.amazon.ca',
      tags: ['LEGO', 'Koenigsegg', 'Technic']
    },
    {
      name: 'Eufy S1 Breast Pumps',
      description: 'S1 and S1 Pro — $189.99 / $289.99 (Amazon.ca).',
      link: 'https://www.amazon.ca',
      tags: ['Eufy', 'baby', 'breastpump']
    },
    {
      name: 'Graco Tranzitions Booster Seat',
      description: '3-in-1 harness booster — $149 on Amazon.ca (Save 43%).',
      link: 'https://www.amazon.ca',
      tags: ['Graco', 'booster', 'baby']
    },
    {
      name: 'Hilroy Exercise Book 4-pack',
      description: 'Canada stitched notebooks — $0.79 (Save 70%) at Staples.',
      link: 'https://www.staples.ca',
      tags: ['Hilroy', 'school', 'Staples']
    }
  ];

  const seoTagline =
    'Explore deals for kids, babies, and families — toys, car seats, books, school supplies, and more.';
  const seoIntro =
    'From educational games and ride-alongs to nursing accessories and kids’ clothing, MapleDeals collects verified offers every week. Whether you’re prepping a nursery or stocking school gear, discover what’s discounted today.';

  return (
    <DealCategoryTemplate
      title="Kids & Babies"
      emoji="🧒"
      tagline={seoTagline}
      deals={kidsDeals}
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