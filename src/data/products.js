const brands = [
  { id: "maybelline", name: "Maybelline New York", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/04/Maybelline_logo.svg/2560px-Maybelline_logo.svg.png", stores: [{ name: "Nykaa", url: "https://www.nykaa.com/brand/maybelline/c/832" }, { name: "Amazon", url: "https://www.amazon.in/s?k=maybelline+foundation&tag=skinsync03-21" }] },
  { id: "loreal", name: "L'Oréal Paris", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c7/L%27Or%C3%A9al_Paris_logo.svg/2560px-L%27Or%C3%A9al_Paris_logo.svg.png", stores: [{ name: "Nykaa", url: "https://www.nykaa.com/brand/loreal-paris/c/877" }, { name: "Amazon", url: "https://www.amazon.in/s?k=loreal+foundation+india&tag=skinsync03-21" }, { name: "Myntra", url: "https://www.myntra.com/loreal-paris" }] },
  { id: "lakme", name: "Lakmé", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/Lakm%C3%A9_logo.svg/2560px-Lakm%C3%A9_logo.svg.png", stores: [{ name: "Nykaa", url: "https://www.nykaa.com/brand/lakme/c/884" }, { name: "Amazon", url: "https://www.amazon.in/s?k=lakme+foundation&tag=skinsync03-21" }] },
  { id: "sugar", name: "Sugar Cosmetics", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7c/Sugar_Cosmetics_logo.png/2560px-Sugar_Cosmetics_logo.png", stores: [{ name: "Nykaa", url: "https://www.nykaa.com/brand/sugar/c/870" }, { name: "Amazon", url: "https://www.amazon.in/s?k=sugar+cosmetics+foundation&tag=skinsync03-21" }, { name: "Myntra", url: "https://www.myntra.com/sugar-cosmetics" }] },
  { id: "mac", name: "M·A·C Cosmetics", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/25/MAC_Cosmetics_logo.svg/2560px-MAC_Cosmetics_logo.svg.png", stores: [{ name: "Nykaa", url: "https://www.nykaa.com/brand/mac/c/897" }, { name: "Amazon", url: "https://www.amazon.in/s?k=mac+cosmetics+foundation&tag=skinsync03-21" }, { name: "Sephora", url: "https://www.sephora.com/brand/mac-cosmetics" }] },
  { id: "nykaa", name: "Nykaa Cosmetics", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/96/Nykaa_logo.svg/2560px-Nykaa_logo.svg.png", stores: [{ name: "Nykaa", url: "https://www.nykaa.com/brand/nykaa/c/857" }, { name: "Amazon", url: "https://www.amazon.in/s?k=nykaa+cosmetics+foundation&tag=skinsync03-21" }] },
  { id: "kay", name: "Kay Beauty", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Kay_Beauty_logo.png/2560px-Kay_Beauty_logo.png", stores: [{ name: "Nykaa", url: "https://www.nykaa.com/brand/kay-beauty/c/889" }, { name: "Amazon", url: "https://www.amazon.in/s?k=kay+beauty+foundation&tag=skinsync03-21" }] },
  { id: "huda", name: "Huda Beauty", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Huda_Beauty_logo.svg/2560px-Huda_Beauty_logo.svg.png", stores: [{ name: "Sephora", url: "https://www.sephora.com/brand/huda-beauty" }, { name: "Amazon", url: "https://www.amazon.in/s?k=huda+beauty+foundation&tag=skinsync03-21" }, { name: "Nykaa", url: "https://www.nykaa.com/brand/huda-beauty/c/915" }] },
  { id: "fenty", name: "Fenty Beauty", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Fenty_Beauty_logo.svg/2560px-Fenty_Beauty_logo.svg.png", stores: [{ name: "Sephora", url: "https://www.sephora.com/brand/fenty-beauty" }, { name: "Amazon", url: "https://www.amazon.in/s?k=fenty+beauty+foundation+india&tag=skinsync03-21" }, { name: "Nykaa", url: "https://www.nykaa.com/brand/fenty-beauty/c/916" }] },
  { id: "esteelauder", name: "Estée Lauder", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/33/Est%C3%A9e_Lauder_logo.svg/2560px-Est%C3%A9e_Lauder_logo.svg.png", stores: [{ name: "Nykaa", url: "https://www.nykaa.com/brand/estee-lauder/c/916" }, { name: "Amazon", url: "https://www.amazon.in/s?k=estee+lauder+foundation&tag=skinsync03-21" }, { name: "Sephora", url: "https://www.sephora.com/brand/estee-lauder" }] },
];

function shade(name, hex, undertone, depth) {
  return { name, hex, undertone, depth };
}

const products = [
  // ========== MAYBELLINE ==========
  {
    id: "maybelline-fitme-foundation", brand: "maybelline", brandId: "maybelline",
    name: "Fit Me Matte + Poreless Foundation", type: "foundation",
    finish: "matte", coverage: "medium", image: "https://images.unsplash.com/photo-1590156546646-0e9e1a5e2d3c?w=400&q=80",
    description: "Lightweight foundation that mattifies and refines pores. Best for normal to oily skin.",
    howToUse: "Shake well. Apply with fingertips or a damp sponge, starting from the centre of your face and blending outward.",
    stores: [{ name: "Nykaa", url: "https://www.nykaa.com/maybelline-fit-me-matte-poreless-foundation/p/245018" }, { name: "Amazon", url: "https://www.amazon.in/Maybelline-Matte-Poreless-Liquid-Foundation/dp/B07L3R68G2?tag=skinsync03-21" }],
    shades: [
      shade("Porcelain", "#f5e8e0", "cool", 1), shade("Ivory", "#f0ddd0", "warm", 2), shade("Fair", "#ead5c0", "neutral", 2),
      shade("Natural Ivory", "#e0c8b0", "warm", 3), shade("Creamy Beige", "#d4b89c", "neutral", 4), shade("Nude Beige", "#c8a888", "warm", 4),
      shade("Sun Beige", "#b89478", "warm", 5), shade("Pure Beige", "#ac8468", "neutral", 5), shade("Warm Honey", "#a0785c", "warm", 6),
      shade("Coconut", "#8c6850", "neutral", 7), shade("Caramel", "#7c5c44", "warm", 7), shade("Spicy Brown", "#6c4c38", "warm", 8),
      shade("Toffee", "#5c3c2c", "neutral", 9), shade("Espresso", "#4c2c1c", "neutral", 10), shade("Rich Mocha", "#3c2010", "warm", 11),
    ],
  },
  {
    id: "maybelline-fitme-concealer", brand: "maybelline", brandId: "maybelline",
    name: "Fit Me Concealer", type: "concealer",
    finish: "natural", coverage: "medium", image: "https://images.unsplash.com/photo-1631730359584-3b6a8e3d5a3a?w=400&q=80",
    description: "Lightweight concealer that covers imperfections and brightens under eyes.",
    stores: [{ name: "Nykaa", url: "https://www.nykaa.com/maybelline-fit-me-concealer/p/245019" }, { name: "Amazon", url: "https://www.amazon.in/dp/B00L7I5HVE?tag=skinsync03-21" }],
    shades: [
      shade("Fair", "#f0d8c8", "cool", 1), shade("Light", "#e0c0a8", "neutral", 2), shade("Medium", "#c8a080", "neutral", 4),
      shade("Sand", "#b48868", "warm", 5), shade("Honey", "#a07050", "warm", 6), shade("Caramel", "#7c5840", "neutral", 7),
      shade("Mocha", "#5c3c28", "neutral", 9), shade("Espresso", "#4c2c18", "neutral", 10),
    ],
  },

  // ========== L'ORÉAL ==========
  {
    id: "loreal-infallible-foundation", brand: "loreal", brandId: "loreal",
    name: "Infallible 24H Fresh Wear Foundation", type: "foundation",
    finish: "natural", coverage: "medium-full", image: "https://images.unsplash.com/photo-1596704017254-9b121068fb31?w=400&q=80",
    description: "Breathable, lightweight foundation with up to 24-hour wear. Transfer-resistant and SPF 25.",
    howToUse: "Apply with fingertips, brush, or sponge. Build coverage as needed. Sets to a natural finish.",
    stores: [{ name: "Nykaa", url: "https://www.nykaa.com/loreal-paris-infallible-fresh-wear-foundation/p/245020" }, { name: "Myntra", url: "https://www.myntra.com/loreal-paris-infallible-foundation" }],
    shades: [
      shade("Porcelain", "#f2dfd0", "cool", 1), shade("Pearl", "#ecd0b8", "neutral", 2), shade("Ivory", "#e0c0a4", "warm", 2),
      shade("Rose Vanilla", "#d4b090", "cool", 3), shade("Natural Beige", "#c8a080", "neutral", 4), shade("Warm Beige", "#bc9070", "warm", 4),
      shade("Sand", "#b08464", "neutral", 5), shade("Golden Beige", "#a47858", "warm", 5), shade("Caramel", "#906848", "warm", 6),
      shade("Cocoa", "#7c583c", "neutral", 7), shade("Mocha", "#684830", "warm", 8), shade("Espresso", "#543828", "neutral", 9),
      shade("Cappuccino", "#44281c", "warm", 10), shade("Rich Brown", "#341c10", "neutral", 11),
    ],
  },
  {
    id: "loreal-true-match-concealer", brand: "loreal", brandId: "loreal",
    name: "True Match Concealer", type: "concealer",
    finish: "radiant", coverage: "medium", image: "https://images.unsplash.com/photo-1610191004386-d1b25fd0f361?w=400&q=80",
    description: "Hydrating concealer with precision wand. Blends seamlessly for a natural brightened look.",
    stores: [{ name: "Nykaa", url: "https://www.nykaa.com/loreal-paris-true-match-concealer/p/245021" }],
    shades: [
      shade("Fair Ivory", "#ecd4c0", "cool", 1), shade("Warm Ivory", "#e4c8ac", "warm", 2), shade("Natural Beige", "#d0b090", "neutral", 3),
      shade("Warm Beige", "#c09878", "warm", 4), shade("Sand", "#b08864", "neutral", 5), shade("Caramel", "#8c6444", "warm", 7),
      shade("Mocha", "#684830", "neutral", 8), shade("Espresso", "#503420", "neutral", 10),
    ],
  },

  // ========== LAKMÉ ==========
  {
    id: "lakme-absolute-foundation", brand: "lakme", brandId: "lakme",
    name: "Absolute Matte Real Skin Foundation", type: "foundation",
    finish: "matte", coverage: "medium", image: "https://images.unsplash.com/photo-1583663848855-6a69f8b30b8e?w=400&q=80",
    description: "Skin-hugging matte foundation with SPF 20. Stays fresh for up to 16 hours.",
    howToUse: "Dot on forehead, cheeks, and chin. Blend outward using a damp sponge for a flawless finish.",
    stores: [{ name: "Nykaa", url: "https://www.nykaa.com/lakme-absolute-matte-real-foundation/p/245022" }, { name: "Amazon", url: "https://www.amazon.in/dp/B07J6X8Z9C?tag=skinsync03-21" }],
    shades: [
      shade("Ivory", "#eed4be", "cool", 1), shade("Fair", "#e4c4ac", "neutral", 2), shade("Light Beige", "#d8b898", "warm", 3),
      shade("Natural Beige", "#c8a080", "neutral", 4), shade("Sand Beige", "#b89070", "warm", 5), shade("Golden Beige", "#a88060", "warm", 5),
      shade("Caramel", "#906848", "neutral", 6), shade("Warm Toffee", "#7c5c40", "warm", 7), shade("Mocha", "#684c34", "neutral", 8),
      shade("Rich Brown", "#543828", "warm", 9), shade("Deep Bronze", "#402418", "neutral", 10),
    ],
  },
  {
    id: "lakme-9to5-concealer", brand: "lakme", brandId: "lakme",
    name: "9 to 5 Primer + Matte Concealer", type: "concealer",
    finish: "matte", coverage: "full", image: "https://images.unsplash.com/photo-1612293908766-0e2e7b09a220?w=400&q=80",
    description: "2-in-1 primer and concealer for a smooth, matte finish. Covers dark circles and blemishes.",
    stores: [{ name: "Nykaa", url: "https://www.nykaa.com/lakme-9-to-5-primer-concealer/p/245023" }],
    shades: [
      shade("Fair", "#e8ccb4", "neutral", 1), shade("Light Beige", "#d4b494", "warm", 3), shade("Natural Beige", "#c4a080", "neutral", 4),
      shade("Sand", "#b48c6c", "warm", 5), shade("Caramel", "#8c6444", "neutral", 7), shade("Mocha", "#684830", "warm", 8),
    ],
  },

  // ========== SUGAR ==========
  {
    id: "sugar-foundation", brand: "sugar", brandId: "sugar",
    name: "ACE of Face Foundation Stick", type: "foundation",
    finish: "natural", coverage: "medium-full", image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&q=80",
    description: "Buildable stick foundation that glides on smoothly. Perfect for on-the-go touch-ups.",
    howToUse: "Swirl directly on skin and blend with a brush or sponge. Layer for fuller coverage.",
    stores: [{ name: "Nykaa", url: "https://www.nykaa.com/sugar-ace-of-face-foundation-stick/p/245024" }, { name: "Myntra", url: "https://www.myntra.com/sugar-ace-of-face-foundation" }],
    shades: [
      shade("Porcelain", "#f0dcc8", "cool", 1), shade("Fair Ivory", "#e4c8b0", "neutral", 2), shade("Natural", "#d4b498", "warm", 3),
      shade("Beige", "#c8a484", "neutral", 4), shade("Warm Sand", "#b49070", "warm", 5), shade("Honey", "#a47c5c", "warm", 6),
      shade("Caramel", "#8c6848", "neutral", 7), shade("Toffee", "#785438", "warm", 8), shade("Mocha", "#60442c", "neutral", 9),
      shade("Espresso", "#48301c", "warm", 10),
    ],
  },
  {
    id: "sugar-concealer", brand: "sugar", brandId: "sugar",
    name: "Arrest the Concealer", type: "concealer",
    finish: "matte", coverage: "full", image: "https://images.unsplash.com/photo-1630350533585-1e3c1a8d2a3e?w=400&q=80",
    description: "Full-coverage liquid concealer that stays put. Hides dark spots, blemishes, and under-eye circles.",
    stores: [{ name: "Nykaa", url: "https://www.nykaa.com/sugar-arrest-the-concealer/p/245025" }],
    shades: [
      shade("Fair Ivory", "#e8ccb4", "cool", 1), shade("Light Beige", "#d8b898", "neutral", 3), shade("Natural", "#c8a080", "warm", 4),
      shade("Sand", "#b48868", "neutral", 5), shade("Honey", "#a07050", "warm", 6), shade("Caramel", "#7c5840", "neutral", 7),
      shade("Mocha", "#5c3c28", "warm", 9),
    ],
  },

  // ========== M·A·C ==========
  {
    id: "mac-studio-fix-foundation", brand: "mac", brandId: "mac",
    name: "Studio Fix Fluid SPF 15 Foundation", type: "foundation",
    finish: "matte", coverage: "medium-full", image: "https://images.unsplash.com/photo-1583241800698-e8ab01830a07?w=400&q=80",
    description: "Iconic oil-control foundation with SPF 15. Provides a flawless airbrushed finish that lasts all day.",
    howToUse: "Shake well. Apply with a foundation brush or damp sponge, blending from the centre outward.",
    stores: [{ name: "Nykaa", url: "https://www.nykaa.com/mac-studio-fix-fluid/p/245026" }, { name: "Sephora", url: "https://www.sephora.com/product/mac-studio-fix-fluid-P123456" }],
    shades: [
      shade("NC15", "#f0d8c0", "warm", 1), shade("NC20", "#e8c8ac", "warm", 2), shade("NC25", "#dcb898", "warm", 3),
      shade("NC30", "#d0a888", "neutral", 4), shade("NC35", "#c09878", "warm", 4), shade("NC37", "#b88c6c", "neutral", 5),
      shade("NC40", "#ac8060", "warm", 5), shade("NC42", "#9c7454", "warm", 6), shade("NC44", "#8c6848", "neutral", 7),
      shade("NC45", "#7c5c3c", "warm", 7), shade("NC50", "#684830", "neutral", 8), shade("NC55", "#583828", "warm", 9),
      shade("NW15", "#f0d4c4", "cool", 1), shade("NW20", "#e4c4b0", "cool", 2), shade("NW25", "#d8b4a0", "cool", 3),
      shade("NW35", "#c09884", "cool", 4), shade("NW43", "#9c7864", "cool", 6), shade("NW48", "#7c604c", "cool", 8),
    ],
  },
  {
    id: "mac-pro-longwear-concealer", brand: "mac", brandId: "mac",
    name: "Pro Longwear Concealer", type: "concealer",
    finish: "natural", coverage: "full", image: "https://images.unsplash.com/photo-1631730359584-3b6a8e3d5a3a?w=400&q=80",
    description: "Long-wearing, crease-resistant concealer that provides 15-hour wear. Great for spot concealing and under-eyes.",
    stores: [{ name: "Nykaa", url: "https://www.nykaa.com/mac-pro-longwear-concealer/p/245027" }],
    shades: [
      shade("NC15", "#ecd0b8", "warm", 1), shade("NC20", "#e0c0a4", "warm", 2), shade("NC25", "#d0b090", "neutral", 3),
      shade("NC30", "#c0a080", "neutral", 4), shade("NW20", "#e0bcac", "cool", 2), shade("NW25", "#d0ac98", "cool", 3),
      shade("NC35", "#b08868", "warm", 5), shade("NC40", "#a07858", "warm", 6), shade("NC42", "#906848", "neutral", 7),
      shade("NW35", "#b09078", "cool", 5), shade("NC45", "#785438", "warm", 8),
    ],
  },

  // ========== NYKAA ==========
  {
    id: "nykaa-foundation", brand: "nykaa", brandId: "nykaa",
    name: "Skin Shield Foundation", type: "foundation",
    finish: "natural", coverage: "medium", image: "https://images.unsplash.com/photo-1596704017254-9b121068fb31?w=400&q=80",
    description: "Lightweight, breathable foundation with SPF 30. Enriched with niacinamide for skin benefits.",
    howToUse: "Apply with a damp sponge or foundation brush. Buildable from medium to full coverage.",
    stores: [{ name: "Nykaa", url: "https://www.nykaa.com/nykaa-skin-shield-foundation/p/245028" }],
    shades: [
      shade("Fair Vanilla", "#f2dcc8", "neutral", 1), shade("Warm Ivory", "#e8c8ac", "warm", 2), shade("Natural Beige", "#d4b494", "neutral", 3),
      shade("Golden Beige", "#c4a080", "warm", 4), shade("Sand", "#b4906c", "neutral", 5), shade("Caramel", "#9c7854", "warm", 6),
      shade("Toffee", "#84603c", "neutral", 7), shade("Mocha", "#6c4c30", "warm", 8), shade("Cocoa", "#543828", "neutral", 9),
      shade("Deep Brown", "#402418", "warm", 10),
    ],
  },
  {
    id: "nykaa-concealer", brand: "nykaa", brandId: "nykaa",
    name: "Bae Satin Liquid Concealer", type: "concealer",
    finish: "satin", coverage: "full", image: "https://images.unsplash.com/photo-1610191004386-d1b25fd0f361?w=400&q=80",
    description: "Satin-finish concealer that hydrates while covering imperfections. Infused with hyaluronic acid.",
    stores: [{ name: "Nykaa", url: "https://www.nykaa.com/nykaa-bae-satin-concealer/p/245029" }],
    shades: [
      shade("Fair", "#ecd0b8", "cool", 1), shade("Light", "#e0c0a4", "neutral", 2), shade("Medium", "#c8a484", "neutral", 4),
      shade("Warm Sand", "#b49070", "warm", 5), shade("Caramel", "#8c6848", "neutral", 7), shade("Mocha", "#5c3c28", "warm", 9),
    ],
  },

  // ========== KAY BEAUTY ==========
  {
    id: "kay-foundation", brand: "kay", brandId: "kay",
    name: "Stay Fix Matte Foundation", type: "foundation",
    finish: "matte", coverage: "medium-full", image: "https://images.unsplash.com/photo-1590156546646-0e9e1a5e2d3c?w=400&q=80",
    description: "Oil-free matte foundation that controls shine for up to 18 hours. Non-comedogenic and dermatologically tested.",
    howToUse: "Shake and pump onto the back of your hand, then blend with a sponge or brush from the centre outward.",
    stores: [{ name: "Nykaa", url: "https://www.nykaa.com/kay-beauty-stay-fix-foundation/p/245030" }],
    shades: [
      shade("Porcelain", "#f0dcc8", "cool", 1), shade("Ivory", "#e4c4ac", "neutral", 2), shade("Natural Beige", "#d4b090", "warm", 3),
      shade("Sand Beige", "#c4a080", "neutral", 4), shade("Warm Sand", "#b4906c", "warm", 5), shade("Golden", "#a07854", "warm", 6),
      shade("Caramel", "#88643c", "neutral", 7), shade("Toffee", "#745030", "warm", 8), shade("Mocha", "#5c3c24", "neutral", 9),
      shade("Deep Espresso", "#44281c", "warm", 10),
    ],
  },
  {
    id: "kay-concealer", brand: "kay", brandId: "kay",
    name: "Stay Fix Matte Concealer", type: "concealer",
    finish: "matte", coverage: "full", image: "https://images.unsplash.com/photo-1612293908766-0e2e7b09a220?w=400&q=80",
    description: "Full-coverage matte concealer that stays crease-free all day. Covers dark circles, blemishes, and pigmentation.",
    stores: [{ name: "Nykaa", url: "https://www.nykaa.com/kay-beauty-stay-fix-concealer/p/245031" }],
    shades: [
      shade("Fair", "#ecccb4", "cool", 1), shade("Light Beige", "#dcb898", "neutral", 3), shade("Medium", "#c8a080", "warm", 4),
      shade("Warm Sand", "#b48864", "neutral", 5), shade("Caramel", "#88603c", "warm", 7), shade("Mocha", "#5c3c28", "neutral", 9),
    ],
  },

  // ========== HUDA BEAUTY ==========
  {
    id: "huda-foundation", brand: "huda", brandId: "huda",
    name: "#FauxFilter Foundation", type: "foundation",
    finish: "natural", coverage: "full", image: "https://images.unsplash.com/photo-1583663848855-6a69f8b30b8e?w=400&q=80",
    description: "Skin-like full-coverage foundation with a natural radiant finish. Enriched with argan oil and vitamin E.",
    howToUse: "Dispense one pump and blend with a damp sponge for medium coverage, or a brush for full coverage.",
    stores: [{ name: "Sephora", url: "https://www.sephora.com/product/huda-beauty-faux-filter-P123456" }, { name: "Nykaa", url: "https://www.nykaa.com/huda-beauty-faux-filter-foundation/p/245032" }],
    shades: [
      shade("Milky Lover", "#f2e0d0", "cool", 1), shade("Bread", "#e8ccb4", "neutral", 1), shade("Shortbread", "#e0c0a8", "warm", 2),
      shade("Pound Cake", "#d4b090", "neutral", 3), shade("Tapioca", "#c8a080", "warm", 4), shade("Coconut", "#b8906c", "neutral", 5),
      shade("Chestnut", "#a07854", "warm", 6), shade("Walnut", "#8c6440", "neutral", 7), shade("Pecan", "#785434", "warm", 8),
      shade("Gingersnap", "#644428", "neutral", 9), shade("Clove", "#50301c", "warm", 10), shade("Molasses", "#3c1c0c", "neutral", 11),
    ],
  },

  // ========== FENTY BEAUTY ==========
  {
    id: "fenty-foundation", brand: "fenty", brandId: "fenty",
    name: "Pro Filt'r Soft Matte Foundation", type: "foundation",
    finish: "matte", coverage: "medium-full", image: "https://images.unsplash.com/photo-1583241800698-e8ab01830a07?w=400&q=80",
    description: "Revolutionary foundation with 50 shades. Soft matte finish that blurs pores and controls oil without drying.",
    howToUse: "Shake well. Apply with fingertips, a sponge, or a brush. Builds easily for customizable coverage.",
    stores: [{ name: "Sephora", url: "https://www.sephora.com/product/fenty-beauty-pro-filtr-P123456" }, { name: "Nykaa", url: "https://www.nykaa.com/fenty-beauty-pro-filtr-foundation/p/245033" }],
    shades: [
      shade("100 - Porcelain", "#f5e4d4", "cool", 1), shade("110 - Ivory", "#ecd0b8", "warm", 1), shade("120 - Light", "#e0c0a4", "neutral", 2),
      shade("140 - Nude", "#d4b090", "neutral", 3), shade("150 - Warm Beige", "#c8a080", "warm", 4), shade("180 - Honey", "#b8906c", "warm", 5),
      shade("210 - Caramel", "#a07854", "neutral", 6), shade("230 - Toffee", "#8c6440", "warm", 7), shade("260 - Mocha", "#785434", "neutral", 8),
      shade("290 - Espresso", "#644428", "warm", 9), shade("310 - Cocoa", "#50301c", "neutral", 10), shade("370 - Deep", "#3c1c0c", "warm", 11),
      shade("410 - Dark", "#2c1008", "neutral", 12),
    ],
  },
  {
    id: "fenty-concealer", brand: "fenty", brandId: "fenty",
    name: "Pro Filt'r Concealer", type: "concealer",
    finish: "natural", coverage: "full", image: "https://images.unsplash.com/photo-1631730359584-3b6a8e3d5a3a?w=400&q=80",
    description: "Long-wearing, buildable concealer with a natural finish. Brightens under-eyes and covers blemishes.",
    stores: [{ name: "Sephora", url: "https://www.sephora.com/product/fenty-beauty-pro-filtr-concealer-P123456" }],
    shades: [
      shade("100 - Porcelain", "#f0dcc8", "cool", 1), shade("120 - Light", "#e0c0a4", "neutral", 2), shade("150 - Warm Beige", "#c8a080", "warm", 4),
      shade("180 - Honey", "#b8906c", "warm", 5), shade("210 - Caramel", "#a07854", "neutral", 6), shade("260 - Mocha", "#785434", "neutral", 8),
      shade("300 - Espresso", "#644428", "warm", 9), shade("370 - Deep", "#3c1c0c", "neutral", 11),
    ],
  },

  // ========== ESTÉE LAUDER ==========
  {
    id: "esteelauder-foundation", brand: "esteelauder", brandId: "esteelauder",
    name: "Double Wear Stay-in-Place Foundation", type: "foundation",
    finish: "natural", coverage: "medium-full", image: "https://images.unsplash.com/photo-1596704017254-9b121068fb31?w=400&q=80",
    description: "The iconic 24-hour wear foundation. Stays flawless through humidity, sweat, and tears. SPF 10.",
    howToUse: "Apply with fingertips or a damp sponge. Use one pump for medium coverage — build for full. Sets quickly, so work in sections.",
    stores: [{ name: "Nykaa", url: "https://www.nykaa.com/estee-lauder-double-wear-foundation/p/245034" }, { name: "Sephora", url: "https://www.sephora.com/product/estee-lauder-double-wear-P123456" }],
    shades: [
      shade("1N1 - Ivory Nude", "#f0d8c4", "neutral", 1), shade("1W1 - Bone", "#ecd0b8", "warm", 1), shade("2N1 - Desert Beige", "#e0c4a8", "neutral", 2),
      shade("2W1 - Dawn", "#d8b898", "warm", 3), shade("3N1 - Ivory Beige", "#d0b090", "neutral", 3), shade("3W1 - Tawny", "#c4a080", "warm", 4),
      shade("4N1 - Shell Beige", "#b8906c", "neutral", 5), shade("4W2 - Toasty Toffee", "#ac805c", "warm", 6), shade("5N1 - Tawny Olive", "#9c7450", "neutral", 6),
      shade("5W2 - Caramel", "#8c6844", "warm", 7), shade("6N1 - Rich Caramel", "#7c5834", "neutral", 8), shade("6W2 - Mocha", "#684828", "warm", 9),
      shade("7N1 - Deep Amber", "#58381c", "neutral", 10), shade("8N1 - Espresso", "#442414", "warm", 11),
    ],
  },
];

export default products;
export { brands };
export const bannerSlides = [
  { id: 1, title: "Find Your Perfect Shade", subtitle: "Answer a few questions and get matched to your ideal foundation, concealer, and skin tint across 10+ brands.", tag: "Shade Quiz", gradient: "from-pink-200 via-rose-100 to-purple-200" },
  { id: 2, title: "No More Shade Guessing", subtitle: "Indian skin tones deserve better. Science-backed matching for every undertone and depth level.", tag: "Inclusive Beauty", gradient: "from-purple-200 via-violet-100 to-indigo-200" },
  { id: 3, title: "Same Shade, Multiple Brands", subtitle: "Find your match across Maybelline, L'Oréal, MAC, Lakmé, Sugar, Fenty, and more.", tag: "Cross-Brand Matches", gradient: "from-amber-200 via-orange-100 to-pink-200" },
];
