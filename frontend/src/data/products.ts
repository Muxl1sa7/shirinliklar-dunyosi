import type { Product, TeamMember } from '../types';

const SIZES = ['1 kg', '1.5 kg', '2 kg', '3 kg'];
const FLAVORS = ['Chocolate', 'Vanilla', 'Strawberry', 'Caramel'];

export const cakes: Product[] = [
  {
    id: 'chocolate-dream',
    name: 'Chocolate Dream',
    price: 25,
    image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=800&q=80',
    type: 'cake',
    category: 'chocolate',
    description:
      'Eng sifatli shokolad va yangi ingredientlardan tayyorlangan mazali tort. Har qanday bayram uchun ajoyib tanlov, zavqli va shokoladga boy.',
    sizes: SIZES,
    flavors: FLAVORS,
  },
  {
    id: 'red-velvet-cake',
    name: 'Red Velvet Cake',
    price: 28,
    image: 'https://images.unsplash.com/photo-1586985289906-406988974504?auto=format&fit=crop&w=800&q=80',
    type: 'cake',
    category: 'birthday',
    description:
      'Yumshoq red velvet biskvit va kremli pishloq krem bilan bezatilgan klassik tort. Tug\'ilgan kun bayramlari uchun mukammal.',
    sizes: SIZES,
    flavors: FLAVORS,
  },
  {
    id: 'strawberry-cake',
    name: 'Strawberry Cake',
    price: 26,
    image: 'https://images.unsplash.com/photo-1565958011703-44f9829ba187?auto=format&fit=crop&w=800&q=80',
    type: 'cake',
    category: 'fruit',
    description:
      'Yangi qulupnaylar va yengil kremli biskvitdan tayyorlangan mazali tort. Yozgi bayramlar uchun ideal tanlov.',
    sizes: SIZES,
    flavors: FLAVORS,
  },
  {
    id: 'caramel-cake',
    name: 'Caramel Cake',
    price: 26,
    image: 'https://images.unsplash.com/photo-1571115177098-24ec42ed204d?auto=format&fit=crop&w=800&q=80',
    type: 'cake',
    category: 'special',
    description:
      'Boy karamel sous va yumshoq biskvit qatlamlaridan iborat shirin tort. Karamel ishqibozlari uchun ajoyib tanlov.',
    sizes: SIZES,
    flavors: FLAVORS,
  },
  {
    id: 'ferrero-rocher-cake',
    name: 'Ferrero Rocher Cake',
    price: 30,
    image: 'https://images.unsplash.com/photo-1606890658317-7d14490b76fd?auto=format&fit=crop&w=800&q=80',
    type: 'cake',
    category: 'special',
    description:
      'Ferrero Rocher konfetlari va findiqli shokolad krem bilan bezatilgan hashamatli tort. Maxsus kunlar uchun mo\'ljallangan.',
    sizes: SIZES,
    flavors: FLAVORS,
  },
  {
    id: 'oreo-cake',
    name: 'Oreo Cake',
    price: 24,
    image: 'https://images.unsplash.com/photo-1535141192574-5d4897c12636?auto=format&fit=crop&w=800&q=80',
    type: 'cake',
    category: 'chocolate',
    description:
      'Oreo pechenyelari va shokoladli krem bilan qatlamlangan, yoshlar orasida mashhur bo\'lgan mazali tort.',
    sizes: SIZES,
    flavors: FLAVORS,
  },
  {
    id: 'blueberry-cake',
    name: 'Blueberry Cake',
    price: 25,
    image: 'https://images.unsplash.com/photo-1519869325930-281384150729?auto=format&fit=crop&w=800&q=80',
    type: 'cake',
    category: 'fruit',
    description:
      'Yangi ko\'kateroq mevalar va yengil kremli biskvitdan tayyorlangan tabiiy va foydali tort.',
    sizes: SIZES,
    flavors: FLAVORS,
  },
  {
    id: 'lemon-cake',
    name: 'Lemon Cake',
    price: 25,
    image: 'https://images.unsplash.com/photo-1519340241574-2cec6aef0c01?auto=format&fit=crop&w=800&q=80',
    type: 'cake',
    category: 'fruit',
    description:
      'Tetiklantiruvchi limon ta\'mi va yengil krem bilan tayyorlangan, yozgi kayfiyat uchun ajoyib tort.',
    sizes: SIZES,
    flavors: FLAVORS,
  },
  {
    id: 'kitkat-cake',
    name: 'KitKat Cake',
    price: 29,
    image: 'https://images.unsplash.com/photo-1599785209707-a456fc1337bb?auto=format&fit=crop&w=800&q=80',
    type: 'cake',
    category: 'wedding',
    description:
      'KitKat shokoladlari bilan o\'ralgan, M&M\'s va shokolad drip bilan bezatilgan ko\'zga yoqimli tort.',
    sizes: SIZES,
    flavors: FLAVORS,
  },
];

export const desserts: Product[] = [
  {
    id: 'macarons',
    name: 'Macarons',
    price: 12,
    image: 'https://images.unsplash.com/photo-1569864358642-9d1684040f43?auto=format&fit=crop&w=800&q=80',
    type: 'dessert',
    category: 'macarons',
    description: 'Rang-barang va yengil frantsuz makaronlari, har xil ta\'mlarda.',
  },
  {
    id: 'cupcake',
    name: 'Cupcake',
    price: 10,
    image: 'https://images.unsplash.com/photo-1486427944299-d1955d23e34d?auto=format&fit=crop&w=800&q=80',
    type: 'dessert',
    category: 'cupcakes',
    description: 'Yumshoq biskvit va kremli bezak bilan tayyorlangan kichik shirinlik.',
  },
  {
    id: 'brownie',
    name: 'Brownie',
    price: 8,
    image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=800&q=80',
    type: 'dessert',
    category: 'brownies',
    description: 'Zich va shokoladga boy brownie, choy yoki kofe bilan ajoyib uyg\'unlikda.',
  },
  {
    id: 'donut',
    name: 'Donut',
    price: 6,
    image: 'https://images.unsplash.com/photo-1551106652-a5bcf4b29ab6?auto=format&fit=crop&w=800&q=80',
    type: 'dessert',
    category: 'donuts',
    description: 'Yumshoq va shirin glazurlangan donut, ertalabki nonushta uchun mukammal.',
  },
  {
    id: 'cheesecake',
    name: 'Cheesecake',
    price: 15,
    image: 'https://images.unsplash.com/photo-1567306301408-9b74779a11af?auto=format&fit=crop&w=800&q=80',
    type: 'dessert',
    category: 'cookies',
    description: 'Krem pishloqdan tayyorlangan, yumshoq va boy ta\'mli desert.',
  },
  {
    id: 'tiramisu',
    name: 'Tiramisu',
    price: 14,
    image: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?auto=format&fit=crop&w=800&q=80',
    type: 'dessert',
    category: 'cookies',
    description: 'Klassik italyan deserti — kofe va mascarpone krem qatlamlari bilan.',
  },
  {
    id: 'panna-cotta',
    name: 'Panna Cotta',
    price: 13,
    image: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=800&q=80',
    type: 'dessert',
    category: 'cookies',
    description: 'Yengil va silliq italyan kremli deserti, mevali sous bilan serviralanadi.',
  },
  {
    id: 'cookies',
    name: 'Cookies',
    price: 7,
    image: 'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?auto=format&fit=crop&w=800&q=80',
    type: 'dessert',
    category: 'cookies',
    description: 'Shokolad bo\'lakchalari bilan tayyorlangan uy sharoitidagi pechenyelar.',
  },
];

export const allProducts: Product[] = [...cakes, ...desserts];

export const getProductById = (id: string): Product | undefined =>
  allProducts.find((p) => p.id === id);

export const team: TeamMember[] = [
  {
    id: 'sarah-johnson',
    name: 'Sarah Johnson',
    role: 'Head Chef',
    image: 'https://i.pravatar.cc/300?img=47',
  },
  {
    id: 'michael-brown',
    name: 'Michael Brown',
    role: 'Pastry Chef',
    image: 'https://i.pravatar.cc/300?img=12',
  },
  {
    id: 'emily-davis',
    name: 'Emily Davis',
    role: 'Cake Designer',
    image: 'https://i.pravatar.cc/300?img=32',
  },
  {
    id: 'james-wilson',
    name: 'James Wilson',
    role: 'Manager',
    image: 'https://i.pravatar.cc/300?img=14',
  },
];
