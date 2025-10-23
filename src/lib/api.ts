// Tipos ------------------------------------------------------------------

export type CatalogItem = {
  id: string;
  name: string;
  description?: string;
  price: number;
  tags?: string[];
  notes?: string;
  unitLabel?: string;
};

export type Category = {
  id: string;
  name: string;
};

export type CatalogResponse = {
  categories: Category[];
  items: CatalogItem[];
};

export type QuotePayload = {
  items: { id: string; qty: number }[];
  packs: { id: string; count: number }[];
};

// Funciones API ----------------------------------------------------------

export async function getCatalog(): Promise<CatalogResponse> {
  const r = await fetch("/api/catalog");
  if (!r.ok) throw new Error("Error al obtener el catálogo");
  return r.json();
}

export async function getPacks(tipo?: "variado" | "salado") {
  const r = await fetch(`/api/packs${tipo ? `?tipo=${tipo}` : ""}`);
  if (!r.ok) throw new Error("Error al obtener los packs");
  return r.json();
}

export async function quote(payload: QuotePayload) {
  const r = await fetch("/api/quote", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!r.ok) throw new Error("Error al obtener la cotización");
  return r.json();
}

export async function getTerms() {
  const r = await fetch("/api/terms");
  if (!r.ok) throw new Error("Error al obtener los términos");
  return r.json();
}
