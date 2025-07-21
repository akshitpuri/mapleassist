import React, { useState } from 'react';
import { Helmet } from 'react-helmet';

export default function Flyers() {
  const [query, setQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const isMobile = window.innerWidth < 768;

  const flyerCategories = {
    Grocery: [
      { name: 'No Frills', url: 'https://www.nofrills.ca/flyer', description: 'Budget-friendly groceries across Canada.' },
      { name: 'Walmart', url: 'https://www.walmart.ca/en/flyer', description: 'Weekly savings on groceries and general merchandise.' },
      { name: 'Food Basics', url: 'https://www.foodbasics.ca/flyer', description: 'Everyday low prices and bulk savings.' },
      { name: 'Metro', url: 'https://www.metro.ca/en/flyer', description: 'Ontario and Quebec grocery chain.' },
      { name: 'Sobeys', url: 'https://www.sobeys.com/en/flyer/', description: 'Fresh foods, loyalty rewards, and regional deals.' },
      { name: 'FreshCo', url: 'https://www.freshco.com/en/flyer', description: 'Low-price grocer in urban Ontario communities.' },
      { name: 'Longo’s', url: 'https://www.longos.com/flyer', description: 'Premium market and gourmet selections.' },
      { name: 'Fortinos', url: 'https://www.fortinos.ca/flyer', description: 'Fresh produce and international foods.' },
      { name: 'Real Canadian Superstore', url: 'https://www.realcanadiansuperstore.ca/flyer', description: 'Groceries and general merchandise.' },
      { name: 'T&T Supermarket', url: 'https://www.tntsupermarket.com/en/flyer', description: 'Canada’s largest Asian grocery chain.' },
      { name: 'Farm Boy', url: 'https://www.farmboy.ca/flyer/', description: 'Chef-inspired meals and fresh produce.' },
      { name: 'Save-On-Foods', url: 'https://www.saveonfoods.com/flyer', description: 'Western Canadian grocery chain.' },
      { name: 'IGA', url: 'https://www.iga.net/en/flyer', description: 'Local selections across Quebec.' },
      { name: 'Zehrs', url: 'https://www.zehrs.ca/flyer', description: 'PC Optimum partner grocer.' },
      { name: 'Independent Grocer', url: 'https://www.yourindependentgrocer.ca/flyer', description: 'Community grocers with regional specials.' },
      { name: 'Your Independent Grocer', url: 'https://www.yourindependentgrocer.ca/flyer', description: 'Community grocers with regional specials.' },
      { name: 'Giant Tiger', url: 'https://www.gianttiger.com/collections/flyers-and-deals', description: 'Discount groceries, clothing, and home essentials.' },
      { name: 'Valu-mart', url: 'https://www.valumart.ca/print-flyer', description: 'Ontario-based grocer with PC Optimum deals.' },
      { name: 'H Mart', url: 'https://www.hmartca.com/flyer', description: 'Korean supermarket with Asian groceries and cookware.' }
    ],
    Pharmacy: [
      { name: 'Shoppers Drug Mart', url: 'https://www1.shoppersdrugmart.ca/en/flyer', description: 'Health, beauty, and pharmacy savings.' },
      { name: 'Rexall', url: 'https://www.rexall.ca/flyer', description: 'Wellness, vitamins, and personal care deals.' },
      { name: 'Lawtons Drugs', url: 'https://www.lawtons.ca/flyer', description: 'Atlantic Canada pharmacy chain.' },
      { name: 'Jean Coutu', url: 'https://www.jeancoutu.com/en/flyer/', description: 'Quebec-based pharmacy flyers.' }
    ],
    Electronics: [
      { name: 'Best Buy', url: 'https://www.bestbuy.ca/en-ca/flyer', description: 'Tech deals and appliance savings.' },
      { name: 'Staples', url: 'https://www.staples.ca/flyer', description: 'Office supplies and back-to-school promos.' },
      { name: 'Visions Electronics', url: 'https://www.visions.ca/flyer', description: 'Western Canada’s tech warehouse.' }
    ],
    Home: [
      { name: 'Canadian Tire', url: 'https://www.canadiantire.ca/en/flyer.html', description: 'Tools, auto, and home improvement flyers.' },
      { name: 'Leon’s', url: 'https://www.leons.ca/pages/flyer', description: 'Furniture and appliances bundles.' },
      { name: 'The Brick', url: 'https://www.thebrick.com/pages/flyer', description: 'Mattresses, sofas, and bedroom sets.' },
      { name: 'Home Hardware', url: 'https://www.homehardware.ca/en/flyer', description: 'DIY tools and renovation flyers.' },
      { name: 'RONA', url: 'https://www.rona.ca/en/flyer', description: 'Garden, lighting, and home improvement.' },
      { name: 'Sleep Country', url: 'https://www.sleepcountry.ca/flyer', description: 'Mattress sales and sleep bundles.' },
      { name: 'JYSK', url: 'https://www.jysk.ca/catalogue', description: 'Scandinavian-style furniture and home décor.' },
      { name: 'Home Depot', url: 'https://www.homedepot.ca/flyer', description: 'DIY tools, appliances, and renovation supplies.' }
    ],
    Specialty: [
      { name: 'Healthy Planet', url: 'https://www.healthyplanetcanada.com/pages/flyer', description: 'Organic and natural wellness deals.' },
      { name: 'Bulk Barn', url: 'https://www.bulkbarn.ca/en/flyer', description: 'Snacks, pantry staples, and baking goods.' },
      { name: 'Mark’s', url: 'https://www.marks.com/en/flyer.html', description: 'Casual and workwear savings.' },
      { name: 'Sport Chek', url: 'https://www.sportchek.ca/en/flyer.html', description: 'Athletic gear and sporting goods.' },
      { name: 'Toys “R” Us', url: 'https://www.toysrus.ca/en/flyer', description: 'Kids’ toys and baby gear discounts.' },
      { name: 'Princess Auto', url: 'https://www.princessauto.com/en/flyer', description: 'Garage, farm, and workshop tools.' },
      { name: 'PetSmart', url: 'https://www.petsmart.ca/flyer', description: 'Pet food, grooming, and accessories.' },
      { name: 'Pet Valu', url: 'https://www.petvalu.ca/flyer', description: 'Canadian pet store savings.' },
      { name: 'Michaels', url: 'https://www.michaels.com/en-ca/flyer', description: 'Craft supplies and seasonal décor.' },
      { name: 'Fabricland', url: 'https://www.fabricland.ca/flyer.php', description: 'Fabrics, textiles, and sewing essentials.' },
      { name: 'Bulk Barn', url: 'https://www.bulkbarn.ca/en/Deals/', description: 'Canada’s largest bulk food retailer with weekly savings.' },
      { name: 'M&M Food Market', url: 'https://www.mmfoodmarket.com/pages/flyer', description: 'Frozen meals, sides, and desserts for busy families.' },
      { name: 'Cabela’s', url: 'https://www.cabelas.ca/pages/flyer', description: 'Outdoor gear, camping, and hunting equipment.' },
      { name: 'Wholesale Club', url: 'https://www.wholesaleclub.ca/', description: 'Bulk food and restaurant supplies for businesses and families.' },
      { name: 'PartSource', url: 'https://partsource.ca/pages/partsource-flyer-car-parts-deals-promotions', description: 'Auto parts and accessories with weekly deals.' },
      { name: 'Tech Source', url: 'https://techsourcecanada.ca/weekly-flyer', description: 'Discount electronics, laptops, and gaming gear.' },
      { name: 'GameStop.ca', url: 'https://www.gamestop.ca/Flyers', description: 'Video games, consoles, and collectibles with weekly promos.' } 
    ]
  };

  return (
    <div style={outerWrap}>
      <Helmet>
        <title>Flyers Canada | Grocery, Pharmacy, Tech & Home Deals</title>
        <meta
          name="description"
          content="Browse Canadian store flyers from No Frills, Walmart, Shoppers Drug Mart, Canadian Tire, Best Buy and more. Updated weekly to help you shop smarter."
        />
      </Helmet>

      <main style={container}>
        <section style={hero}>
          <h1 style={heroTitle}>🗓 Canadian Flyers by Category</h1>
          <p style={heroSubtitle}>
            Find weekly store circulars for groceries, pharmacy, electronics, and home retailers. All links update Thursdays and reflect active savings.
          </p>

          <div style={filterWrap(isMobile)}>
            <input
              type="text"
              placeholder="Search store name…"
              value={query}
              onChange={e => setQuery(e.target.value)}
              style={searchInput}
            />
            <select
              value={categoryFilter}
              onChange={e => setCategoryFilter(e.target.value)}
              style={dropdownStyle}
            >
              <option value="">All Categories</option>
              {Object.keys(flyerCategories).map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
            <a href="/deals" style={backBtn(isMobile)}>← Back to Deals</a>
          </div>
        </section>

        {/* 🧭 Flyer Cards by Category */}
        {Object.entries(flyerCategories)
          .filter(([cat]) => !categoryFilter || cat === categoryFilter)
          .map(([category, stores]) => (
            <section key={category} style={gridWrap}>
              <h2 style={sectionHeading}>{category} Flyers</h2>
              <div style={grid}>
                {stores
                  .filter(store => store.name.toLowerCase().includes(query.toLowerCase()))
                  .map((store, i) => (
                    <a key={i} href={store.url} target="_blank" rel="noopener noreferrer" style={card}>
                      <h3 style={cardTitle}>{store.name}</h3>
                      <p style={cardDesc}>{store.description}</p>
                    </a>
                  ))}
              </div>
            </section>
        ))}
      </main>
    </div>
  );
}

// 🎨 Styles
const outerWrap = {
  backgroundImage: `url(${process.env.PUBLIC_URL}/maple-pattern.png)`,
  backgroundRepeat: 'repeat',
  backgroundSize: 'auto',
  backgroundPosition: 'top left',
  backgroundColor: '#f7f9fb',
  minHeight: '100vh',
  width: '100%',
  paddingBottom: '60px'
};

const container = {
  maxWidth: '1100px',
  margin: '0 auto',
  padding: '0 24px',
  fontFamily: '"Segoe UI", system-ui, sans-serif',
  color: '#2c2c2c'
};

const hero = {
  textAlign: 'center',
  padding: '80px 32px 32px',
  color: '#2b2b2b'
};

const heroTitle = {
  fontSize: '2.6rem',
  fontWeight: 700,
  marginBottom: '16px'
};

const heroSubtitle = {
  fontSize: '1.15rem',
  maxWidth: '680px',
  margin: '0 auto 32px',
  color: '#555',
  lineHeight: '1.6'
};

const filterWrap = isMobile => ({
  display: 'flex',
  flexDirection: isMobile ? 'column' : 'row',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '16px',
  marginBottom: '32px'
});

const searchInput = {
  width: '100%',
  maxWidth: '400px',
  padding: '12px 16px',
  fontSize: '1rem',
  borderRadius: '6px',
  border: '1px solid #ccc',
  boxShadow: '0 2px 4px rgba(0,0,0,0.03)',
  fontFamily: '"Segoe UI", system-ui, sans-serif'
};

const dropdownStyle = {
  padding: '10px 14px',
  fontSize: '1rem',
  borderRadius: '6px',
  border: '1px solid #ccc',
  minWidth: '180px',
  height: '42px'
};

const backBtn = isMobile => ({
  fontSize: '1rem',
  padding: '10px 20px',
  backgroundColor: '#2b2b2b',
  color: '#fff',
  textDecoration: 'none',
  borderRadius: '6px',
  fontWeight: 500,
  alignSelf: isMobile ? 'center' : 'auto'
});

const gridWrap = {
  backgroundColor: '#fff',
  padding: '48px 32px',
  borderRadius: '12px',
  boxShadow: '0 2px 10px rgba(0,0,0,0.04)',
  marginTop: '24px'
};

const sectionHeading = {
  fontSize: '1.6rem',
  fontWeight: 600,
  marginBottom: '28px',
  textAlign: 'center'
};

const grid = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
  gap: '28px'
};

const card = {
  backgroundColor: '#fafafa',
  border: '1px solid #ddd',
  borderRadius: '10px',
  padding: '20px',
  textDecoration: 'none',
  color: '#2c2c2c',
  boxShadow: '0 2px 6px rgba(0,0,0,0.03)',
  transition: 'box-shadow 0.2s ease-in-out'
};

const cardTitle = {
  fontSize: '1.15rem',
  fontWeight: 600,
  marginBottom: '8px'
};

const cardDesc = {
  fontSize: '0.95rem',
  color: '#555',
  lineHeight: '1.5'
};