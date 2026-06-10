import { Link } from 'react-router-dom';
import { FiFacebook, FiTwitter, FiInstagram } from 'react-icons/fi';
import { FaPinterestP } from 'react-icons/fa';
import { GiCupcake } from 'react-icons/gi';

const quickLinks = [
  { to: '/', label: 'Bosh sahifa' },
  { to: '/cakes', label: 'Tortlar' },
  { to: '/desserts', label: 'Desertlar' },
  { to: '/custom-order', label: 'Maxsus buyurtma' },
  { to: '/about', label: 'Biz haqimizda' },
  { to: '/contact', label: "Bog'lanish" },
];

const customerService = [
  'Mening hisobim',
  'Buyurtmani kuzatish',
  'Sevimlilar',
  'Foydalanish shartlari',
  'Maxfiylik siyosati',
  'Savol-javoblar',
];

export default function Footer() {
  return (
    <footer className="bg-brown-700 text-brown-50">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-4 lg:px-8">
        <div>
          <Link to="/" className="flex items-center gap-2 font-display text-2xl font-bold text-white">
            <GiCupcake className="text-3xl text-brown-200" />
            Sweet Dreams
          </Link>
          <p className="mt-4 text-sm leading-relaxed text-brown-100/80">
            Biz sizga eng sifatli mahsulotlardan foydalanib, mazali shirinliklarni tayyorlaymiz.
          </p>
          <div className="mt-5 flex gap-3">
            {[FiFacebook, FiTwitter, FaPinterestP, FiInstagram].map((Icon, i) => (
              <a
                key={i}
                href="#"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-brown-600 text-white transition-colors hover:bg-brown-500"
                aria-label="Ijtimoiy tarmoq"
              >
                <Icon size={16} />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h3 className="mb-4 font-display text-lg font-semibold text-white">Tezkor havolalar</h3>
          <ul className="space-y-2 text-sm text-brown-100/80">
            {quickLinks.map((link) => (
              <li key={link.to}>
                <Link to={link.to} className="transition-colors hover:text-white">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="mb-4 font-display text-lg font-semibold text-white">Mijozlarga xizmat</h3>
          <ul className="space-y-2 text-sm text-brown-100/80">
            {customerService.map((item) => (
              <li key={item}>
                <a href="#" className="transition-colors hover:text-white">
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="mb-4 font-display text-lg font-semibold text-white">Bog'lanish</h3>
          <ul className="space-y-2 text-sm text-brown-100/80">
            <li>+998 90 123 45 67</li>
            <li>info@sweetdreams.uz</li>
            <li>Toshkent, O'zbekiston</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-brown-600 py-5 text-center text-sm text-brown-100/70">
        © {new Date().getFullYear()} Sweet Dreams. Barcha huquqlar himoyalangan.
      </div>
    </footer>
  );
}
