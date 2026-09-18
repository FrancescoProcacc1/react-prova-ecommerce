# React + Vite Template

Template minimale per nuovi progetti React, costruito su Vite.

## Cosa contiene

- **Vite 8** + **React 19** (JavaScript)
- **oxlint** come linter
- Nessun altro framework: aggiungi tu in base al bisogno

## File

```
.
├── .gitignore
├── .oxlintrc.json
├── README.md
├── GUIDA.md
├── index.html
├── package.json
├── vite.config.js
├── bin/
│   └── new-project.ps1
└── src/
    ├── App.jsx
    ├── main.jsx
    └── index.css
```

## Come usarlo

### Opzione A — script

Da PowerShell nella cartella di questo template:

```powershell
.\bin\new-project.ps1 -Name "mio-nuovo-progetto"
```

Lo script crea `../mio-nuovo-progetto/` con tutti i file (escludendo `node_modules`, `dist`, `.git`, `package-lock.json`), aggiorna `package.json#name` e rimuove `bin/` (lo script non serve piu nel progetto nuovo).

Poi:

```bash
cd ../mio-nuovo-progetto
npm install
npm run dev
```

### Opzione B — copia manuale

Copia tutta la cartella in una nuova posizione, rinomina la cartella, edita `package.json#name`.

## Scripts

| Script | Cosa fa |
|---|---|
| `npm run dev` | Avvia dev server con HMR |
| `npm run build` | Build di produzione in `dist/` |
| `npm run lint` | oxlint su tutti i file |
| `npm run preview` | Serve la build localmente |

## Estendere

Per aggiungere librerie tipiche:

| Funzione | Comando | Note |
|---|---|---|
| Styling utility-first | `npm install -D tailwindcss @tailwindcss/vite` | aggiungi `tailwindcss()` ai plugins in `vite.config.js`, importa in `src/index.css` |
| Routing | `npm install react-router-dom` | aggiungi `<BrowserRouter>` in `src/main.jsx` |
| Data fetching + cache | `npm install @tanstack/react-query` | wrappa `App` con `<QueryClientProvider>` |
| Stato globale | `npm install zustand` | pattern `create(set => ...)` |
| Form + validazione | `npm install react-hook-form zod @hookform/resolvers` | `useForm({ resolver: zodResolver(schema) })` |
| Icone | `npm install lucide-react` | tree-shakeable |
| Mock REST | `npm install -D json-server concurrently` | aggiungi script `dev:api` in `package.json` |

Vedi `GUIDA.md` per dettagli aggiuntivi sul setup di ogni estensione.
