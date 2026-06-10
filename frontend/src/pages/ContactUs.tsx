import { useState, type SubmitEvent } from 'react';
import { FiPhone, FiMail, FiMapPin, FiClock, FiFacebook, FiTwitter, FiInstagram } from 'react-icons/fi';
import PageHeader from '../components/PageHeader';
import { submitContactForm } from '../lib/api';

type Status = 'idle' | 'loading' | 'success' | 'error';

export default function ContactUs() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<Status>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: SubmitEvent) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMessage('');

    try {
      await submitContactForm({ name, email, subject, message });
      setStatus('success');
      setName('');
      setEmail('');
      setSubject('');
      setMessage('');
    } catch (err) {
      setStatus('error');
      setErrorMessage(err instanceof Error ? err.message : 'Xatolik yuz berdi');
    }
  };

  return (
    <div>
      <PageHeader title="Contact Us" />

      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-2">
          <div>
            <h2 className="font-display text-3xl font-bold text-brown-800 sm:text-4xl">Get In Touch</h2>
            <ul className="mt-6 space-y-4 text-brown-700">
              <li className="flex items-center gap-3">
                <FiPhone className="text-brown-400" size={20} />
                +998 90 123 45 67
              </li>
              <li className="flex items-center gap-3">
                <FiMail className="text-brown-400" size={20} />
                info@sweetdreams.uz
              </li>
              <li className="flex items-center gap-3">
                <FiMapPin className="text-brown-400" size={20} />
                Tashkent, Uzbekistan
              </li>
              <li className="flex items-center gap-3">
                <FiClock className="text-brown-400" size={20} />
                Mon - Sat: 09:00 - 18:00, Sunday: 10:00 - 18:00
              </li>
            </ul>
            <div className="mt-6 flex gap-3">
              {[FiFacebook, FiTwitter, FiInstagram].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-cream text-brown-700 transition-colors hover:bg-brown-700 hover:text-white"
                  aria-label="Ijtimoiy tarmoq"
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>

            <div className="mt-8 overflow-hidden rounded-3xl">
              <iframe
                title="Sweet Dreams location"
                src="https://www.google.com/maps?q=Tashkent,Uzbekistan&output=embed"
                className="h-64 w-full border-0"
                loading="lazy"
              />
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label className="mb-1.5 block text-sm font-semibold text-brown-700">Your Name</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full rounded-xl border border-brown-200 px-4 py-3 text-sm text-brown-800 outline-none focus:border-brown-400"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-semibold text-brown-700">Your Email</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-xl border border-brown-200 px-4 py-3 text-sm text-brown-800 outline-none focus:border-brown-400"
                />
              </div>
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-semibold text-brown-700">Subject</label>
              <input
                type="text"
                required
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="w-full rounded-xl border border-brown-200 px-4 py-3 text-sm text-brown-800 outline-none focus:border-brown-400"
              />
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-semibold text-brown-700">Message</label>
              <textarea
                rows={6}
                required
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full rounded-xl border border-brown-200 px-4 py-3 text-sm text-brown-800 outline-none focus:border-brown-400"
              />
            </div>

            <button
              type="submit"
              disabled={status === 'loading'}
              className="rounded-full bg-brown-700 px-8 py-3 text-sm font-semibold text-white transition-colors hover:bg-brown-600 disabled:opacity-60"
            >
              {status === 'loading' ? 'Yuborilmoqda...' : 'Send Message'}
            </button>

            {status === 'success' && (
              <p className="text-sm font-medium text-green-600">Xabaringiz yuborildi, rahmat!</p>
            )}
            {status === 'error' && <p className="text-sm font-medium text-red-600">{errorMessage}</p>}
          </form>
        </div>
      </section>
    </div>
  );
}
