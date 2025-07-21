import React from 'react';
import DealCategoryTemplate from './DealCategoryTemplate';

export default function Travel() {
  const travelDeals = [
    {
      name: "Canada's Wonderland Season Pass 2026",
      description: "Unlimited visits to the park for the entire 2026 season.",
      link: 'https://www.canadaswonderland.com',
      tags: ['Wonderland', 'seasonpass']
    },
    {
      name: 'Travelpro Platinum Elite Luggage',
      description: '29" checked spinner — $504 (Save 30%).',
      link: 'https://www.amazon.ca',
      tags: ['luggage', 'Travelpro']
    },
    {
      name: 'Cathay Pacific Asia Flights',
      description: 'Toronto/Vancouver to Asia via Hong Kong — $1000–$1400 round trip (Aug–Nov).',
      link: 'https://www.cathaypacific.com',
      tags: ['Cathay', 'Asia']
    },
    {
      name: 'Flexiroam Mastercard eSIM',
      description: 'Free 5-day 1GB global data for select Mastercard holders.',
      link: 'https://www.flexiroam.com',
      tags: ['Flexiroam', 'eSIM']
    },
    {
      name: 'Celebrity Cruises at Par',
      description: 'Select Caribbean itineraries priced in CAD at par.',
      link: 'https://www.celebritycruises.com/ca',
      tags: ['Cruise', 'Caribbean']
    },
    {
      name: 'Amex × Expedia Hotel Credit',
      description: 'Get 10% back on hotel bookings — up to $100 credit. Ends July 28.',
      link: 'https://www.americanexpress.ca',
      tags: ['Amex', 'Expedia', 'hotel']
    },
    {
      name: 'Gry Mattr 20" Duffle Bag',
      description: 'Save $90 — navy color at Staples.',
      link: 'https://www.staples.ca',
      tags: ['Staples', 'duffle']
    },
    {
      name: 'GigSky Visa eSIM Offer',
      description: '1GB or 2GB free eSIM for Infinite and Infinite Privilege Visa holders.',
      link: 'https://www.gigsky.com',
      tags: ['GigSky', 'eSIM']
    },
    {
      name: 'Airalo eSIM Discount',
      description: '25% off all Airalo plans.',
      link: 'https://www.airalo.com',
      tags: ['Airalo', 'eSIM']
    },
    {
      name: 'Amex × KLM Flight Credit',
      description: 'Spend $1,000 — earn $100 credit. Ends Aug 20.',
      link: 'https://www.americanexpress.ca',
      tags: ['Amex', 'KLM']
    },
    {
      name: 'Cathay Pacific Premium Economy',
      description: 'Toronto to Hong Kong — $2,300 round trip.',
      link: 'https://www.cathaypacific.com',
      tags: ['Cathay', 'premium']
    },
    {
      name: 'Toronto–Seattle Nonstop',
      description: '$297 roundtrip (including taxes).',
      link: 'https://www.google.com/flights',
      tags: ['Seattle', 'deal']
    },
    {
      name: 'Calgary–Paris WestJet',
      description: '$524 CAD roundtrip incl. taxes.',
      link: 'https://www.westjet.com',
      tags: ['WestJet', 'Paris']
    },
    {
      name: 'Mega Bus Summer Sale',
      description: 'Discounted fares on select routes throughout summer.',
      link: 'https://ca.megabus.com',
      tags: ['Megabus', 'bus']
    },
    {
      name: 'Amex × EVA Air Credit',
      description: 'Spend $1,100 and earn $165 credit.',
      link: 'https://www.americanexpress.ca',
      tags: ['Amex', 'EVA']
    },
    {
      name: 'Canada Strong Pass (Summer)',
      description: 'Kids travel free, 25% off for ages 18–24 on VIA Rail (Jun 15–Sep 2).',
      link: 'https://www.viarail.ca/en/canada-pass',
      tags: ['VIA', 'StrongPass']
    },
    {
      name: 'China Airlines Members Day',
      description: 'Up to 20% off tickets — limited-time promo.',
      link: 'https://www.china-airlines.com',
      tags: ['ChinaAirlines', 'promo']
    },
    {
      name: 'Aeroplan Points Bonus',
      description: 'Up to 100% bonus on Aeroplan point purchases — YMMV.',
      link: 'https://www.aircanada.com/aeroplan',
      tags: ['Aeroplan', 'points']
    },
    {
      name: '407 ETR Rush Hour Promo',
      description: 'Free rush hour tolls July 1 – Sept 30 (YMMV).',
      link: 'https://www.407etr.com',
      tags: ['407ETR', 'road']
    },
    {
      name: 'GO Transit Weekend Pass',
      description: '$10 unlimited travel — Niagara Falls & Barrie service included.',
      link: 'https://www.gotransit.com',
      tags: ['GOTransit', 'weekend']
    },
    {
      name: 'Samsonite Centric 2 Set',
      description: 'CO/MD spinner set — $207.50 (Save 50%).',
      link: 'https://www.amazon.ca',
      tags: ['Samsonite', 'luggage']
    },
    {
      name: 'Vancouver to Singapore (Air Canada)',
      description: '$770–$820 CAD roundtrip incl. taxes.',
      link: 'https://www.aircanada.com',
      tags: ['Singapore', 'AirCanada']
    },
    {
      name: 'Vancouver to Costa Rica (WestJet)',
      description: '$389–$481 CAD roundtrip incl. taxes.',
      link: 'https://www.westjet.com',
      tags: ['CostaRica', 'WestJet']
    },
    {
      name: 'South Asia Flights (Cathay via HKG)',
      description: '$1100–$1200 RT from Toronto — Sept 2025.',
      link: 'https://www.cathaypacific.com',
      tags: ['SouthAsia', 'Cathay']
    },
    {
      name: 'Viporter Venture Offer',
      description: 'Get Viporter Venture tier until Dec 31 for 410 Air Miles.',
      link: 'https://www.airmiles.ca',
      tags: ['Viporter', 'AirMiles']
    },
    {
      name: 'Casino Rama Free Bus',
      description: 'Complimentary shuttle from GTA cities to Casino Rama.',
      link: 'https://www.casinorama.com',
      tags: ['Casino', 'bus']
    },
    {
      name: 'Blue LEGO Luggage Set',
      description: 'Expandable trolley + backpack — $119.99 (Costco online).',
      link: 'https://www.costco.ca',
      tags: ['LEGO', 'luggage']
    },
    {
      name: 'YYZ to Sydney (Delta)',
      description: '$868 return via Delta Airlines (Aug–Sept).',
      link: 'https://www.delta.com',
      tags: ['Sydney', 'Delta']
    },
    {
      name: 'Air Canada × Porter $500 GC',
      description: 'E-Gift Card for $449.99 (Costco) — non-refundable.',
      link: 'https://www.costco.ca',
      tags: ['AirCanada', 'giftcard', 'Porter']
    }
  ];

  const seoTagline =
    'Pack lighter and fly smarter — explore seasonal travel deals, luggage promos, free transit perks and discounted flights.';
  const seoIntro =
    'Whether it’s eSIMs, Caribbean cruises, VIA rail discounts, or international getaways to Asia, Costa Rica and Paris — MapleDeals compiles travel offers to help Canadians move freely and affordably.';

  return (
    <DealCategoryTemplate
      title="Travel & Transit"
      emoji="✈️"
      tagline={seoTagline}
      deals={travelDeals}
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