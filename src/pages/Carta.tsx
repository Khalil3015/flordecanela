import { useEffect, useMemo, useState } from "react";
import ItemCard from "../components/ItemCard";
import { getCatalog } from "../lib/api";
import type { Item } from "../store/cart";

/**
 * Si el backend devuelve objetos que ya siguen la estructura de Item,
 * podemos simplemente aliasar el tipo.
 */
export type CatalogItem = Item;

export default function Carta() {
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState<Item[]>([]);
  const [categories, setCategories] = useState<{ id: string; name: string }[]>([]);
  const [q, setQ] = useState("");
  const [cat, setCat] = useState<string>("all");

  useEffect(() => {
    getCatalog()
      .then((data) => {
        // 🔹 Si los datos del backend coinciden exactamente con `Item`, esto basta:
        setCategories(data.categories);
       setItems(data.items as unknown as Item[]);

        // 🔹 Si no tienen las props de `Item` (categoryId, priceTiers, etc.),
        // usa este adaptador en su lugar:
        /*
        setItems(
          data.items.map((i) => ({
            ...i,
            categoryId: i.categoryId ?? "",
            priceTiers: i.priceTiers ?? [{ qty: 1, price: i.price }],
          }))
        );
        */
      })
      .finally(() => setLoading(false));
  }, []);

  const filtered = useMemo(() => {
    const text = q.trim().toLowerCase();
    return items.filter(
      (it) =>
        (cat === "all" || it.categoryId === cat) &&
        (!text || it.name.toLowerCase().includes(text))
    );
  }, [items, q, cat]);

  return (
    <div className="mx-auto max-w-7xl px-6 py-10">
      <h2 className="text-2xl font-bold">Carta</h2>

      <div className="mt-4 flex flex-col md:flex-row gap-3">
        <input
          className="form-input w-full"
          placeholder="Buscar (p. ej. tequeños, alfajores…)"
          value={q}
          onChange={(e) => setQ(e.target.value)}
        />

        <select
          className="form-select"
          value={cat}
          onChange={(e) => setCat(e.target.value)}
        >
          <option value="all">Todas las categorías</option>
          {categories.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>
      </div>

      {loading ? (
        <p className="mt-6 text-slate-600">Cargando…</p>
      ) : (
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((it) => (
            <ItemCard key={it.id} item={it} />
          ))}
          {filtered.length === 0 && (
            <p className="text-slate-500">No hay resultados con ese filtro.</p>
          )}
        </div>
      )}
    </div>
  );
}
