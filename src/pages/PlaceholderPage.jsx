import { Link } from 'react-router-dom';

export default function PlaceholderPage({ route, title, description }) {
    return (
        <div className="mx-auto max-w-2xl py-12 px-4">
            <p className="text-xs uppercase tracking-wide text-blue-600">{route}</p>
            <h1 className="mt-2 text-3xl font-bold text-slate-900">{title}</h1>
            <p className="mt-3 text-slate-600">{description}</p>

            <div className="mt-8 rounded-xl border border-dashed border-slate-300 bg-slate-50 p-6">
                <p className="text-sm font-medium text-slate-700">Sezione da costruire</p>
                <p className="mt-1 text-sm text-slate-500">
                    Questa pagina renderizza contenuti statici. Quando vorrai, qui dentro ci metterai il tuo componente.
                </p>
                <div className="mt-4 flex flex-wrap gap-2 text-sm">
                    <Link
                        to="/product/p001"
                        className="rounded-lg bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700"
                    >
                        Esplora un prodotto
                    </Link>
                    <Link
                        to="/catalog"
                        className="rounded-lg border border-slate-300 bg-white px-4 py-2 font-medium text-slate-700 hover:bg-slate-100"
                    >
                        Vai al catalogo
                    </Link>
                </div>
            </div>
        </div>
    );
}