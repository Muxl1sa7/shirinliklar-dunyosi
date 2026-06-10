const endpoints = [
  { method: 'GET', path: '/api/products', description: 'Barcha mahsulotlar (type, category bo\'yicha filter qilish mumkin)' },
  { method: 'GET', path: '/api/products/:id', description: 'Bitta mahsulot ma\'lumoti' },
  { method: 'POST', path: '/api/custom-order', description: 'Maxsus buyurtma yuborish' },
  { method: 'POST', path: '/api/contact', description: 'Aloqa formasi xabari' },
  { method: 'POST', path: '/api/newsletter', description: 'Yangiliklarga obuna bo\'lish' },
];

export default function Home() {
  return (
    <main style={{ fontFamily: 'system-ui, sans-serif', maxWidth: 640, margin: '60px auto', padding: '0 20px' }}>
      <h1>Sweet Dreams API</h1>
      <p>Bu Sweet Dreams frontend ilovasi uchun backend API server.</p>
      <ul style={{ lineHeight: 1.8 }}>
        {endpoints.map((endpoint) => (
          <li key={endpoint.path}>
            <code>{endpoint.method}</code> <code>{endpoint.path}</code> — {endpoint.description}
          </li>
        ))}
      </ul>
    </main>
  );
}
