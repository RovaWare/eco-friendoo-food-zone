/**
 * ─────────────────────────────────────────────────────────────
 *  Eco FriendoO Food Zone — EDIT YOUR BUSINESS DETAILS HERE
 * ─────────────────────────────────────────────────────────────
 *  Everything shown on the website (contact, links, menu, reviews)
 *  is driven from this single file.
 */

const MAPS_QUERY = encodeURIComponent("Eco FriendoO Food Zone, Link Road, Betul, Madhya Pradesh 460001");

export const SITE = {
  name: "Eco FriendoO Food Zone",
  shortName: "Eco FriendoO",
  category: "Cafe · Food Zone",
  address: "Link Road, Betul, Madhya Pradesh 460001, India",
  addressLines: ["Link Road, Betul", "Madhya Pradesh 460001, India"],
  rating: 4.2,
  reviews: 17,
  priceRange: "₹1 – ₹200 per person",

  /** Add your phone number, e.g. "+919876543210". While empty, CALL NOW opens your Google listing (which shows your number). */
  phone: "",
  /** Add your email if you want it shown in the footer. */
  email: "",

  /** Ordering link — replace with your Zomato / Swiggy / WhatsApp link when available. */
  orderUrl: `https://www.google.com/maps/search/?api=1&query=${MAPS_QUERY}`,
  mapsUrl: `https://www.google.com/maps/search/?api=1&query=${MAPS_QUERY}`,
  directionsUrl: `https://www.google.com/maps/dir/?api=1&destination=${MAPS_QUERY}`,
  mapEmbed: `https://maps.google.com/maps?q=${MAPS_QUERY}&t=&z=16&ie=UTF8&iwloc=&output=embed`,

  /** Replace with your real social profile URLs. */
  socials: {
    instagram: "https://www.instagram.com/",
    facebook: "https://www.facebook.com/",
    whatsapp: "", // e.g. "https://wa.me/919876543210"
  },
};

export const callHref = () => (SITE.phone ? `tel:${SITE.phone}` : SITE.mapsUrl);

export const NAV = [
  { id: "home", label: "Home" },
  { id: "showcase", label: "Signature" },
  { id: "about", label: "About" },
  { id: "menu", label: "Menu" },
  { id: "reviews", label: "Reviews" },
  { id: "visit", label: "Visit" },
];

export const IMG = {
  pizza: "images/hero-pizza.jpg",
  burger: "images/burger.jpg",
  pasta: "images/pasta.jpg",
  coffee: "images/coldcoffee.jpg",
  sandwich: "images/sandwich.jpg",
  basil: "images/basil.jpg",
  tomato: "images/tomato.jpg",
  chili: "images/chili.jpg",
  interior: "images/interior.jpg",
};

export const SHOWCASE = [
  { name: "Cheesy Pizza", kicker: "Loved by our guests", desc: "Stone-baked crust, molten cheese and fresh toppings — the slice our customers keep coming back for.", img: IMG.pizza, accent: "#ff7a1a" },
  { name: "Loaded Burger", kicker: "Stacked high", desc: "Soft toasted bun, crisp greens and a melt of cheese in every satisfying bite.", img: IMG.burger, accent: "#f5b82e" },
  { name: "Creamy Pasta", kicker: "Comfort in a bowl", desc: "Silky sauce, herbs and parmesan — warm, rich and made to share (or not).", img: IMG.pasta, accent: "#ff5a3c" },
  { name: "Grilled Sandwich", kicker: "Golden & crunchy", desc: "Toasted to perfection with melted cheese and fresh vegetables inside.", img: IMG.sandwich, accent: "#ffb347" },
  { name: "Cold Coffee", kicker: "Chill moments", desc: "Creamy, chilled and topped with indulgence — your perfect refreshing pause.", img: IMG.coffee, accent: "#d9a35b" },
];

/**
 * MENU — placeholder entries.
 * The restaurant's official menu & prices were not provided, so prices are left as `null`
 * (shown as "Ask at counter"). Replace `name`, `desc` and `price` (number in ₹) with your actual menu.
 */
export type MenuItem = {
  name: string;
  desc: string;
  price: number | null;
  img: string;
  category: string;
  tag?: string;
};

export const MENU_CATEGORIES = ["All", "Pizza", "Burgers", "Sandwiches", "Pasta", "Snacks", "Beverages"];

export const MENU: MenuItem[] = [
  { category: "Pizza", name: "Pizza", desc: "Our guest-favourite cheesy pizza. Edit this entry with your pizza varieties.", price: null, img: IMG.pizza, tag: "Guest Favourite" },
  { category: "Pizza", name: "Veg Pizza (Placeholder)", desc: "Add your veg pizza name, toppings and price here.", price: null, img: "https://images.pexels.com/photos/16203831/pexels-photo-16203831.jpeg?auto=compress&cs=tinysrgb&w=800" },
  { category: "Burgers", name: "Burger (Placeholder)", desc: "Add your burger name, description and price here.", price: null, img: IMG.burger },
  { category: "Sandwiches", name: "Grilled Sandwich (Placeholder)", desc: "Add your sandwich name, description and price here.", price: null, img: IMG.sandwich },
  { category: "Pasta", name: "Pasta (Placeholder)", desc: "Add your pasta name, description and price here.", price: null, img: IMG.pasta },
  { category: "Snacks", name: "French Fries (Placeholder)", desc: "Add your snack name, description and price here.", price: null, img: "https://images.pexels.com/photos/39034199/pexels-photo-39034199.jpeg?auto=compress&cs=tinysrgb&w=800" },
  { category: "Snacks", name: "Momos (Placeholder)", desc: "Add your snack name, description and price here.", price: null, img: "https://images.pexels.com/photos/18803174/pexels-photo-18803174.jpeg?auto=compress&cs=tinysrgb&w=800" },
  { category: "Beverages", name: "Cold Coffee (Placeholder)", desc: "Add your beverage name, description and price here.", price: null, img: IMG.coffee },
  { category: "Beverages", name: "Shake (Placeholder)", desc: "Add your shake / mocktail name, description and price here.", price: null, img: "https://images.pexels.com/photos/16825482/pexels-photo-16825482.jpeg?auto=compress&cs=tinysrgb&w=800" },
];

/** Real Google review excerpts. Star values per review can be adjusted to match Google. */
export const REVIEWS = [
  { text: "Delicious food, great service and portion sizes were really good.", stars: 5, author: "Google Reviewer" },
  { text: "Very good pizza in taste like dominos", stars: 4, author: "Google Reviewer" },
  { text: "Very bad service and worst staff.", stars: 1, author: "Google Reviewer" },
];
