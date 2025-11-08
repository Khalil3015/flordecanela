import { useCartStore } from "../store/cart";
import type { Item } from "../store/cart";

function formatPEN(n: number) {
  return new Intl.NumberFormat("es-PE", {
    style: "currency",
    currency: "PEN",
    maximumFractionDigits: 0,
  }).format(n);
}

export default function ItemCard({ item }: { item: Item }) {
  const addItem = useCartStore((s) => s.addItem);
  const img = item.image ?? `/img/${item.id}.jpg`;

  return (
    <article
      className="relative bg-[#1C1612]/90 border border-[#835a40] rounded-2xl overflow-hidden shadow-sm 
                 hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
    >
      {/* Imagen */}
      <div className="relative h-48 w-full overflow-hidden">
        <img
          src={img}
          alt={item.name}
          className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
          onError={(e) => {
            (e.target as HTMLImageElement).style.display = "none";
          }}
        />
        {/* Efecto de brillo */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#1c1612]/70 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity duration-500"></div>
      </div>

      {/* Contenido */}
      <div className="p-5">
        <h3 className="font-serifBrand text-lg font-semibold text-[#fff6ef]">
          {item.name}
        </h3>

        {item.tags && (
          <div className="mt-1 text-xs text-[#d6c4b2]">
            {item.tags.join(" · ")}
          </div>
        )}

        {item.notes && (
          <div className="mt-2 text-xs text-[#e9dbcd] italic">{item.notes}</div>
        )}

        {item.priceTiers.length === 0 ? (
          <div className="mt-4 flex items-center justify-between">
            <span className="text-sm text-slate-400">Precio a consultar</span>
            <a
              className="btn-agregar group"
              href="https://wa.me/51948878204"
              target="_blank"
              rel="noreferrer"
            >
              <span className="mr-1 transition-transform group-hover:-translate-y-[2px]">💬</span>
              Consultar
            </a>
          </div>
        ) : (
          <div className="mt-3 grid gap-2">
            {item.priceTiers.map((t) => (
              <div
                key={`${t.qty}-${t.price}`}
                className="flex items-center justify-between text-sm"
              >
                <span className="chip bg-[#fff6ef]/10 border border-[#3b2e24] text-[#f5e3d4]">
                  {t.qty} {t.unitLabel ?? "unid"}
                </span>
                <span className="font-medium text-[#ffe2cc]">
                  {formatPEN(t.price)}
                </span>
                <button
                  className="btn-agregar group"
                  onClick={() => addItem(item, t.qty)}
                >
                  <span className="mr-1 transition-transform group-hover:-translate-y-[2px]">
                    
                  </span>
                  Agregar
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </article>
  );
}
