import { Link } from 'react-router-dom';

export default function PageHeader({ title }: { title: string }) {
  return (
    <section className="bg-cream py-14 text-center">
      <h1 className="font-display text-4xl font-bold text-brown-800 sm:text-5xl">{title}</h1>
      <p className="mt-3 text-sm text-brown-500">
        <Link to="/" className="hover:text-brown-700">
          Home
        </Link>
        <span className="mx-2">›</span>
        <span className="text-brown-700">{title}</span>
      </p>
    </section>
  );
}
