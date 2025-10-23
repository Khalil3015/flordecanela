import { create } from "zustand";

export type PriceTier = { qty: number; price: number; unitLabel?: string };
export type Item = {
  id: string;
  name: string;
  categoryId: string;
  tags?: string[];
  priceTiers: PriceTier[];
  notes?: string;
  image?: string;          // <— NUEVO: imagen opcional
};
export type Pack = { id: string; name: string; type: "variado" | "salado"; pieces: number; persons: string; price: number; items?: string[] };

export type CartLine = { kind: "item"; item: Item; qty: number; };
export type PackLine = { kind: "pack"; pack: Pack; count: number; };

type CartState = {
  lines: (CartLine | PackLine)[];
  addItem: (item: Item, qty: number) => void;
  addPack: (pack: Pack, count?: number) => void;
  removeAt: (i: number) => void;
  clear: () => void;
  totalUnits: () => number;
};

export const useCartStore = create<CartState>((set, get) => ({
  lines: [],
  addItem: (item, qty) => set((s) => ({ lines: [...s.lines, { kind: "item", item, qty }] })),
  addPack: (pack, count = 1) => set((s) => ({ lines: [...s.lines, { kind: "pack", pack, count }] })),
  removeAt: (i) => set((s) => ({ lines: s.lines.filter((_, idx) => idx !== i) })),
  clear: () => set({ lines: [] }),
  totalUnits: () =>
    get().lines.reduce((acc, l) => {
      if (l.kind === "item") return acc + l.qty;
      if (l.kind === "pack") return acc + l.pack.pieces * l.count;
      return acc;
    }, 0),
}));
