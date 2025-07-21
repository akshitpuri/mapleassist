import React from 'react';
import DealCategoryTemplate from './DealCategoryTemplate';

export default function Wellness() {
  const wellnessDeals = [
    {
      name: 'Olay Age Defying Body Wash',
      description: 'Vitamin E enriched — $2.50 (Reg. $9.97).',
      link: 'https://www.amazon.ca',
      tags: ['Olay', 'bodywash']
    },
    {
      name: '3M Micropore Medical Tape',
      description: '6-roll pack — $4.77.',
      link: 'https://www.amazon.ca',
      tags: ['3M', 'medical', 'Amazon']
    },
    {
      name: 'Endy Mattress + Sleep Set',
      description: 'Save $640 + get limited edition sleep bundle.',
      link: 'https://www.endy.com',
      tags: ['Endy', 'sleep', 'bundle']
    },
    {
      name: 'Wahl Ladies Trimmer',
      description: 'Clean & Smooth lithium-ion — $19.97 at Costco (clearance).',
      link: 'https://www.costco.ca',
      tags: ['Wahl', 'grooming', 'Costco']
    },
    {
      name: 'Braun PowerCase',
      description: 'Series 8/9 shaver case — $44.99 at London Drugs.',
      link: 'https://www.londondrugs.com',
      tags: ['Braun', 'shaver']
    },
    {
      name: 'Panasonic ESLV67 Shaver',
      description: 'High-end foil shaver — $175.',
      link: 'https://www.amazon.ca',
      tags: ['Panasonic', 'shaver']
    },
    {
      name: 'Reactine Allergy Gel Pills',
      description: '40 ct — $21.18 (Save 42%).',
      link: 'https://www.amazon.ca',
      tags: ['Reactine', 'allergy']
    },
    {
      name: 'LANEIGE Lip Sleeping Mask',
      description: 'Berry flavor — $22.75 (Save 30%).',
      link: 'https://www.amazon.ca',
      tags: ['LANEIGE', 'skincare']
    },
    {
      name: 'Crest 3D Whitestrips',
      description: '22 treatments — $40.59 (Save 40%).',
      link: 'https://www.amazon.ca',
      tags: ['Crest', 'teeth']
    },
    {
      name: 'Sports Research Collagen Powder',
      description: 'Unflavored 82 servings — $56.67 (Save 45%).',
      link: 'https://www.amazon.ca',
      tags: ['collagen', 'SportsResearch']
    },
    {
      name: 'Armani Beauty Cologne',
      description: 'Stronger With You Intensely — 50ml for $101.25.',
      link: 'https://www.amazon.com',
      tags: ['Armani', 'fragrance']
    },
    {
      name: 'SUBI Greens Superfood',
      description: 'Daily greens powder — Save 29%.',
      link: 'https://www.amazon.ca',
      tags: ['SUBI', 'greens']
    },
    {
      name: 'Panasonic Beard Trimmer ERGB42K',
      description: 'Save 44% — $50.34 (Reg. $89.99).',
      link: 'https://www.amazon.ca',
      tags: ['Panasonic', 'trimmer']
    },
    {
      name: 'Oral-B Brush Heads',
      description: '6-pack Sensitive Gum Care — $33.24 with Subscribe & Save.',
      link: 'https://www.amazon.ca',
      tags: ['OralB', 'brush']
    },
    {
      name: 'Oral-B Pro 5000X Twin Pack',
      description: 'Electric toothbrushes — $69.97 at Costco.',
      link: 'https://www.costco.ca',
      tags: ['OralB', 'toothbrush']
    },
    {
      name: 'Braun Clean & Renew Refill Pack',
      description: 'CCR 6-pack — $28.49 Subscribe & Save.',
      link: 'https://www.amazon.ca',
      tags: ['Braun', 'cleaner']
    },
    {
      name: 'Loop Engage 2 Ear Plugs',
      description: 'Noise-reducing plugs — $35.95 (Save 31%).',
      link: 'https://www.amazon.ca',
      tags: ['Loop', 'hearing']
    },
    {
      name: 'Vital Proteins Collagen',
      description: 'Subscribe and Save deal — Save 26%.',
      link: 'https://www.amazon.ca',
      tags: ['collagen', 'VitalProteins']
    },
    {
      name: 'Pilates Reformer Board Set',
      description: 'Portable core workout kit — Save 50%.',
      link: 'https://www.amazon.com',
      tags: ['Pilates', 'fitness']
    },
    {
      name: 'Winix Air Purifier Deals',
      description: 'Models 5500–2, 5510, 5520 — $168.99–$189.99 for Prime.',
      link: 'https://www.amazon.ca',
      tags: ['Winix', 'air']
    },
    {
      name: 'ResMed AirSense CPAP Machines',
      description: 'AirSense 10 $599, AirSense 11 $699 at papsmart.com.',
      link: 'https://www.papsmart.com',
      tags: ['CPAP', 'sleep']
    },
    {
      name: 'Happy Caps Mushroom Gummies',
      description: 'BOGO Free — Lions Mane & Shiitake (July 1–8 only).',
      link: 'https://www.happycaps.ca',
      tags: ['HappyCaps', 'mushroom']
    },
    {
      name: 'Wahl Professional Clippers',
      description: 'Senior model — $149.99 at Amazon.ca.',
      link: 'https://www.amazon.ca',
      tags: ['Wahl', 'clippers']
    },
    {
      name: 'Eufy Smart Scale C20',
      description: '16 metrics + offline mode — $44.99 (Save 36%).',
      link: 'https://www.amazon.ca',
      tags: ['Eufy', 'scale']
    },
    {
      name: 'NordicTrack Smart Dumbbells',
      description: 'Voice-controlled iSELECT set — Save up to 70% (YMMV).',
      link: 'https://www.nordictrack.ca',
      tags: ['NordicTrack', 'fitness']
    },
    {
      name: 'Specsavers Eyewear Offer',
      description: 'BOGO free + 50% off lens upgrades + free polarized lenses.',
      link: 'https://www.specsavers.ca',
      tags: ['glasses', 'Specsavers']
    },
    {
      name: 'Philips 5000 Dry/Wet Shaver',
      description: '$89.99 (Save $60) — Best Buy.',
      link: 'https://www.bestbuy.ca',
      tags: ['Philips', 'shaver']
    },
    {
      name: 'Jamieson Vitamins Sale',
      description: 'Sitewide 30% off — Long Weekend promo (ends July 2).',
      link: 'https://www.jamiesonvitamins.com',
      tags: ['Jamieson', 'vitamins']
    }
  ];

  const seoTagline =
    'Wellness deals across vitamins, grooming, sleep, air, oral care and personal essentials — refreshed weekly.';
  const seoIntro =
    'Breathe easier, sleep better, and stock up for less — MapleDeals tracks health & wellness promos from brands like Oral-B, Panasonic, Reactine, Winix, LANEIGE, Braun, and more. Whether it’s allergy relief or hydration, you’re covered.';

  return (
    <DealCategoryTemplate
      title="Wellness & Personal Care"
      emoji="🧴"
      tagline={seoTagline}
      deals={wellnessDeals}
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