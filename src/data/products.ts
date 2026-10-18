export interface Product {
  id: string;
  title: string;
  category: "flours" | "teas";
  categoryLabel: string;
  price: number;
  originalPrice: number;
  priceFormatted: string;
  originalPriceFormatted: string;
  discountBadge: string;
  image: string;
  link: string;
  rating: number;
  reviewCount: number;
  weight: string;
  tagline: string;
  description: string;
  benefits: string[];
  inStock: boolean;
}

export const PRODUCTS: Product[] = [
  {
    id: "prod-1",
    title: "Basic – Flour For General Health",
    category: "flours",
    categoryLabel: "Stone-Ground Chakki Flour",
    price: 1200,
    originalPrice: 1500,
    priceFormatted: "₨1,200",
    originalPriceFormatted: "₨1,500",
    discountBadge: "Save 20%",
    image: "/images/products/prod-1.jpg",
    link: "https://usmanzpure.com/product/flour-basic/",
    rating: 4.9,
    reviewCount: 48,
    weight: "5kg",
    tagline: "Everyday Wholesome Nutrition for the Entire Family",
    description:
      "Stone-ground chakki flour milled at low temperature from premium wheat and ancient grains. Retains 100% of the natural bran, germ, and germ oils with zero maida or chemical bleaching.",
    benefits: [
      "100% Whole Grain Stone-Ground",
      "Zero Maida & Zero Bleach",
      "High Dietary Fiber for Digestion",
      "Rich in Natural B-Vitamins & Minerals",
    ],
    inStock: true,
  },
  {
    id: "prod-2",
    title: "Chamomile Tea",
    category: "teas",
    categoryLabel: "Pure Herbal Infusion",
    price: 800,
    originalPrice: 1000,
    priceFormatted: "₨800",
    originalPriceFormatted: "₨1,000",
    discountBadge: "Save 20%",
    image: "/images/products/prod-2.jpg",
    link: "https://usmanzpure.com/product/chamomile-tea/",
    rating: 5.0,
    reviewCount: 64,
    weight: "50g",
    tagline: "Calming Floral Infusion for Restful Sleep & Stress Relief",
    description:
      "Hand-harvested whole chamomile flowers dried naturally under shade. Delivers an apple-like gentle aroma that eases anxiety, soothes upset stomachs, and supports deep, restorative sleep.",
    benefits: [
      "Naturally 100% Caffeine-Free",
      "Promotes Deep, Restful Sleep",
      "Soothes Digestive Discomfort",
      "Natural Anti-Inflammatory Properties",
    ],
    inStock: true,
  },
  {
    id: "prod-3",
    title: "Fat2Fuel Advance Multigrain Flour For Effective Weight Loss",
    category: "flours",
    categoryLabel: "Diet & Fitness Flour",
    price: 1150,
    originalPrice: 1500,
    priceFormatted: "₨1,150",
    originalPriceFormatted: "₨1,500",
    discountBadge: "Best Seller • Save 23%",
    image: "/images/products/prod-3.jpg",
    link: "https://usmanzpure.com/product/flour-weight-loss/",
    rating: 5.0,
    reviewCount: 112,
    weight: "5kg",
    tagline: "Formulated Multigrain Blend for High Satiety & Fat Metabolism",
    description:
      "Proprietary cold-milled blend of roasted barley, oats, chickpeas, and chia grains. Helps maintain prolonged fullness, prevents insulin spikes, and turns stored fat into everyday sustained energy.",
    benefits: [
      "Low Glycemic Index (GI < 50)",
      "High Satiety — Keeps You Full 5+ Hours",
      "Zero Cholesterol & Zero Added Sugars",
      "Stone-Ground at Cold Temperatures (<40°C)",
    ],
    inStock: true,
  },
  {
    id: "prod-4",
    title: "FENUGREEK Plus – Flour for Good Diabetic Control",
    category: "flours",
    categoryLabel: "Specialized Diabetic Flour",
    price: 1200,
    originalPrice: 1500,
    priceFormatted: "₨1,200",
    originalPriceFormatted: "₨1,500",
    discountBadge: "Doctor Recommended • Save 20%",
    image: "/images/products/prod-4.png",
    link: "https://usmanzpure.com/product/flour-fenugreek/",
    rating: 4.9,
    reviewCount: 97,
    weight: "5kg",
    tagline: "Slow-Release Complex Carbs Enriched with Pure Methi Seeds",
    description:
      "Carefully balanced ratio of organic methi (fenugreek) seeds, whole wheat, and soluble fibers. Helps regulate post-meal blood sugar levels and improves natural insulin sensitivity without bitter taste.",
    benefits: [
      "Enriched with Pure Organic Fenugreek",
      "Prevents Post-Meal Glucose Spikes",
      "Rich in Soluble Galactomannan Fiber",
      "Chakki Milled Without Preservatives",
    ],
    inStock: true,
  },
  {
    id: "prod-5",
    title: "Giggly Grains (Immunity Booster Multigrain Blend For Kids)",
    category: "flours",
    categoryLabel: "Kids Nutrition Flour",
    price: 1000,
    originalPrice: 1300,
    priceFormatted: "₨1,000",
    originalPriceFormatted: "₨1,300",
    discountBadge: "Kids Favorite • Save 23%",
    image: "/images/products/prod-5.jpg",
    link: "https://usmanzpure.com/product/flour-kids/",
    rating: 4.8,
    reviewCount: 53,
    weight: "5kg",
    tagline: "Soft, Delicious Rotis Packed with Iron, Calcium & Zinc for Growing Kids",
    description:
      "Mild tasting, easily digestible grains blended specifically for children's developmental needs. Makes ultra-soft rotis packed with natural plant proteins, iron, calcium, and bone-strengthening minerals.",
    benefits: [
      "Ultra Soft Roti Texture Kids Love",
      "Natural Plant Iron & Calcium Fortified",
      "Easy on Delicate Tummies",
      "100% Free of Artificial Flavors or Colors",
    ],
    inStock: true,
  },
  {
    id: "prod-6",
    title: "NutraPrime Gluten Free Multigrain Flour",
    category: "flours",
    categoryLabel: "Gluten-Free Flour",
    price: 900,
    originalPrice: 1300,
    priceFormatted: "₨900",
    originalPriceFormatted: "₨1,300",
    discountBadge: "Gluten-Free • Save 30%",
    image: "/images/products/prod-6.jpg",
    link: "https://usmanzpure.com/product/flour-gluten-free/",
    rating: 4.9,
    reviewCount: 71,
    weight: "2kg",
    tagline: "Certified Gluten-Free Chakki Flour for Celiac & Sensitive Digestion",
    description:
      "Crafted in a dedicated gluten-free facility using sorghum (jowar), pearl millet (bajra), corn, and brown rice. Deliciously light and pliable rotis without gastrointestinal inflammation or bloating.",
    benefits: [
      "100% Gluten-Free Tested & Certified",
      "Zero Bloating or Digestive Distress",
      "Pliable Dough for Easy Rolling",
      "High in Natural Prebiotics",
    ],
    inStock: true,
  },
  {
    id: "prod-7",
    title: "Olive Leaf Tea (For Diabetic Control and Cardiac Health)",
    category: "teas",
    categoryLabel: "Pure Herbal Infusion",
    price: 700,
    originalPrice: 1000,
    priceFormatted: "₨700",
    originalPriceFormatted: "₨1,000",
    discountBadge: "Save 30%",
    image: "/images/products/prod-7.jpg",
    link: "https://usmanzpure.com/product/olive-leaf-tea/",
    rating: 5.0,
    reviewCount: 82,
    weight: "50g",
    tagline: "Packed with Oleuropein for Healthy Blood Pressure & Heart Vitality",
    description:
      "Mediterranean olive leaves harvested young and gently dehydrated. Rich in the bio-active compound oleuropein, which supports healthy arterial elasticity, optimal blood pressure, and balanced fasting blood sugar.",
    benefits: [
      "High Concentration of Oleuropein",
      "Supports Healthy Blood Pressure",
      "Potent Free-Radical Scavenger",
      "Pleasant Herbal Earthy Flavor",
    ],
    inStock: true,
  },
  {
    id: "prod-8",
    title: "Oregano Tea",
    category: "teas",
    categoryLabel: "Pure Herbal Infusion",
    price: 800,
    originalPrice: 1000,
    priceFormatted: "₨800",
    originalPriceFormatted: "₨1,000",
    discountBadge: "Save 20%",
    image: "/images/products/prod-8.jpg",
    link: "https://usmanzpure.com/product/oregano-tea/",
    rating: 4.8,
    reviewCount: 39,
    weight: "50g",
    tagline: "Antimicrobial & Respiratory Shield with Natural Carvacrol",
    description:
      "Wild organic oregano leaves sun-dried to lock in essential oils carvacrol and thymol. A potent natural remedy for throat tickles, seasonal congestion, and gut bacterial balance.",
    benefits: [
      "Natural Immune System Booster",
      "Clears Respiratory Passages",
      "Soothes Seasonal Coughs & Chills",
      "Aromatic & Invigorating Taste",
    ],
    inStock: true,
  },
  {
    id: "prod-9",
    title: "Rosella Tea",
    category: "teas",
    categoryLabel: "Pure Herbal Infusion",
    price: 1000,
    originalPrice: 1250,
    priceFormatted: "₨1,000",
    originalPriceFormatted: "₨1,250",
    discountBadge: "Top Rated • Save 20%",
    image: "/images/products/prod-9.jpg",
    link: "https://usmanzpure.com/product/rosella-tea/",
    rating: 5.0,
    reviewCount: 140,
    weight: "50g",
    tagline: "Tangy Ruby-Red Hibiscus Sabdariffa Loaded with Vitamin C & Antioxidants",
    description:
      "Vibrant whole dried hibiscus (rosella) calyces. Brews into a gorgeous ruby-red tart beverage that accelerates lipid metabolism, detoxifies the liver, and refreshes the body whether hot or iced.",
    benefits: [
      "High in Natural Vitamin C & Polyphenols",
      "Natural Diuretic & Detox Support",
      "Delicious Hot or Iced With Honey",
      "Zero Artificial Colors or Additives",
    ],
    inStock: true,
  },
  {
    id: "prod-10",
    title: "Rosmary Tea",
    category: "teas",
    categoryLabel: "Pure Herbal Infusion",
    price: 800,
    originalPrice: 1000,
    priceFormatted: "₨800",
    originalPriceFormatted: "₨1,000",
    discountBadge: "Save 20%",
    image: "/images/products/prod-10.jpg",
    link: "https://usmanzpure.com/product/rosmary-tea/",
    rating: 4.9,
    reviewCount: 45,
    weight: "50g",
    tagline: "The Herb of Memory, Mental Clarity & Enhanced Circulation",
    description:
      "Selected rosemary leaves containing rosmarinic acid. Enhances cognitive concentration, stimulates micro-circulation to hair follicles and the brain, and revitalizes sluggish digestion.",
    benefits: [
      "Enhances Focus & Mental Alertness",
      "Stimulates Blood Circulation",
      "High in Rosmarinic Acid Antioxidant",
      "Crisp, Invigorating Pine Aroma",
    ],
    inStock: true,
  },
  {
    id: "prod-11",
    title: "Thyme Tea",
    category: "teas",
    categoryLabel: "Pure Herbal Infusion",
    price: 800,
    originalPrice: 1000,
    priceFormatted: "₨800",
    originalPriceFormatted: "₨1,000",
    discountBadge: "Save 20%",
    image: "/images/products/prod-11.jpg",
    link: "https://usmanzpure.com/product/thyme-tea/",
    rating: 4.8,
    reviewCount: 36,
    weight: "50g",
    tagline: "Chest Comfort, Bronchial Relief & Cellular Defense",
    description:
      "Pure Mediterranean culinary and therapeutic thyme leaves. Known since antiquity for soothing spasmodic coughs, opening bronchial airways, and promoting a clean, healthy gut microbiome.",
    benefits: [
      "Supports Clear Bronchial Airways",
      "Potent Antispasmodic & Antiseptic Action",
      "Promotes Balanced Gut Flora",
      "Warm, Comforting Herbal Taste",
    ],
    inStock: true,
  },
];

export interface BundleItem {
  id: string;
  title: string;
  badge: string;
  price: number;
  originalPrice: number;
  savings: number;
  image: string;
  includes: string[];
  description: string;
}

export const MEGA_BUNDLES: BundleItem[] = [
  {
    id: "bundle-1",
    title: "Fat Loss Transformation Combo",
    badge: "Mega Value • Save ₨700",
    price: 2050,
    originalPrice: 2750,
    savings: 700,
    image: "/images/products/prod-3.jpg",
    includes: [
      "Fat2Fuel Advance Multigrain Flour (5kg)",
      "Rosella Ruby Herbal Tea (50g)",
      "Complimentary Diet & Meal Schedule",
    ],
    description:
      "Our most popular weight loss combination. Replace commercial white atta with Fat2Fuel for all meals, and drink Rosella tea twice daily to boost metabolism and detox.",
  },
  {
    id: "bundle-2",
    title: "Diabetic Care & Heart Health Pack",
    badge: "Doctor Choice • Save ₨650",
    price: 1850,
    originalPrice: 2500,
    savings: 650,
    image: "/images/products/prod-4.png",
    includes: [
      "FENUGREEK Plus Diabetic Flour (5kg)",
      "Olive Leaf Cardiac Tea (50g)",
      "Diabetic Glycemic Guide",
    ],
    description:
      "A clinical pairing to support stable HbA1c levels. Soluble fenugreek fiber slows carb absorption while olive leaf oleuropein protects cardiovascular health.",
  },
  {
    id: "bundle-3",
    title: "Family Immunity & Vitality Pack",
    badge: "Family Size • Save ₨800",
    price: 2800,
    originalPrice: 3600,
    savings: 800,
    image: "/images/products/prod-5.jpg",
    includes: [
      "Giggly Grains Kids Immunity Flour (5kg)",
      "Basic Health Stone-Ground Flour (5kg)",
      "Chamomile Night Calming Tea (50g)",
    ],
    description:
      "Complete monthly wellness for parents and kids. High mineral stone-ground rotis for everyday energy, plus soothing chamomile for peaceful sleep.",
  },
];
