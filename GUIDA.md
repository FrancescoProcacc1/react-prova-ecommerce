# Guida al template React + Vite (JavaScript)

> Stack base: Vite 8 · React 19 · JavaScript · oxlint

Questa guida spiega (a) come funziona lo scaffold di base e (b) come aggiungere le estensioni piu comuni.

---

## 1. Prerequisiti

- **Node.js >= 20.19** (richiesto da Vite 8)
- **npm**

Verifica versioni:

```bash
node -v
npm -v
```

---

## 2. Setup dello scaffold minimale

Il template contiene gia:

- `package.json` con script `dev / build / lint / preview`
- `vite.config.js` con plugin React
- `index.html` come entry HTML
- `src/main.jsx` (bootstrap React + StrictMode)
- `src/App.jsx` (placeholder neutro)
- `src/index.css` (reset minimo)
- `.oxlintrc.json` con regole React essenziali
- `.gitignore` standard Vite

I comandi per arrivare a questo stato da zero:

```bash
mkdir mio-progetto && cd mio-progetto && git init && npm create vite@latest . -- --template react && npm install && npm uninstall @types/react @types/react-dom && npm install -D oxlint
```

Poi crea `.oxlintrc.json`:

```json
{
  "$schema": "./node_modules/oxlint/configuration_schema.json",
  "plugins": ["react", "oxc"],
  "rules": {
    "react/rules-of-hooks": "error",
    "react/only-export-components": ["warn", { "allowConstantExport": true }]
  }
}
```

---

## 3. Script disponibili

| Comando | Cosa fa |
|---|---|
| `npm run dev` | Dev server con HMR su `http://localhost:5173` |
| `npm run build` | Build di produzione in `dist/` |
| `npm run preview` | Serve la build in locale |
| `npm run lint` | oxlint su tutti i sorgenti |

---

## 4. Estensioni tipiche

Installazione e setup rapido delle librerie piu comuni. Ogni sezione e indipendente.

### 4.1 Tailwind CSS v4

```bash
npm install -D tailwindcss @tailwindcss/vite
```

`vite.config.js`:

```js
import tailwindcss from '@tailwindcss/vite';
// ...
plugins: [react(), tailwindcss()],
```

`src/index.css`:

```css
@import "tailwindcss";
```

### 4.2 React Router

```bash
npm install react-router-dom
```

`src/main.jsx`:

```jsx
import { BrowserRouter } from 'react-router-dom';
// ...
<BrowserRouter>
  <App />
</BrowserRouter>
```

### 4.3 TanStack Query

```bash
npm install @tanstack/react-query
```

`src/main.jsx`:

```jsx
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
const queryClient = new QueryClient();
<QueryClientProvider client={queryClient}>
  <App />
</QueryClientProvider>
```

### 4.4 Zustand (stato globale)

```bash
npm install zustand
```

Store minimale `src/store/counterStore.js`:

```js
import { create } from 'zustand';
export const useCounter = create((set) => ({
  count: 0,
  inc: () => set((s) => ({ count: s.count + 1 })),
}));
```

Per persistenza in localStorage:

```js
import { persist } from 'zustand/middleware';
export const useCounter = create(persist((set) => ({
  count: 0,
  inc: () => set((s) => ({ count: s.count + 1 })),
}), { name: 'counter-state' }));
```

### 4.5 Form + validazione

```bash
npm install react-hook-form zod @hookform/resolvers
```

```jsx
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const schema = z.object({ email: z.string().email() });
const { register, handleSubmit, formState: { errors } } = useForm({ resolver: zodResolver(schema) });
```

### 4.6 Mock REST con json-server

```bash
npm install -D json-server concurrently
```

Aggiungi in `package.json` scripts:

```json
"dev": "concurrently -n web,api -c blue,magenta \"vite\" \"json-server --watch db.json --port 3001\"",
"dev:api": "json-server --watch db.json --port 3001"
```

Crea `db.json` con un array `posts` (o qualunque entity).

Proxy opzionale in `vite.config.js`:

```js
server: {
  proxy: {
    '/api': { target: 'http://localhost:3001', changeOrigin: true, rewrite: (p) => p.replace(/^\/api/, '') }
  }
}
```

Wrapper API minimale:

```js
const API_BASE = '/api';
export const apiGet = (path) => fetch(`${API_BASE}${path}`).then((r) => r.json());
```

### 4.7 Icone

```bash
npm install lucide-react
```

```jsx
import { ShoppingCart } from 'lucide-react';
<ShoppingCart className="h-5 w-5" />
```

---

## 5. Uso come template

Questo repository e pensato per essere clonato/copiato come base per nuovi progetti.

### Opzione A — script PowerShell

Dalla cartella del template:

```powershell
.\bin\new-project.ps1 -Name "mio-nuovo-progetto"
```

Crea `../mio-nuovo-progetto/`, esclude `node_modules`/`dist`/`.git`/`package-lock.json`, aggiorna `package.json#name`, rimuove `bin/`.

### Opzione B — copia manuale

Copia la cartella, rinomina, edita `package.json#name`.

---

## 6. Comandi in un colpo solo (per un nuovo progetto)

```bash
mkdir mio-progetto && cd mio-progetto && git init && npm create vite@latest . -- --template react && npm install && npm uninstall @types/react @types/react-dom && npm install -D oxlint
```

---

## 7. E-COMMERCE

Questa sezione mostra come trasformare il template in un e-commerce completo, aggiungendo dipendenze, struttura `src/` e pagine.

### 7.1 Architettura ad alto livello

```
                    Template base
                         |
        +----------------+----------------+
        |                |                |
     Styling         Routing         Stato
    (Tailwind)    (React Router)    (Zustand)
        |                |                |
        +----------------+----------------+
                         |
                  Data fetching
               (TanStack Query)
                         |
                +--------+--------+
                |                 |
          Layer API          Pagine
        (src/api/)         (src/pages/)
                |
            Backend
   (json-server / futuro DB)
```

Il flusso dati: componente → hook TanStack Query → `src/api/*.js` → backend. Quando arrivera il backend reale, modifichi solo i file in `src/api/`.

### 7.2 Installazione cumulativa

```bash
npm install react-router-dom @tanstack/react-query zustand react-hook-form zod @hookform/resolvers lucide-react
npm install -D tailwindcss @tailwindcss/vite json-server concurrently
```

(6 runtime + 4 dev. Da ~140 kB a ~700 kB di bundle stimato.)

### 7.3 Setup per blocco

Ogni blocco e indipendente. I comandi di installazione sono cumulativi nella sezione 7.2.

#### Blocco A — Tailwind (styling utility-first)

Styling utility-first al posto di CSS custom. Aggiungi il plugin `tailwindcss()` in `vite.config.js` e importa con `@import "tailwindcss";` in `src/index.css`.

#### Blocco B — React Router (pagine multiple)

Gestisce la navigazione tra pagine senza reload. In `src/main.jsx` configura le rotte con `createBrowserRouter` e wrappa l'app in `<RouterProvider>`.

#### Blocco C — Zustand (carrello persistente)

Stato globale per il carrello, con persistenza automatica in localStorage tramite il middleware `persist`. Crea `src/store/cartStore.js` con `create((set, get) => ({ items, addItem, removeItem, updateQuantity, clearCart, getCount, getSubtotal }))`.

#### Blocco D — TanStack Query (data fetching con cache)

Gestisce fetch, cache, loading states e retry automatico. Wrappa l'app in `<QueryClientProvider>` e crea hook personalizzati in `src/hooks/useProducts.js` (useProducts, useProduct).

#### Blocco E — Layer API (frontend <-> backend swappabile)

Tutte le fetch passano da `src/api/client.js` (wrapper `fetch` con gestione errori). Esponi funzioni in `src/api/products.js` (getProducts, getProductById, getCategories) e `src/api/orders.js` (createOrder, getOrders). Quando cambiera il backend, modifichi solo questi file.

#### Blocco F — Pagine (ordine consigliato di costruzione)

Costruisci le pagine una alla volta, in quest'ordine.

| # | Pagina | Cosa usa |
|---|---|---|
| 1 | Catalogo `/catalog` | `useProducts()`, `Spinner`, `EmptyState`, Tailwind |
| 2 | Prodotto `/product/:id` | `useProduct(id)`, `cartStore.addItem` |
| 3 | Carrello `/cart` | `cartStore` (items, updateQuantity, removeItem) |
| 4 | Checkout `/checkout` | RHF + zod, `useMutation(createOrder)`, `cartStore` |
| 5 | Order success `/order-success/:orderId` | solo template + ID ordine |

#### Blocco G — Form checkout (RHF + zod)

Form con validazione type-safe: schema dichiarato con zod, validazione automatica al submit, errori per campo. Hook principale: `useForm({ resolver: zodResolver(schema) })`.

#### Blocco H — Mock REST con json-server

Avvia un'API REST finto su `localhost:3001` con persistenza in `db.json`. Usa `concurrently` per lanciare Vite + json-server in parallelo. Configura il proxy `/api` in `vite.config.js` per evitare problemi di CORS.

#### Blocco I — Icone (opzionale)

Set di icone SVG tree-shakeable. Importi solo le icone che usi.

### 7.4 Ordine consigliato di implementazione

1. Blocco A (Tailwind) — base UI
2. Blocco B (Router) — scheletro navigabile
3. Blocco C (Zustand carrello) — stato pronto per pagine future
4. Blocco D (TanStack Query) — fetch con cache
5. Blocco E (Layer API) — unico punto di accesso al backend
6. Blocco H (json-server mock) — backend finto pronto per sviluppo offline
7. Blocco F pagine una a una (Catalogo → Prodotto → Carrello → Checkout → Success)
8. Blocco G (RHF + zod) — quando arrivi alla pagina checkout
9. Blocco I (icone) — in qualsiasi momento

### 7.5 Schema finale `src/` di un e-commerce

```
src/
├── api/
│   ├── client.js             ← wrapper fetch (unico punto che parla col backend)
│   ├── products.js           ← getProducts, getProductById, getCategories
│   └── orders.js             ← createOrder, getOrders
├── components/
│   ├── layout/               ← Header (con badge carrello), Footer
│   ├── product/              ← ProductCard, ProductGrid
│   ├── cart/                 ← CartItem, CartSummary
│   └── ui/                   ← Spinner, EmptyState, Button
├── hooks/
│   └── useProducts.js        ← TanStack Query wrapper
├── pages/
│   ├── HomePage.jsx
│   ├── CatalogPage.jsx
│   ├── ProductPage.jsx
│   ├── CartPage.jsx
│   ├── CheckoutPage.jsx
│   ├── OrderSuccessPage.jsx
│   └── NotFoundPage.jsx
├── store/
│   └── cartStore.js          ← Zustand + persist
├── App.jsx                   ← <Outlet /> (layout)
└── main.jsx                  ← Providers (Router + Query) + bootstrap
db.json                       ← prodotti mock
```

### 7.6 Collegare un backend reale

Tutto passa da `src/api/client.js`. Quando arriva il backend DB-backed:

1. Cambia la costante `API_BASE` da `'/api'` a `'https://tuobackend/api'`.
2. Disabilita o rimuovi il blocco `server.proxy` in `vite.config.js`.
3. Se gli endpoint differiscono, modifica solo `src/api/products.js` e `orders.js`.

Componenti, store, hook e pagine **non cambiano**.
