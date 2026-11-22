export const NAV_LINKS = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Menu", href: "#menu" },
  { label: "Franchise", href: "#franchise" },
  { label: "Locations", href: "#locations" },
  { label: "Gallery", href: "#gallery" },
  { label: "Contact", href: "#contact" },
];

export const MARQUEE_ITEMS = [
  "Masala Dosa",
  "Filter Coffee",
  "Idli Sambar",
  "Medu Vada",
  "Ghee Roast Dosa",
  "Chettinad Podi Idli",
  "Banana Leaf Meals",
  "Cheese Uttapam",
  "Mysore Masala Dosa",
];

export const SIGNATURE_DISHES = [
  {
    id: "idli",
    name: "Steamed Idli",
    price: "₹89",
    tag: "Breakfast Icon",
    desc: "Cloud-soft, pillowy idlis steaming fresh from the vessel — served with piping-hot sambar and freshly ground coconut chutney.",
    image: "/images/idli.jpg",
    alt: "Steamed idli with sambar and chutney served on brass plate",
  },
  {
    id: "vada",
    name: "Medu Vada",
    price: "₹99",
    tag: "Crispy Classic",
    desc: "Golden, crisp-on-the-outside and cloud-on-the-inside urad dal vadas, tempered with curry leaves — dipped in sambar heaven.",
    image: "/images/vada.jpg",
    alt: "Crispy medu vada with sambar and coconut chutney",
  },
  {
    id: "upma",
    name: "Upma",
    price: "₹129",
    tag: "Comfort Bowl",
    desc: "Slow-roasted semolina folded with garden vegetables, cashews and tempered mustard — a warm hug in a brass bowl.",
    image: "/images/upma.jpg",
    alt: "Vegetable upma garnished with cashews and coriander in brass bowl",
  },
  {
    id: "uttapam",
    name: "Cheese Veg Uttapam",
    price: "₹259",
    tag: "Signature Indulgence",
    desc: "Our signature thick uttapam loaded with garden vegetables, crowned with golden molten cheese — the dish that built our name.",
    image: "/images/uttapam.jpg",
    alt: "Cheese vegetable uttapam with melted cheese on dark plate",
  },
];

export const GALLERY_ITEMS = [
  { src: "/images/crispy-dosa.jpg", caption: "The Ghee Roast Edge", sub: "Crisp, laced & golden" },
  { src: "/images/thali.jpg", caption: "The Banana Leaf Feast", sub: "Meals the traditional way" },
  { src: "/images/coffee.jpg", caption: "The Iconic Filter Coffee", sub: "Froth poured with love" },
  { src: "/images/story.jpg", caption: "The Tawa Ritual", sub: "Batter spread by hand, every dawn" },
  { src: "/images/hero-dosa.jpg", caption: "The Masala Dosa", sub: "Our most-loved signature" },
  { src: "/images/restaurant.jpg", caption: "The Kafe Experience", sub: "Warm teak, brass & light" },
];

export type Location = {
  id: number;
  city: string;
  area: string;
  address: string;
  state: string;
  image: string;
  tag: string;
};

const IMG = ["/images/restaurant.jpg", "/images/thali.jpg", "/images/hero-dosa.jpg", "/images/crispy-dosa.jpg"];

export const LOCATIONS: Location[] = [
  { id: 1, city: "Jammu", area: "Bahu Plaza", address: "Shop No. 40, B-1 North Block, Bahu Plaza, Jammu – 180012", state: "Jammu & Kashmir", image: IMG[0], tag: "Jammu & Kashmir" },
  { id: 2, city: "Indore — Silicon City", area: "Pulak City", address: "Teenam Foods, B-388, Pulak City, Near Pulak City Main Gate No 2, Silicon City, Indore – 452012", state: "Madhya Pradesh", image: IMG[2], tag: "Madhya Pradesh" },
  { id: 3, city: "Ahmedabad", area: "Gota", address: "Shop No. 6, Olive Greens, Sarkhej–Gandhinagar Highway, beside Vodafone Tower, Gota, Ahmedabad, Gujarat 382481", state: "Gujarat", image: IMG[0], tag: "Gujarat" },
  { id: 4, city: "Surat", area: "VIP Road", address: "Shop No 36-37, Ground Floor, Sai Ashish Trade Centre, Near Poonyabhumi, 2nd VIP Road, Surat, Gujarat – 395017", state: "Gujarat", image: IMG[1], tag: "Gujarat" },
  { id: 5, city: "Jodhpur", area: "Jhalamand", address: "Shop No. FF-206, Indiabulls Mega Mall, Vijay Raje Nagar Pali Highway, Jhalamand, Jodhpur", state: "Rajasthan", image: IMG[3], tag: "Rajasthan" },
  { id: 6, city: "Indore — Dutt Nagar", area: "Rajendra Nagar", address: "Dutt Nagar, Rajendra Nagar, Indore, Madhya Pradesh 452012", state: "Madhya Pradesh", image: IMG[1], tag: "Madhya Pradesh" },
  { id: 7, city: "Indore — Veda High Street", area: "Manik Bagh Road", address: "Ground Floor, Shop No 4 & 5, Veda High Street, Plot No. 8, Palasiya Colony, Manik Bagh Road, Indore – 452007", state: "Madhya Pradesh", image: IMG[2], tag: "Madhya Pradesh" },
  { id: 8, city: "Akola", area: "Ramnagar", address: "Ramnagar, near Kala Maroti Mandir, beside Trimurti Heights (Coffea), Akola – 444001", state: "Maharashtra", image: IMG[0], tag: "Maharashtra" },
  { id: 9, city: "Kishangarh", area: "Madanganj", address: "Moonland Bae, Snow Yard, Coffea, London Street, Industrial Area, Madanganj, Kishangarh, Rajasthan 305801", state: "Rajasthan", image: IMG[3], tag: "Rajasthan" },
  { id: 10, city: "Beed", area: "Canal Road", address: "Mahalaxmi Tower, Nagar Naka, Canal Road, Nagar Road, Beed – 431122", state: "Maharashtra", image: IMG[1], tag: "Maharashtra" },
  { id: 11, city: "Chhindwara", area: "Parasiya Road", address: "4th Floor, Dwivedi Tower, Near Claris Hospital, Parasiya Road, Chhindwara, M.P. – 480001", state: "Madhya Pradesh", image: IMG[2], tag: "Madhya Pradesh" },
  { id: 12, city: "Gandhidham", area: "Mundra Road", address: "Riva Farms, Survey No 212-2/3, Shivay–Mathak, Mundra Road, Gandhidham", state: "Gujarat", image: IMG[3], tag: "Gujarat" },
];

export const LOCATION_FILTERS = ["All", "Gujarat", "Madhya Pradesh", "Maharashtra", "Rajasthan", "Jammu & Kashmir"];

export const MAPS_QUERY = (address: string) =>
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent("Dakshineswaram Kafe " + address)}`;

export const CONTACT = {
  phonePrimary: "+91 62321 63621",
  phoneSecondary: "+91 89620 38794",
  email: "info@dakshineswaramkafe.com",
  hours: "Mon – Sun · 7:00 AM to 11:00 PM",
  headOffice:
    "405, Shekhar Central, AB Road, Manorama Ganj, Indore, Madhya Pradesh – 452001",
  registeredOffice:
    "108-A, Shekhar Central, AB Road, Manorama Ganj, Indore, Madhya Pradesh – 452018",
  corporateOffice:
    "Office No. 602, Kanakia Atrium 2, Behind Courtyard Marriott, Hanuman Nagar, Andheri-Kurla Road, Andheri East, Mumbai – 400093",
};

export const FRANCHISE_STATS = [
  { value: 12, suffix: "+", label: "Outlets Across India" },
  { value: 8, suffix: "", label: "Cities & Counting" },
  { value: 5, suffix: "", label: "States Served" },
  { value: 100, suffix: "%", label: "Pure Vegetarian" },
];
