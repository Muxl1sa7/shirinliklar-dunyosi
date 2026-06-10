import type { Product, TeamMember } from '../types';

const SIZES = ['1 kg', '1.5 kg', '2 kg', '3 kg'];
const FLAVORS = ['Shokolad', 'Vanil', "Qulupnay", 'Karamel'];

const STANDARD_HEALTH_NOTE =
  "Tarkibida shakar va yog' miqdori yuqori bo'lgani uchun qandli diabet kasalligi yoki parhez tutgan shaxslarga tavsiya etilmaydi.";

const DIET_HEALTH_NOTE =
  "Shakar o'rniga tabiiy shirin beruvchi moddalar (stevia/asal) ishlatilgan va kaloriya miqdori past — qandli diabet va parhez tutganlar uchun xavfsiz.";

export const cakes: Product[] = [
  {
    id: 'chocolate-dream',
    name: 'Shokoladli orzu',
    price: 125000,
    image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=800&q=80',
    type: 'cake',
    category: 'chocolate',
    description:
      'Eng sifatli shokolad va yangi ingredientlardan tayyorlangan mazali tort. Har qanday bayram uchun ajoyib tanlov, zavqli va shokoladga boy.',
    sizes: SIZES,
    flavors: FLAVORS,
    dietFriendly: false,
    healthNote: STANDARD_HEALTH_NOTE,
  },
  {
    id: 'red-velvet-cake',
    name: 'Red Velvet tort',
    price: 140000,
    image: 'https://images.unsplash.com/photo-1586985289906-406988974504?auto=format&fit=crop&w=800&q=80',
    type: 'cake',
    category: 'birthday',
    description:
      'Yumshoq red velvet biskvit va kremli pishloq krem bilan bezatilgan klassik tort. Tug\'ilgan kun bayramlari uchun mukammal.',
    sizes: SIZES,
    flavors: FLAVORS,
    dietFriendly: false,
    healthNote: STANDARD_HEALTH_NOTE,
  },
  {
    id: 'strawberry-cake',
    name: 'Qulupnayli tort',
    price: 130000,
    image: 'https://images.unsplash.com/photo-1565958011703-44f9829ba187?auto=format&fit=crop&w=800&q=80',
    type: 'cake',
    category: 'fruit',
    description:
      'Yangi qulupnaylar va yengil kremli biskvitdan tayyorlangan mazali tort. Yozgi bayramlar uchun ideal tanlov.',
    sizes: SIZES,
    flavors: FLAVORS,
    dietFriendly: false,
    healthNote: STANDARD_HEALTH_NOTE,
  },
  {
    id: 'caramel-cake',
    name: 'Karamelli tort',
    price: 130000,
    image: 'https://images.unsplash.com/photo-1571115177098-24ec42ed204d?auto=format&fit=crop&w=800&q=80',
    type: 'cake',
    category: 'special',
    description:
      'Boy karamel sous va yumshoq biskvit qatlamlaridan iborat shirin tort. Karamel ishqibozlari uchun ajoyib tanlov.',
    sizes: SIZES,
    flavors: FLAVORS,
    dietFriendly: false,
    healthNote: STANDARD_HEALTH_NOTE,
  },
  {
    id: 'ferrero-rocher-cake',
    name: 'Ferrero Rocher tort',
    price: 150000,
    image: 'https://images.unsplash.com/photo-1606890658317-7d14490b76fd?auto=format&fit=crop&w=800&q=80',
    type: 'cake',
    category: 'special',
    description:
      'Ferrero Rocher konfetlari va findiqli shokolad krem bilan bezatilgan hashamatli tort. Maxsus kunlar uchun mo\'ljallangan.',
    sizes: SIZES,
    flavors: FLAVORS,
    dietFriendly: false,
    healthNote: STANDARD_HEALTH_NOTE,
  },
  {
    id: 'oreo-cake',
    name: 'Oreo tort',
    price: 120000,
    image: 'https://images.unsplash.com/photo-1535141192574-5d4897c12636?auto=format&fit=crop&w=800&q=80',
    type: 'cake',
    category: 'chocolate',
    description:
      'Oreo pechenyelari va shokoladli krem bilan qatlamlangan, yoshlar orasida mashhur bo\'lgan mazali tort.',
    sizes: SIZES,
    flavors: FLAVORS,
    dietFriendly: false,
    healthNote: STANDARD_HEALTH_NOTE,
  },
  {
    id: 'blueberry-cake',
    name: "Ko'kateroqli tort",
    price: 125000,
    image: 'https://images.unsplash.com/photo-1519869325930-281384150729?auto=format&fit=crop&w=800&q=80',
    type: 'cake',
    category: 'fruit',
    description:
      'Yangi ko\'kateroq mevalar va yengil kremli biskvitdan tayyorlangan tabiiy va foydali tort.',
    sizes: SIZES,
    flavors: FLAVORS,
    dietFriendly: false,
    healthNote: STANDARD_HEALTH_NOTE,
  },
  {
    id: 'lemon-cake',
    name: 'Limonli tort',
    price: 125000,
    image: 'https://images.unsplash.com/photo-1519340241574-2cec6aef0c01?auto=format&fit=crop&w=800&q=80',
    type: 'cake',
    category: 'fruit',
    description:
      'Tetiklantiruvchi limon ta\'mi va yengil krem bilan tayyorlangan, yozgi kayfiyat uchun ajoyib tort.',
    sizes: SIZES,
    flavors: FLAVORS,
    dietFriendly: false,
    healthNote: STANDARD_HEALTH_NOTE,
  },
  {
    id: 'kitkat-cake',
    name: 'KitKat tort',
    price: 145000,
    image: 'https://images.unsplash.com/photo-1599785209707-a456fc1337bb?auto=format&fit=crop&w=800&q=80',
    type: 'cake',
    category: 'wedding',
    description:
      'KitKat shokoladlari bilan o\'ralgan, M&M\'s va shokolad drip bilan bezatilgan ko\'zga yoqimli tort.',
    sizes: SIZES,
    flavors: FLAVORS,
    dietFriendly: false,
    healthNote: STANDARD_HEALTH_NOTE,
  },
  {
    id: 'diet-oatmeal-cake',
    name: "Parhez bodring-yong'oqli tort",
    price: 110000,
    image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=800&q=80',
    type: 'cake',
    category: 'diet',
    description:
      "Shakarsiz, to'liq bug'doy uni va yong'oq asosida tayyorlangan, asal bilan shirinlangan yengil tort. Kaloriyasi past, tolaga boy.",
    sizes: SIZES,
    flavors: ['Yong\'oqli', 'Asalli'],
    dietFriendly: true,
    healthNote: DIET_HEALTH_NOTE,
  },
  {
    id: 'diet-stevia-cake',
    name: 'Steviyali shokoladli tort',
    price: 115000,
    image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=800&q=80',
    type: 'cake',
    category: 'diet',
    description:
      "Shakar o'rniga steviya bilan tayyorlangan, kam yog'li shokoladli biskvit asosidagi tort. Qandli diabet bilan og'rigan va parhez tutgan mijozlar uchun maxsus ishlab chiqilgan.",
    sizes: SIZES,
    flavors: ['Shokolad', "Yong'oqli"],
    dietFriendly: true,
    healthNote: DIET_HEALTH_NOTE,
  },
];

export const desserts: Product[] = [
  {
    id: 'macarons',
    name: 'Makaronlar',
    price: 60000,
    image: 'https://images.unsplash.com/photo-1569864358642-9d1684040f43?auto=format&fit=crop&w=800&q=80',
    type: 'dessert',
    category: 'macarons',
    description: 'Rang-barang va yengil frantsuz makaronlari, har xil ta\'mlarda.',
    dietFriendly: false,
    healthNote: STANDARD_HEALTH_NOTE,
  },
  {
    id: 'cupcake',
    name: 'Kapkeyk',
    price: 50000,
    image: 'https://images.unsplash.com/photo-1486427944299-d1955d23e34d?auto=format&fit=crop&w=800&q=80',
    type: 'dessert',
    category: 'cupcakes',
    description: 'Yumshoq biskvit va kremli bezak bilan tayyorlangan kichik shirinlik.',
    dietFriendly: false,
    healthNote: STANDARD_HEALTH_NOTE,
  },
  {
    id: 'brownie',
    name: 'Brauni',
    price: 40000,
    image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=800&q=80',
    type: 'dessert',
    category: 'brownies',
    description: 'Zich va shokoladga boy brownie, choy yoki kofe bilan ajoyib uyg\'unlikda.',
    dietFriendly: false,
    healthNote: STANDARD_HEALTH_NOTE,
  },
  {
    id: 'donut',
    name: 'Donut',
    price: 30000,
    image: 'https://images.unsplash.com/photo-1551106652-a5bcf4b29ab6?auto=format&fit=crop&w=800&q=80',
    type: 'dessert',
    category: 'donuts',
    description: 'Yumshoq va shirin glazurlangan donut, ertalabki nonushta uchun mukammal.',
    dietFriendly: false,
    healthNote: STANDARD_HEALTH_NOTE,
  },
  {
    id: 'cheesecake',
    name: 'Cheesecake',
    price: 75000,
    image: 'https://images.unsplash.com/photo-1567306301408-9b74779a11af?auto=format&fit=crop&w=800&q=80',
    type: 'dessert',
    category: 'cookies',
    description: 'Krem pishloqdan tayyorlangan, yumshoq va boy ta\'mli desert.',
    dietFriendly: false,
    healthNote: STANDARD_HEALTH_NOTE,
  },
  {
    id: 'tiramisu',
    name: 'Tiramisu',
    price: 70000,
    image: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?auto=format&fit=crop&w=800&q=80',
    type: 'dessert',
    category: 'cookies',
    description: 'Klassik italyan deserti — kofe va mascarpone krem qatlamlari bilan.',
    dietFriendly: false,
    healthNote: STANDARD_HEALTH_NOTE,
  },
  {
    id: 'panna-cotta',
    name: 'Panna Cotta',
    price: 65000,
    image: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=800&q=80',
    type: 'dessert',
    category: 'cookies',
    description: 'Yengil va silliq italyan kremli deserti, mevali sous bilan serviralanadi.',
    dietFriendly: false,
    healthNote: STANDARD_HEALTH_NOTE,
  },
  {
    id: 'cookies',
    name: 'Pechene',
    price: 35000,
    image: 'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?auto=format&fit=crop&w=800&q=80',
    type: 'dessert',
    category: 'cookies',
    description: 'Shokolad bo\'lakchalari bilan tayyorlangan uy sharoitidagi pechenyelar.',
    dietFriendly: false,
    healthNote: STANDARD_HEALTH_NOTE,
  },
];

export const allProducts: Product[] = [...cakes, ...desserts];

export const getProductById = (id: string): Product | undefined =>
  allProducts.find((p) => p.id === id);

export const team: TeamMember[] = [
  {
    id: 'sarah-johnson',
    name: 'Sarah Johnson',
    role: 'Bosh oshpaz',
    image: 'https://i.pravatar.cc/300?img=47',
  },
  {
    id: 'michael-brown',
    name: 'Michael Brown',
    role: 'Qandolatchi',
    image: 'https://i.pravatar.cc/300?img=12',
  },
  {
    id: 'emily-davis',
    name: 'Emily Davis',
    role: 'Tort dizayneri',
    image: 'https://i.pravatar.cc/300?img=32',
  },
  {
    id: 'james-wilson',
    name: 'James Wilson',
    role: 'Menejer',
    image: 'https://i.pravatar.cc/300?img=14',
  },
];
