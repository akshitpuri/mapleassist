import React from 'react';
import DealCategoryTemplate from './DealCategoryTemplate';

export default function Restaurants() {
  const restaurantDeals = [
    {
      name: '30th Anniversary Promo',
      description: '$5 smoothies • $10 pitas • Free pita for first 30 customers on July 21.',
      link: 'https://www.extremepita.com',
      tags: ['pita', 'promo', 'smoothie']
    },
    {
      name: 'Tim Hortons Dinner Deals',
      description: '$8.99 dinner combos available from 5PM to 11PM.',
      link: 'https://www.timhortons.ca',
      tags: ['TimHortons', 'dinner', 'combo']
    },
    {
      name: 'Wendy’s Breakfast 2 for $4',
      description: 'Promo returned — mix and match breakfast items.',
      link: 'https://www.wendys.ca',
      tags: ['Wendys', 'breakfast', 'deal']
    },
    {
      name: 'Fat Bastard Burrito Richmond Hill',
      description: '$12 off $30 order via Skip at Leslie & Elgin Mills.',
      link: 'https://www.fatbastardburrito.ca',
      tags: ['burrito', 'FatBastard', 'Skip']
    },
    {
      name: 'Domino’s Kingston Rd Special',
      description: 'Medium pizza just $5.55 — valid at 4679 Kingston Rd.',
      link: 'https://www.dominos.ca',
      tags: ['pizza', 'Dominos', 'local']
    },
    {
      name: 'IKEA Summer Restaurant Promo',
      description: '50% off meals, kids eat free on Wednesdays • $25/$75 and $35/$120 coupons (IKEA Family only).',
      link: 'https://www.ikea.com/ca/en/offers/restaurant',
      tags: ['IKEA', 'kids', 'coupon']
    },
    {
      name: 'Air Miles Flash Food Offer',
      description: 'Earn 100 AM on $25 spend at Kernels, Lyft or Marble Slab Creamery (July 25–27).',
      link: 'https://www.airmiles.ca',
      tags: ['AirMiles', 'flash', 'dessert']
    },
    {
      name: 'Real Fruit Bubble Tea Offer',
      description: 'BOGO 50% Diamond Mango Slush (July 23–25, 12:30–6:30).',
      link: 'https://www.realfruitbubbletea.com',
      tags: ['bubbletea', 'RealFruit', 'BOGO']
    },
    {
      name: 'BBQ & CO Richmond Offer',
      description: '15% off regular, 20% off duck • Buy ½ duck, get $8 char siu @ Richmond BC.',
      link: 'https://www.bbqco.ca',
      tags: ['BBQ', 'duck', 'Richmond']
    },
    {
      name: 'KFC Sandwich of the Day',
      description: '$5 Sandwich of the Day — 2025 update.',
      link: 'https://www.kfc.ca',
      tags: ['KFC', 'sandwich', 'deal']
    },
    {
      name: 'Wendy’s $0.99 Frosty',
      description: 'Small Frosty promo valid until August 17.',
      link: 'https://www.wendys.ca',
      tags: ['Wendys', 'dessert']
    },
    {
      name: 'McDonald’s Summer Treats',
      description: '$1 cones, $2 sundaes, snack milkshakes.',
      link: 'https://www.mcdonalds.ca',
      tags: ['McDonalds', 'dessert']
    },
    {
      name: 'Circle K Free Coffee',
      description: 'Free medium hot beverage via digital coupon — in-store redemption.',
      link: 'https://www.circlek.com/offers',
      tags: ['CircleK', 'coffee', 'free']
    },
    {
      name: 'Fat Bastard Bloor West Uber Promo',
      description: '4 Big Burritos for $24.35 pickup on Uber Eats.',
      link: 'https://www.ubereats.com',
      tags: ['FatBastard', 'UberEats', 'bundle']
    },
    {
      name: 'Wendy’s National Fry Days',
      description: '$1 large fry via app — July 18, 25, and August 1.',
      link: 'https://www.wendys.ca',
      tags: ['Wendys', 'fries', 'promo']
    },
    {
      name: 'Costco UberEats Gift Card Deal',
      description: 'Buy 2 × $50 Uber E-Gift Cards for $79.99.',
      link: 'https://www.costco.ca',
      tags: ['Costco', 'UberEats', 'giftcard']
    },
    {
      name: 'Mr. Puffs BOGO Oreo Tornado',
      description: 'BOGO ice cream dessert — locations in QC, ON, AB.',
      link: 'https://www.mrpuffs.com',
      tags: ['dessert', 'BOGO', 'Oreo']
    },
    {
      name: 'The Coffee Free Drink Days',
      description: 'Free drinks at Concord Cafe (Toronto) on July 19 & 26.',
      link: 'https://thecoffeeca.com',
      tags: ['coffee', 'Toronto', 'free']
    },
    {
      name: 'Fresh Slice Pizza Block Party',
      description: 'Free pizza for first 30; $10 unlimited toppings — July 20 (North Van), July 26 (Winnipeg).',
      link: 'https://www.freshslice.com',
      tags: ['FreshSlice', 'pizza', 'event']
    },
    {
      name: 'Cannoli Crunch Toronto Promo',
      description: 'Free cannoli until July 31 — celebrating 4th anniversary.',
      link: 'https://cannolicrunch.ca',
      tags: ['Toronto', 'dessert', 'promo']
    },
    {
      name: 'Pizzaiolo Ajax Grand Opening',
      description: 'Free pizza slices on July 22 — in-store only.',
      link: 'https://pizzaiolo.ca',
      tags: ['pizza', 'Ajax', 'opening']
    },
    {
      name: 'illy Coffee Beans at Amazon.ca',
      description: '250g Classico Roast — $8.99 (44% off).',
      link: 'https://www.amazon.ca/dp/B074NDCB7G',
      tags: ['Amazon', 'coffee', 'discount']
    },
    {
      name: 'Pearl Diver Toronto Oyster Deal',
      description: '100 oysters for $100 every Thursday.',
      link: 'https://www.pearldiver.to',
      tags: ['PearlDiver', 'oysters', 'Toronto']
    },
    {
      name: 'Club Kitchen Vancouver Promo',
      description: '40% off first order with code NEW2CK40 + free delivery on $15+ — until July 31.',
      link: 'https://www.clubkitchen.ca',
      tags: ['ClubKitchen', 'Vancouver', 'discount']
    },
    {
      name: 'Church’s Chicken Crispy Deal',
      description: '1 crispy chicken + Honey-Butter Biscuit for $2 — in-store only.',
      link: 'https://www.churchschicken.ca',
      tags: ['Churchs', 'chicken', 'combo']
    },
    {
      name: 'Harvey’s $10 Combo Deal',
      description: 'Original or veggie burger + frozen drink combo for $10; burger solo $4.',
      link: 'https://www.harveys.ca',
      tags: ['Harveys', 'burger', 'combo']
    },
    {
      name: 'Wendy’s July App Offers',
      description: '$4 breakfast Baconator or JBCB + small fry.',
      link: 'https://www.wendys.ca',
      tags: ['Wendys', 'app', 'breakfast']
    },
    {
      name: 'A&W Teen Burger Combo',
      description: 'App offer: Teen Burger + drink — $6.99.',
      link: 'https://aw.ca',
      tags: ['AW', 'burger', 'combo']
    },
    {
      name: 'Canadian Tire DoorDash GC Promo',
      description: '$15 CT Money per $100 DoorDash gift card (in-store only).',
      link: 'https://www.canadiantire.ca/en/gift-cards.html',
      tags: ['CanadianTire', 'giftcard', 'DoorDash']
    },
    {
      name: 'Chick-Fil-A Queen St. Workshop',
      description: 'Free DIY keychain & sticker + surprise gift — July 25 (Toronto).',
      link: 'https://www.chick-fil-a.ca',
      tags: ['ChickFilA', 'Toronto', 'freebie']
    }
  ];

   const seoTagline =
    'From app deals and burger combos to free pizza parties — discover Canada’s latest restaurant and fast food offers.';
  const seoIntro =
    'Tired of paying full price? MapleDeals highlights the freshest food promos — including local freebie events, Uber Eats bundles, gift card savings, and family-friendly combos from McDonald’s, Wendy’s, Fat Bastard Burrito, Church’s Chicken, and more.';

  return (
    <DealCategoryTemplate
      title="Restaurants & Food Deals"
      emoji="🍔"
      tagline={seoTagline}
      deals={restaurantDeals}
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
