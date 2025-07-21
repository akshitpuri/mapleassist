import React from 'react';
import DealCategoryTemplate from './DealCategoryTemplate';

export default function Electronics() {
  const electronicsDeals = [
    {
      name: 'Anycubic PETG Filament Bundle',
      description: '6 spools for the price of 5 — $67.07.',
      link: 'https://www.anycubic.com',
      tags: ['3DPrinting', 'filament', 'Anycubic']
    },
    {
      name: 'INIU 65W Power Bank',
      description: '20000mAh portable charger — $30.63 (Save 45%).',
      link: 'https://www.amazon.ca',
      tags: ['powerbank', 'charger', 'INIU']
    },
    {
      name: 'LG Ultragear OLED 240Hz',
      description: '45GX90SA 45-inch monitor — $1549.70.',
      link: 'https://www.amazon.ca',
      tags: ['monitor', 'LG', 'OLED']
    },
    {
      name: 'INIU 45W Mini Power Bank',
      description: '10000mAh w/ USB-C — $21.99.',
      link: 'https://www.amazon.ca',
      tags: ['powerbank', 'INIU', 'portable']
    },
    {
      name: 'TP-Link USB-C Ethernet Adapter',
      description: '2.5GbE adapter — $18.69 (Save 24%).',
      link: 'https://www.amazon.ca',
      tags: ['adapter', 'TPLink', 'network']
    },
    {
      name: 'Corsair RM750e PSU',
      description: 'Modular 750W GOLD — $99.97 (Save $60) — Staples.',
      link: 'https://www.staples.ca',
      tags: ['Corsair', 'PSU']
    },
    {
      name: 'Sunlu PLA & PLA+ Filament',
      description: '$13.82–$15.20/kg — various colors.',
      link: 'https://www.amazon.ca',
      tags: ['Sunlu', 'PLA', '3DPrinting']
    },
    {
      name: 'GIGABYTE RTX 5080 GAMING OC',
      description: 'AI 16GB graphics card — $1399.88.',
      link: 'https://www.canadacomputers.com',
      tags: ['GPU', 'GIGABYTE', 'RTX']
    },
    {
      name: 'Open Ear Bluetooth Headphones',
      description: 'Bluetooth 5.4 — $29.99.',
      link: 'https://www.amazon.ca',
      tags: ['audio', 'Bluetooth']
    },
    {
      name: 'ESR MagSafe Charger Stand',
      description: '2-in-1 wireless charger — $27.99 (Save 50%).',
      link: 'https://www.amazon.ca',
      tags: ['ESR', 'MagSafe', 'charger']
    },
    {
      name: 'TCL 65" QM851G QLED TV',
      description: '4K Mini LED — $998 at Costco (ATL).',
      link: 'https://www.costco.ca',
      tags: ['TCL', 'TV', 'QLED']
    },
    {
      name: 'ASUS ROG Harpe Wireless Mouse',
      description: 'Aim Lab Edition — $79.99 (Save 64%).',
      link: 'https://www.canadacomputers.com',
      tags: ['ASUS', 'mouse', 'gaming']
    },
    {
      name: 'Apple Back to School 2025',
      description: 'Buy Mac/iPad/iMac — get free AirPods or accessory.',
      link: 'https://www.apple.com/ca',
      tags: ['Apple', 'promo', 'student']
    },
    {
      name: 'WD_BLACK SN7100 SSD 4TB',
      description: '$280 when buying 2 • +5% cashback.',
      link: 'https://www.amazon.ca',
      tags: ['SSD', 'WD_BLACK', 'storage']
    },
    {
      name: 'MSI RTX 5070 TI Ventus',
      description: '3X OC card — $1099.',
      link: 'https://www.amazon.ca',
      tags: ['MSI', 'GPU']
    },
    {
      name: 'DJI Osmo Action 4 Combo',
      description: 'Save 29% — now $299 on Amazon.ca.',
      link: 'https://www.amazon.ca',
      tags: ['DJI', 'camera', 'action']
    },
    {
      name: 'Steam Bioprototype Free Game',
      description: 'Cross-platform indie game — free until July 20.',
      link: 'https://store.steampowered.com',
      tags: ['Steam', 'game', 'free']
    },
    {
      name: 'Pioneer Elite VSX-LX305 Receiver',
      description: '9.2 Channel 8K UHD AV — $999.99 (Save $700).',
      link: 'https://www.bestbuy.ca',
      tags: ['Pioneer', 'AVReceiver', 'HomeTheatre']
    },
    {
      name: 'Nintendo Little Nightmares II',
      description: 'Digital ATL — $3.99 (Save 90%).',
      link: 'https://www.nintendo.com',
      tags: ['Nintendo', 'game']
    },
    {
      name: 'Rogers 5G Home Internet',
      description: 'Ontario only — $25/month for 500GB — no contract.',
      link: 'https://www.rogers.com',
      tags: ['Rogers', 'homeinternet']
    },
    {
      name: 'Rogers Satellite Beta',
      description: 'Free 500MB and satellite texting (limited users).',
      link: 'https://www.rogers.com',
      tags: ['Rogers', 'satellite']
    }
  ];

  const seoTagline =
    'Latest deals on electronics, tech accessories, gaming gear, home theatre, and connectivity tools — updated weekly.';
  const seoIntro =
    'Find value across gadgets and gear — from 3D printers and chargers to 240Hz OLEDs, MagSafe docks, headphones, and GPUs. Whether you’re upgrading your setup or building a rig, MapleDeals has the verified tech to back you.';

  return (
    <DealCategoryTemplate
      title="Electronics & Tech"
      emoji="💻"
      tagline={seoTagline}
      deals={electronicsDeals}
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