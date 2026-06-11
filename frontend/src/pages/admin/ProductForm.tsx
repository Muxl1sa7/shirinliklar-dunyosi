import { useEffect, useState, type FormEvent } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { adminCreateProduct, adminUpdateProduct, getProductById, type AdminProductInput } from '../../lib/api';
import type { CakeCategory, DessertCategory, Product } from '../../types';

const cakeCategories: { value: CakeCategory; label: string }[] = [
  { value: 'chocolate', label: 'Shokoladli' },
  { value: 'fruit', label: 'Mevali' },
  { value: 'birthday', label: "Tug'ilgan kun" },
  { value: 'wedding', label: "To'y" },
  { value: 'special', label: 'Maxsus' },
  { value: 'diet', label: 'Parhez uchun' },
];

const dessertCategories: { value: DessertCategory; label: string }[] = [
  { value: 'macarons', label: 'Makaronlar' },
  { value: 'cupcakes', label: 'Kapkeyklar' },
  { value: 'brownies', label: 'Braunilar' },
  { value: 'cookies', label: 'Pechenelar' },
  { value: 'donuts', label: 'Donutlar' },
  { value: 'creamy', label: 'Kremli desertlar' },
];

const emptyForm: AdminProductInput = {
  name: '',
  price: 0,
  image: '',
  type: 'cake',
  category: 'chocolate',
  description: '',
  sizes: [],
  flavors: [],
  dietFriendly: false,
  healthNote: '',
  ingredients: [],
  storage: '',
};

const toCommaList = (value: string) =>
  value
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean);

export default function ProductForm() {
  const { id } = useParams();
  const isEdit = Boolean(id);
  const navigate = useNavigate();

  const [form, setForm] = useState<AdminProductInput>(emptyForm);
  const [sizesText, setSizesText] = useState('');
  const [flavorsText, setFlavorsText] = useState('');
  const [ingredientsText, setIngredientsText] = useState('');
  const [loading, setLoading] = useState(isEdit);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!id) return;

    const applyProduct = (product: Product) => {
      setForm({
        name: product.name,
        price: product.price,
        image: product.image,
        type: product.type,
        category: product.category,
        description: product.description,
        sizes: product.sizes ?? [],
        flavors: product.flavors ?? [],
        dietFriendly: product.dietFriendly,
        healthNote: product.healthNote,
        ingredients: product.ingredients,
        storage: product.storage,
      });
      setSizesText((product.sizes ?? []).join(', '));
      setFlavorsText((product.flavors ?? []).join(', '));
      setIngredientsText(product.ingredients.join(', '));
    };

    getProductById(id)
      .then((data) => applyProduct(data.product))
      .catch(() => setError('Mahsulotni yuklab bo\'lmadi'))
      .finally(() => setLoading(false));
  }, [id]);

  const categories = form.type === 'cake' ? cakeCategories : dessertCategories;

  const handleTypeChange = (type: Product['type']) => {
    const nextCategories = type === 'cake' ? cakeCategories : dessertCategories;
    setForm((prev) => ({ ...prev, type, category: nextCategories[0].value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError('');

    const payload: AdminProductInput = {
      ...form,
      sizes: toCommaList(sizesText),
      flavors: toCommaList(flavorsText),
      ingredients: toCommaList(ingredientsText),
    };

    try {
      if (isEdit && id) {
        await adminUpdateProduct(id, payload);
      } else {
        await adminCreateProduct(payload);
      }
      navigate('/admin/products');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Saqlashda xatolik yuz berdi');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <p className="text-slate-400">Yuklanmoqda...</p>;
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-800">{isEdit ? 'Mahsulotni tahrirlash' : 'Yangi mahsulot'}</h1>

      <form onSubmit={handleSubmit} className="mt-6 max-w-2xl space-y-5 rounded-2xl bg-white p-6 shadow-sm">
        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">Nomi</label>
            <input
              type="text"
              required
              value={form.name}
              onChange={(e) => setForm((prev) => ({ ...prev, name: e.target.value }))}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-slate-500"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">Narxi (so'm)</label>
            <input
              type="number"
              required
              min={0}
              value={form.price}
              onChange={(e) => setForm((prev) => ({ ...prev, price: Number(e.target.value) }))}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-slate-500"
            />
          </div>
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700">Rasm URL</label>
          <input
            type="text"
            required
            value={form.image}
            onChange={(e) => setForm((prev) => ({ ...prev, image: e.target.value }))}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-slate-500"
          />
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">Turi</label>
            <select
              value={form.type}
              onChange={(e) => handleTypeChange(e.target.value as Product['type'])}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-slate-500"
            >
              <option value="cake">Tort</option>
              <option value="dessert">Desert</option>
            </select>
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">Kategoriya</label>
            <select
              value={form.category}
              onChange={(e) => setForm((prev) => ({ ...prev, category: e.target.value as Product['category'] }))}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-slate-500"
            >
              {categories.map((category) => (
                <option key={category.value} value={category.value}>
                  {category.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700">Tavsif</label>
          <textarea
            required
            rows={3}
            value={form.description}
            onChange={(e) => setForm((prev) => ({ ...prev, description: e.target.value }))}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-slate-500"
          />
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">O'lchamlar (vergul bilan)</label>
            <input
              type="text"
              value={sizesText}
              onChange={(e) => setSizesText(e.target.value)}
              placeholder="1 kg, 1.5 kg, 2 kg"
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-slate-500"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">Ta'mlar (vergul bilan)</label>
            <input
              type="text"
              value={flavorsText}
              onChange={(e) => setFlavorsText(e.target.value)}
              placeholder="Shokolad, Vanil"
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-slate-500"
            />
          </div>
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700">Tarkibi (vergul bilan)</label>
          <input
            type="text"
            value={ingredientsText}
            onChange={(e) => setIngredientsText(e.target.value)}
            placeholder="Bug'doy uni, Tuxum, Shakar"
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-slate-500"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700">Saqlash shartlari</label>
          <textarea
            rows={2}
            value={form.storage}
            onChange={(e) => setForm((prev) => ({ ...prev, storage: e.target.value }))}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-slate-500"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700">Salomatlik haqida ma'lumot</label>
          <textarea
            rows={2}
            value={form.healthNote}
            onChange={(e) => setForm((prev) => ({ ...prev, healthNote: e.target.value }))}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-slate-500"
          />
        </div>

        <label className="flex items-center gap-2 text-sm font-medium text-slate-700">
          <input
            type="checkbox"
            checked={form.dietFriendly}
            onChange={(e) => setForm((prev) => ({ ...prev, dietFriendly: e.target.checked }))}
            className="h-4 w-4 rounded border-slate-300"
          />
          Parhez uchun mos
        </label>

        {error && <p className="text-sm font-medium text-red-600">{error}</p>}

        <div className="flex gap-3">
          <button
            type="submit"
            disabled={saving}
            className="rounded-lg bg-slate-800 px-5 py-2 text-sm font-semibold text-white transition-colors hover:bg-slate-700 disabled:opacity-60"
          >
            {saving ? 'Saqlanmoqda...' : 'Saqlash'}
          </button>
          <button
            type="button"
            onClick={() => navigate('/admin/products')}
            className="rounded-lg border border-slate-300 px-5 py-2 text-sm font-semibold text-slate-600 transition-colors hover:bg-slate-100"
          >
            Bekor qilish
          </button>
        </div>
      </form>
    </div>
  );
}
