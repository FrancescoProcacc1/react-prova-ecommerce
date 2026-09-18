import { useMemo, useState } from 'react';
import { Search } from 'lucide-react';
import { useProducts } from '../hooks/useProducts';
import ProductGrid from '../components/product/ProductGrid';

export default function CatalogPage() {
    const [query, setQuery] = useState('');
    const [category, setCategory] = useState('all');
    const [sort, setSort] = useState('-rating');

    const filters = useMemo(() => {
        const f = { _sort: sort };
        if (category !== 'all') f.category = category;
        return f;
    }, [category, sort]);

    const { data, isLoading } = useProducts(filters);

    const products = useMemo(() => {
        if (!data) return [];
        if (!query) return data;
        const q = query.toLowerCase();
        return data.filter(
            (p) =>
                p.name.toLowerCase().includes(q) ||
                p.brand.toLowerCase().includes(q) ||
                p.description.toLowerCase().includes(q),
        );
    }, [data, query]);

    const categories = useMemo(() => {
        const set = new Set(data?.map((p) => p.category) ?? []);
        return ['all', ...Array.from(set).sort()];
    }, [data]);

    return (
        <div className="mx-auto max-w-6xl space-y-6 px-4 py-8">
            <header>
                <h1 className="text-3xl font-bold text-slate-900">Catalogo</h1>
                <p className="mt-1 text-slate-500">{products.length} prodotti disponibili</p>
            </header>

            <div className="grid gap-3 sm:grid-cols-[1fr_auto_auto]">
                <label className="relative block">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                    <input
                        type="search"
                        placeholder="Cerca prodotto, marca..."
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        className="w-full rounded-lg border border-slate-300 py-2 pl-9 pr-3 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                </label>
                <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                >
                    {categories.map((c) => (
                        <option key={c} value={c}>
                            {c === 'all' ? 'Tutte le categorie' : c}
                        </option>
                    ))}
                </select>
            <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            >
                <option value="-rating">Piu votati</option>
                <option value="price">Prezzo crescente</option>
                <option value="-price">Prezzo decrescente</option>
            </select>
            </div>

            <ProductGrid products={products} loading={isLoading} />
        </div>
    );
}