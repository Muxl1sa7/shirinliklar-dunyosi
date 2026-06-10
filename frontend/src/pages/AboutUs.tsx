import PageHeader from '../components/PageHeader';
import { team } from '../data/products';
import { FiCheckCircle } from 'react-icons/fi';

const highlights = ['Sifatli mahsulotlar', 'Professional jamoa', "Mijozlar ishonchi"];

export default function AboutUs() {
  return (
    <div>
      <PageHeader title="Biz haqimizda" />

      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div>
            <h2 className="font-display text-3xl font-bold text-brown-800 sm:text-4xl">Bizning tariximiz</h2>
            <p className="mt-4 leading-relaxed text-brown-600">
              Sweet Dreams 2018-yilda tashkil topgan. Bizning maqsadimiz — har bir mijozga eng
              mazali va chiroyli shirinliklarni taqdim etish. Biz sifat, ishonch va muhabbat
              bilan ishlaymiz.
            </p>
            <ul className="mt-6 space-y-3">
              {highlights.map((item) => (
                <li key={item} className="flex items-center gap-3 text-brown-700">
                  <FiCheckCircle className="text-brown-400" size={20} />
                  <span className="font-medium">{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="overflow-hidden rounded-3xl">
            <img
              src="https://images.unsplash.com/photo-1577106263724-2c8e03bbe7a3?auto=format&fit=crop&w=900&q=80"
              alt="Oshpaz tort bezamoqda"
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </section>

      <section className="bg-cream py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-center font-display text-3xl font-bold text-brown-800 sm:text-4xl">Jamoamiz</h2>
          <div className="mx-auto mt-2 mb-10 h-1 w-16 rounded-full bg-brown-300" />
          <div className="grid grid-cols-2 gap-6 lg:grid-cols-4">
            {team.map((member) => (
              <div key={member.id} className="text-center">
                <div className="mx-auto h-32 w-32 overflow-hidden rounded-full sm:h-40 sm:w-40">
                  <img src={member.image} alt={member.name} className="h-full w-full object-cover" />
                </div>
                <h3 className="mt-4 font-display text-lg font-semibold text-brown-800">{member.name}</h3>
                <p className="text-sm text-brown-400">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
