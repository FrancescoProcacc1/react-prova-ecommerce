export default function Footer() {
    return (
        <footer className="mt-auto border-t border-slate-200 bg-white">
            <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-2 px-4 py-6 text-sm text-slate-500 sm:flex-row">
                <p>&copy; {new Date().getFullYear()} ProvaShop. Tutti i diritti riservati.</p>
                <p className="text-xs">MVP didattico — React + Vite</p>
            </div>
        </footer>
    );
}