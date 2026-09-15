"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export type HappyParkCartCategory = "kitchen" | "shop";

export type HappyParkCartItem = {
  id: string;
  name: string;
  description?: string;
  unitPrice: number;
  quantity: number;
  category: HappyParkCartCategory;
  image?: string;
  variant?: string;
  modifiers?: string[];
};

type AddCartItem = Omit<HappyParkCartItem, "quantity"> & {
  quantity?: number;
};

type CartContextValue = {
  items: HappyParkCartItem[];
  itemCount: number;
  subtotal: number;
  hydrated: boolean;
  addItem: (item: AddCartItem) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  incrementItem: (id: string) => void;
  decrementItem: (id: string) => void;
  clearCart: () => void;
};

const STORAGE_KEY = "happy-park-cart-v1";

const CartContext = createContext<CartContextValue | null>(null);

export function HappyParkCartProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [items, setItems] = useState<HappyParkCartItem[]>(() => {
    if (typeof window === "undefined") {
      return [];
    }

    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);

      if (!stored) {
        return [];
      }

      const parsed = JSON.parse(stored);

      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  });

  const hydrated = typeof window !== "undefined";

  useEffect(() => {
    if (!hydrated) {
      return;
    }

    try {
      window.localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(items)
      );
    } catch {
      // Storage may be unavailable in private/restricted browsers.
    }
  }, [items, hydrated]);

  const addItem = useCallback((incoming: AddCartItem) => {
    const quantity = Math.max(1, incoming.quantity ?? 1);

    setItems((current) => {
      const existing = current.find(
        (item) => item.id === incoming.id
      );

      if (existing) {
        return current.map((item) =>
          item.id === incoming.id
            ? {
                ...item,
                quantity: item.quantity + quantity,
              }
            : item
        );
      }

      return [
        ...current,
        {
          ...incoming,
          quantity,
        },
      ];
    });
  }, []);

  const removeItem = useCallback((id: string) => {
    setItems((current) =>
      current.filter((item) => item.id !== id)
    );
  }, []);

  const updateQuantity = useCallback(
    (id: string, quantity: number) => {
      setItems((current) => {
        if (quantity <= 0) {
          return current.filter((item) => item.id !== id);
        }

        return current.map((item) =>
          item.id === id
            ? {
                ...item,
                quantity,
              }
            : item
        );
      });
    },
    []
  );

  const incrementItem = useCallback((id: string) => {
    setItems((current) =>
      current.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity: item.quantity + 1,
            }
          : item
      )
    );
  }, []);

  const decrementItem = useCallback((id: string) => {
    setItems((current) =>
      current
        .map((item) =>
          item.id === id
            ? {
                ...item,
                quantity: item.quantity - 1,
              }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  }, []);

  const clearCart = useCallback(() => {
    setItems([]);
  }, []);

  const itemCount = useMemo(
    () =>
      items.reduce(
        (total, item) => total + item.quantity,
        0
      ),
    [items]
  );

  const subtotal = useMemo(
    () =>
      items.reduce(
        (total, item) =>
          total + item.unitPrice * item.quantity,
        0
      ),
    [items]
  );

  const value = useMemo(
    () => ({
      items,
      itemCount,
      subtotal,
      hydrated,
      addItem,
      removeItem,
      updateQuantity,
      incrementItem,
      decrementItem,
      clearCart,
    }),
    [
      items,
      itemCount,
      subtotal,
      hydrated,
      addItem,
      removeItem,
      updateQuantity,
      incrementItem,
      decrementItem,
      clearCart,
    ]
  );

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}

export function useHappyParkCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error(
      "useHappyParkCart must be used inside HappyParkCartProvider"
    );
  }

  return context;
}

