import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import App from './App.jsx';
import PlaceholderPage from './pages/PlaceholderPage.jsx';
import NotFoundPage from './pages/NotFoundPage.jsx';
import CatalogPage from './pages/CatalogPage.jsx';
import './index.css';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { staleTime: 60_000, refetchOnWindowFocus: false },
  },
});

const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        index: true,
        element: (
          <PlaceholderPage
            route="/"
            title="Home"
            description="Pagina iniziale dell'e-commerce. Qui costruirai la vetrina: hero, categorie in evidenza, prodotti consigliati."
          />
        ),
      },
      {
        path: 'catalog',
        element: <CatalogPage />,
      },
      {
        path: 'product/:id',
        element: (
          <PlaceholderPage
            route="/product/:id"
            title="Prodotto"
            description="Dettaglio del singolo prodotto. Usa useProduct(id) e popola questo layout con specifiche, galleria e CTA per il carrello."
          />
        ),
      },
      {
        path: 'cart',
        element: (
          <PlaceholderPage
            route="/cart"
            title="Carrello"
            description="Carrello persistente. Usa useCartStore() per leggere items, modificare quantita e rimuovere."
          />
        ),
      },
      {
        path: 'checkout',
        element: (
          <PlaceholderPage
            route="/checkout"
            title="Checkout"
            description="Form di pagamento. Usa react-hook-form + zod e useMutation per POST /orders."
          />
        ),
      },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </StrictMode>,
);