import { Link } from 'react-router-dom';

export default function NotFoundPage() {
    return (
        <div className="mx-auto max-w-xl py-20 text-center px-4">
            <p className="text-6xl font-bold text-blue-600">404</p>
            <h1 className="mt-4 text-2xl font-bold text-slate-900">Pagina non trovata</h1>
            <p className="mt-2 text-slate-500">La pagina che stai cercando non esiste.</p>
            <Link
                to="/"
                className="mt-6 inline-block rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700"
            >
                Torna alla home
            </Link>
        </div>
    );
}