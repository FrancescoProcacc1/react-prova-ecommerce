import { Link } from 'react-router-dom';
import { Star } from 'lucide-react';

const formatter = new Intl.NumberFormat('it-IT', { style: 'currency', currency: 'EUR' });

export default function ProductCard({ product }) {
    if (!product) return null;
    return (
        <Link
            to={`/product/${product.id}`}
            className="group flex flex-col overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md"
        >
            <div className="aspect-square overflow-hidden bg-slate-50">
                <img
                    src={product.image}
                    alt={product.name}
                    loading="lazy"
                    className="h-full w-full object-cover transition group-hover:scale-105"
                />
            </div>
            <div className="flex flex-1 flex-col gap-2 p-4">
                <p className="text-xs uppercase tracking-wide text-slate-500">{product.brand}</p>
                <h3 className="line-clamp-2 text-sm font-semibold text-slate-900">{product.name}</h3>
                <div className="mt-auto flex items-center justify-between pt-2">
                    <span className="text-lg font-bold text-blue-600">{formatter.format(product.price)}</span>
                    {product.rating && (
                        <span className="flex items-center gap-1 text-xs text-slate-500">
                            <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
                            {product.rating.toFixed(1)}
                        </span>
                    )}
                </div>
            </div>
        </Link>
    );
}