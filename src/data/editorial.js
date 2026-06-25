const quizOptions = {
  skinType: [
    { id: "oily", label: "Oily / Shiny", emoji: "✨", description: "Gets shiny quickly, enlarged pores — go for matte, oil-free", formulaTip: "Matte, oil-control formulas" },
    { id: "dry", label: "Dry / Flaky", emoji: "🏜️", description: "Tight, flaky patches — go for hydrating, radiant", formulaTip: "Hydrating, dewy formulas" },
    { id: "combination", label: "Combination", emoji: "🌀", description: "Oily T-zone, dry cheeks — go for balanced", formulaTip: "Natural, balanced formulas" },
    { id: "normal", label: "Normal / Balanced", emoji: "🌿", description: "Neither too oily nor too dry — most formulas work", formulaTip: "Most formulas work" },
  ],
  undertone: [
    { id: "cool", label: "Cool", emoji: "❄️", description: "Pink, red, or bluish hints — silver looks best on you", hex: "#f0c4c4", check: "Veins appear blue/purple" },
    { id: "warm", label: "Warm", emoji: "☀️", description: "Yellow, golden, or peachy hints — gold looks best on you", hex: "#f0d4a0", check: "Veins appear greenish" },
    { id: "neutral", label: "Neutral", emoji: "⚖️", description: "A mix of both — no strong pink or yellow", hex: "#e8c8b0", check: "Veins appear blue-green" },
    { id: "olive", label: "Olive", emoji: "🫒", description: "Greenish or ashy — very common in Indian skin", hex: "#d4c0a0", check: "Veins are hard to see" },
  ],
  depth: [
    { id: "fair", label: "Fair", emoji: "🌸", description: "Very light — burns easily in the sun", depthRange: "1-2" },
    { id: "light", label: "Light", emoji: "🌼", description: "Light to light-medium — tans minimally", depthRange: "3-4" },
    { id: "medium", label: "Medium", emoji: "🌻", description: "Medium beige to tan — most common for Indian skin", depthRange: "5-6" },
    { id: "tan", label: "Tan", emoji: "🌺", description: "Tan to warm brown — common across central India", depthRange: "7-8" },
    { id: "brown", label: "Brown", emoji: "🌹", description: "Brown to deep brown — common in South India", depthRange: "9-10" },
    { id: "deep", label: "Deep", emoji: "🌑", description: "Deep to dark — often underserved by mainstream brands", depthRange: "11-12" },
  ],
  coverage: [
    { id: "sheer", label: "Sheer", emoji: "🫧", description: "Very light, barely-there — evens out just a little" },
    { id: "light", label: "Light", emoji: "☁️", description: "Natural, evens out skin tone — looks like skin" },
    { id: "medium", label: "Medium", emoji: "🌤️", description: "Buildable, hides most imperfections — everyday perfect" },
    { id: "full", label: "Full", emoji: "☀️", description: "Maximum coverage, flawless finish — glam mode" },
  ],
  finish: [
    { id: "matte", label: "Matte", emoji: "🌸", description: "Shine-free, velvety look — great for oily skin" },
    { id: "natural", label: "Natural", emoji: "🌿", description: "Skin-like, satin finish — looks like you, but better" },
    { id: "radiant", label: "Radiant", emoji: "✨", description: "Dewy, luminous glow — lit-from-within" },
    { id: "satin", label: "Satin", emoji: "💎", description: "Soft sheen, balanced — in-between matte & dewy" },
  ],
};

export const quizSteps = [
  { id: "skinType", title: "What's Your Skin Like?", subtitle: "Oily, dry, or somewhere in between? This tells us which formula will work best for you.", type: "single", options: quizOptions.skinType },
  { id: "undertone", title: "Let's Find Your Undertone", subtitle: "Look at your wrist veins in natural light. The colour tells you everything.", type: "single", options: quizOptions.undertone },
  { id: "depth", title: "How Light or Dark Is Your Skin?", subtitle: "From fair to deep — pick the range closest to yours. We'll refine from there.", type: "single", options: quizOptions.depth },
  { id: "coverage", title: "How Much Coverage?", subtitle: "From barely-there to full glam — how much do you want your foundation to do?", type: "single", options: quizOptions.coverage },
  { id: "finish", title: "What Vibe Do You Want?", subtitle: "Matte = shine-free. Radiant = dewy glow. Natural = your skin but better.", type: "single", options: quizOptions.finish },
];

export const undertoneGuide = {
  cool: {
    title: "Cool Undertone",
    description: "Your skin has pink, red, or bluish undertones. You look best in silver jewellery and your veins appear blue or purple.",
    traits: ["Veins appear blue/purple", "Silver jewellery flatters you", "You burn easily in the sun", "Your skin has pink/reddish hints"],
    tips: ["Look for foundations labelled 'Cool', 'Rose', or 'Porcelain'", "Shades with 'C' or 'NW' (MAC) prefixes work well", "Pink and rose-toned foundations will match your neck", "Avoid overly yellow foundations — they'll look muddy"],
    shades: ["#f0c4c4", "#e8b0b0", "#d89c9c", "#c88888"],
  },
  warm: {
    title: "Warm Undertone",
    description: "Your skin has yellow, golden, or peachy undertones. Gold jewellery complements you, and your veins look greenish.",
    traits: ["Veins appear greenish", "Gold jewellery flatters you", "You tan easily", "Your skin has yellow/golden hints"],
    tips: ["Look for foundations labelled 'Warm', 'Golden', or 'Sand'", "Shades with 'W' or 'NC' (MAC) prefixes work well", "Yellow and golden-toned foundations will match seamlessly", "Avoid pink foundations — they'll look ashy"],
    shades: ["#f0d4a0", "#e8c490", "#d8b480", "#c8a470"],
  },
  neutral: {
    title: "Neutral Undertone",
    description: "Your skin has a balanced mix of warm and cool tones. Both gold and silver jewellery look good on you.",
    traits: ["Veins appear blue-green", "Both gold and silver suit you", "You can tan and occasionally burn", "Hard to tell if you're warm or cool"],
    tips: ["Look for foundations labelled 'Neutral' or 'Beige'", "Shades with 'N' prefixes work well", "You have the widest range of matching options", "Mix warm and cool shades if you can't find a perfect neutral"],
    shades: ["#e8c8b0", "#d8b8a0", "#c8a890", "#b89880"],
  },
  olive: {
    title: "Olive Undertone",
    description: "Your skin has greenish or ashy undertones — very common in Indian skin. You might struggle finding foundations that aren't too pink or too orange.",
    traits: ["Greenish/ashy tone to your skin", "Both jewellery types can work", "Foundation often looks too pink or too orange", "Your neck and face may have different tones"],
    tips: ["Look for foundations labelled 'Olive' or 'Golden'", "MAC 'NC' shades often work well for olive skin", "Green colour correctors can help adjust mismatched foundation", "Mix two shades if needed — olive is hard to match off the shelf"],
    shades: ["#d4c0a0", "#c4b090", "#b4a080", "#a49070"],
  },
};

export const skinDepthGuide = {
  fair: { title: "Fair Skin", description: "Very light skin that often burns in the sun. Common in North Indian and Kashmiri regions.", depths: [1, 2] },
  light: { title: "Light Skin", description: "Light skin with beige undertones. Tans minimally.", depths: [3, 4] },
  medium: { title: "Medium Skin", description: "Medium beige to tan skin. The most common range for Indian women.", depths: [5, 6] },
  tan: { title: "Tan Skin", description: "Tan to warm brown skin. Common across central and western India.", depths: [7, 8] },
  brown: { title: "Brown Skin", description: "Brown to deep brown skin. Common in South Indian and North-East regions.", depths: [9, 10] },
  deep: { title: "Deep Skin", description: "Deep to dark skin tones. Often underserved by mainstream beauty brands.", depths: [11, 12] },
};

export const brandsData = [
  { name: "Maybelline New York", id: "maybelline", image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&q=80", tag: "Drugstore Favorite", description: "Affordable, accessible, and wide shade range. Great for everyday wear." },
  { name: "L'Oréal Paris", id: "loreal", image: "https://images.unsplash.com/photo-1570194065650-d99fb4b8ccb0?w=400&q=80", tag: "Best Coverage", description: "Infallible range offers exceptional longevity. Great tan-to-brown options." },
  { name: "Lakmé", id: "lakme", image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=400&q=80", tag: "Made for India", description: "India's own beauty brand. Formulated specifically for Indian skin tones and climate." },
  { name: "Sugar Cosmetics", id: "sugar", image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&q=80", tag: "Vegan & Cruelty-Free", description: "Modern Indian brand with great shade range for medium to deep skin." },
  { name: "M·A·C Cosmetics", id: "mac", image: "https://images.unsplash.com/photo-1583241800698-e8ab01830a07?w=400&q=80", tag: "Pro Artist Choice", description: "The gold standard for shade matching. NC/NW system is the industry benchmark." },
  { name: "Nykaa Cosmetics", id: "nykaa", image: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=400&q=80", tag: "Homegrown Hero", description: "India's largest beauty retailer's own brand. Great for fair-to-medium skin." },
  { name: "Fenty Beauty", id: "fenty", image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&q=80", tag: "50 Shades of Awesome", description: "Revolutionized inclusive beauty. Every skin tone is represented." },
  { name: "Kay Beauty", id: "kay", image: "https://images.unsplash.com/photo-1559467272-0c2bb9875d4a?w=400&q=80", tag: "Cruelty-Free Indian Brand", description: "Katrina Kaif's beauty brand with great Indian shade matching." },
  { name: "Estée Lauder", id: "esteelauder", image: "https://images.unsplash.com/photo-1612817288484-6f916006741a?w=400&q=80", tag: "Luxury Icon", description: "Double Wear is legendary for a reason. Premium, long-wearing, shade-diverse." },
  { name: "Huda Beauty", id: "huda", image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=400&q=80", tag: "Influencer Born", description: "Huda Kattan's brand offers excellent options for medium-to-deep skin tones." },
];

export const blogPosts = [
  { id: 1, title: "How to Find Your Undertone in 30 Seconds", category: "Shade Matching", readTime: "3 min read", image: "https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?w=800&q=80", excerpt: "Look at your wrist veins. Blue/purple? You're cool. Greenish? You're warm. Both? Neutral. Can't tell? You might be olive!" },
  { id: 2, title: "Why Your Foundation Looks Ashy (And How to Fix It)", category: "Foundation Tips", readTime: "4 min read", image: "https://images.unsplash.com/photo-1559467272-0c2bb9875d4a?w=800&q=80", excerpt: "Ashy foundation usually means your undertone is mismatched. Learn how to spot the signs and find your true match." },
  { id: 3, title: "Best Foundations for Indian Skin Tones", category: "Buying Guide", readTime: "5 min read", image: "https://images.unsplash.com/photo-1612817288484-6f916006741a?w=800&q=80", excerpt: "From Maybelline to Fenty — we break down which brands actually cater to the full spectrum of Indian skin tones." },
  { id: 4, title: "The Olive Undertone Guide", category: "Skincare", readTime: "4 min read", image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800&q=80", excerpt: "Olive undertones are one of the most common in India but the hardest to match. Here's everything you need to know." },
];

export const faqs = [
  { q: "How does SkinSync match my shade?", a: "We ask about your undertone, skin depth, skin type, coverage, and finish preferences. Our engine matches you to the best product formulas first, then finds your exact shade across our database." },
  { q: "Is this accurate?", a: "Shade matching is inherently subjective — lighting, screens, and personal perception all affect it. We use standardized undertone and depth categories to give you the closest possible matches. Always test in natural light before purchasing." },
  { q: "Which brands do you support?", a: "Currently 10+ brands: Maybelline, L'Oréal, Lakmé, Sugar, M·A·C, Nykaa, Kay Beauty, Huda Beauty, Fenty Beauty, and Estée Lauder. We're adding more every month." },
  { q: "Do you sell products?", a: "No — we're a matching tool. We provide affiliate links to partner stores (Nykaa, Amazon, Myntra, Sephora) where you can purchase your matched shades." },
  { q: "How do I find my undertone?", a: "The easiest way: check your wrist veins in natural light. Blue/purple = cool, greenish = warm, both = neutral, can't tell = olive. Try our quiz for a detailed assessment." },
  { q: "What's the difference between foundation and concealer shades?", a: "Concealer is typically one shade lighter than your foundation for under-eyes, or the exact shade for spot concealing. Our quiz considers this and recommends both." },
];
