import ProductCard from './ProductCard';
import Spinner from '../ui/Spinner';

export default function ProductGrid({ products, loading }) {
    if (loading) {
        return (
            <div className="flex justify-center py-20">
                <Spinner className="h-10 w-10" />
            </div>
        );
    }
    if (!products?.length) {
        return <p className="py-20 text-center text-slate-500">Nessun prodotto trovato.</p>;
    }
    return (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {products.map((p) => (
                <ProductCard key={p.id} product={p} />
            ))}
        </div>
    );
}