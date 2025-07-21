import React from 'react';
import DealCategoryTemplate from './DealCategoryTemplate';

export default function Automotive() {
  const automotiveDeals = [
  {
    name: 'CIEVIE D100 Dash Cam',
    description: '4K+1080P front/rear dash cam with 64GB SD card, WiFi, IPS screen — $55.99.',
    link: 'https://www.amazon.ca/dp/B0F6SZDF2T',
    tags: ['dashcam', 'tech', 'Walmart']
  },
  {
    name: 'Costco Road Dawg Utility Jack',
    description: '46.2 in utility jack — $49.97 (was $89.99) at Costco.',
    link: 'https://www.costco.ca/road-dawg-46.2-in-utility-jack.product.4000301256.html',
    tags: ['jack', 'Costco', 'tools', 'clearance']
  },
  {
    name: 'FRAM Ultra Synthetic Oil Filter',
    description: 'FRAM XG3614 oil filter — $7 at Walmart (pricing may vary).',
    link: 'https://www.walmart.ca/en/ip/FRAM-Ultra-Synthetic-Oil-Filter-XG3614/6000188099136',
    tags: ['oil', 'Walmart', 'filter']
  },
  {
    name: 'Husky Trolley Jack Kit',
    description: 'Heavy-duty 3-ton steel jack with stands — $98 at Home Depot.',
    link: 'https://www.homedepot.ca/product/husky-3-ton-heavy-duty-steel-trolley-jack-kit-with-stands/1001818819',
    tags: ['jack', 'HomeDepot']
  },
  {
    name: 'CAA Membership Bonus Miles',
    description: 'Earn 200 Air Miles when registering through CAA and Air Miles.',
    link: 'https://www.airmiles.ca/content/aem-airmiles-web/ca/en/offers/featured-offers/card-linked-offers.html',
    tags: ['CAA', 'membership', 'miles']
  },
  {
    name: 'Simoniz Pressure Washer',
    description: 'Simoniz Platinum 1800 PSI compact washer — $153.32 at PartSource.',
    link: 'https://partsource.ca/collections/simoniz-electric-pressure-washers',
    tags: ['tools', 'PartSource', 'washer']
  },
  {
    name: 'Powerbuilt Bottle Jack',
    description: '6-ton bottle jack — $19.97 at Costco.',
    link: 'https://www.bing.com/search?q=Powerbuilt+Bottle+Jack+site%3Acostco.ca',
    tags: ['jack', 'Costco']
  },
  {
    name: 'Certified Jack & Stand Kit',
    description: '2-ton jack + axle stands with wheel chocks — $170 at Canadian Tire.',
    link: 'https://www.canadiantire.ca/en/pdp/certified-jack-and-axle-stand-kit-w-wheel-chocks-2-ton-0091061p.html',
    tags: ['jack', 'CanadianTire']
  },
  {
    name: 'PERFORMANCE Oil Drain Pan',
    description: '15L oil drain pan — $15 at Princess Auto.',
    link: 'https://www.princessauto.com/en/15-litre-oil-drain-pan/product/PA0009274127',
    tags: ['tools', 'PrincessAuto']
  },
  {
    name: '407 ETR Rush Hour Rewards',
    description: 'Free rush hour tolls for targeted members (YMMV).',
    link: 'https://www.407etr.com/en/promotions',
    tags: ['407ETR', 'promo']
  },
  {
    name: 'Shell Fill-Up Challenge',
    description: 'Complete Shell V-Power NiTRO+ fill-ups to earn rewards.',
    link: 'https://www.shell.ca/en_ca/drivers/my-fuels/shell-v-power-nitro-plus-fill-up-challenge.html',
    tags: ['Shell', 'fuel', 'challenge']
  },
  {
    name: 'POWERFIST Jack Stands',
    description: '2-ton jack stands — $35 at Princess Auto.',
    link: 'https://www.princessauto.com/2-ton-jack-stands/product/PA0008760696',
    tags: ['jack', 'PrincessAuto']
  },
  {
    name: 'Lightning Dash Cam Deal',
    description: 'Front+rear dash cam with 32GB card — $79.99 on Amazon.',
    link: 'https://www.amazon.ca/Lightning-Dashboard-Cameras-Parking-Recording/dp/B0CZ6WVMJ9',
    tags: ['dashcam', 'Amazon', 'tech']
  },
  {
    name: 'VIOFO A229 Dash Cam',
    description: 'Dual-channel STARVIS 2 dash cam — $207 on AliExpress.',
    link: 'https://www.aliexpress.com/item/1005007473794294.html',
    tags: ['dashcam', 'AliExpress', 'tech']
  },
  {
    name: 'SHOP IRON Floor Jack',
    description: '3-ton floor jack with stands — $105 at Princess Auto.',
    link: 'https://www.princessauto.com/en/3-ton-floor-jack-and-stands-set/product/PA0009224197',
    tags: ['jack', 'PrincessAuto', 'tools']
  },
  {
    name: 'Torin Engine Crane',
    description: '2-ton engine crane — $299.97 at Costco.',
    link: 'https://www.costco.ca/torin-2-ton-engine-crane.product.4000306876.html',
    tags: ['tools', 'Costco', 'engine-crane']
  },
  {
    name: 'SiriusXM $4.99 Promo',
    description: '12 months at $4.99/month for new subscribers.',
    link: 'https://www.siriusxm.ca/subscribe/',
    tags: ['SiriusXM', 'streaming']
  }
];
  const seoTagline =
    'From jacks and dash cams to fuel rewards and pressure washers — weekly verified automotive deals across Canada.';
  const seoIntro =
    'Find the latest auto accessories, garage gear, fluids, dash cams, and rewards from top retailers like Costco, Canadian Tire, Shell, Princess Auto, and Amazon. Updated weekly for Canadian drivers, DIYers, and gearheads.';

  return (
    <DealCategoryTemplate
      title="Automotive"
      emoji="🚗"
      tagline={seoTagline}
      deals={automotiveDeals}
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