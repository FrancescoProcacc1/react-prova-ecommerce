import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useCartStore = create(
    persist(
        (set, get) => ({
            items: [],
            addItem: (product, quantity = 1) => {
                const items = get().items;
                const existing = items.find((i) => i.id === product.id);
                if (existing) {
                    set({
                        items: items.map((i) =>
                            i.id === product.id ? { ...i, quantity: i.quantity + quantity } : i,
                        ),
                    });
                } else {
                    set({ items: [...items, { ...product, quantity }] });
                }
            },
            removeItem: (id) => set({ items: get().items.filter((i) => i.id !== id) }),
            updateQuantity: (id, quantity) =>
                set({
                    items: get()
                        .items
                        .map((i) => (i.id === id ? { ...i, quantity: Math.max(1, quantity) } : i))
                        .filter((i) => i.quantity > 0),
                }),
            clearCart: () => set({ items: [] }),
            getCount: () => get().items.reduce((sum, i) => sum + i.quantity, 0),
            getSubtotal: () =>
                get().items.reduce((sum, i) => sum + i.price * i.quantity, 0),
        }),
        { name: 'ecommerce-cart' },
    ),
);