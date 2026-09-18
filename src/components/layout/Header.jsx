import { Link, NavLink } from 'react-router-dom';
import { ShoppingCart, Store } from 'lucide-react';
import { useCartStore } from '../../store/cartStore';

const linkClass = ({ isActive }) =>
    `text-sm font-medium transition ${isActive ? 'text-blue-600' : 'text-slate-700 hover:text-blue-600'
    }`;

export default function Header() {
    const count = useCartStore((s) => s.getCount());

    return (
        <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/80 backdrop-blur">
            <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
                <Link to="/" className="flex items-center gap-2 text-slate-900">
                    <Store className="h-6 w-6 text-blue-600" />
                    <span className="text-lg font-bold">ProvaShop</span>
                </Link>
                <nav className="flex items-center gap-6">
                    <NavLink to="/" end className={linkClass}>Home</NavLink>
                    <NavLink to="/catalog" className={linkClass}>Catalogo</NavLink>
                    <NavLink to="/cart" className="relative" aria-label="Carrello">
                        <ShoppingCart className="h-6 w-6 text-slate-700 hover:text-blue-600" />
                        {count > 0 && (
                            <span className="absolute -right-2 -top-2 flex h-5 min-w-5 items-center justify-center rounded-full bg-blue-600 px-1 text-xs font-bold text-white">
                                {count}
                            </span>
                        )}
                    </NavLink>
                </nav>
            </div>
        </header>
    );
}