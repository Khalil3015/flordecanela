import { useEffect, useMemo, useState } from "react";
import { useCartStore } from "../store/cart";
import { quote, getCatalog } from "../lib/api"; // getCatalog agregado

function formatPEN(n: number) {
  return new Intl.NumberFormat("es-PE", {
    style: "currency",
    currency: "PEN",
    maximumFractionDigits: 0,
  }).format(n);
}

export default function Cotizar() {
  const { lines, removeAt, clear } = useCartStore();
  const [loading, setLoading] = useState(false);
  const [serverQuote, setServerQuote] = useState<any | null>(null);

  const payload = useMemo(
    () => ({
      items: lines
        .filter((l) => l.kind === "item")
        .map((l: any) => ({ id: l.item.id, qty: l.qty })),
      packs: lines
        .filter((l) => l.kind === "pack")
        .map((l: any) => ({ id: l.pack.id, count: l.count ?? 1 })),
    }),
    [lines]
  );

  // 🧩 NUEVO: carga desde el enlace ?q=...
  useEffect(() => {
  const params = new URLSearchParams(window.location.search);
  const q = params.get("q");
  if (!q) return;
  try {
    const parsed = JSON.parse(decodeURIComponent(q));
    getCatalog().then((cat) => {
      const addItem = useCartStore.getState().addItem;
      const addPack = useCartStore.getState().addPack;

      parsed.items?.forEach((it: any) => {
        const item = cat.items.find((i: any) => i.id === it.id);

        if (item)
          addItem(
            {
              ...(item as any),
              categoryId: (item as any).categoryId ?? "",
              priceTiers: (item as any).priceTiers ?? [],
            },
            it.qty
          );
      });

      parsed.packs?.forEach((pk: any) => {
        const p = pk;
        addPack(
          { id: p.id, name: "", type: "variado", pieces: 0, persons: "", price: 0 },
          p.count
        );
      });
    });
  } catch {
    console.warn("Error cargando cotización desde enlace.");
  }
}, []);

  async function doQuote() {
    setLoading(true);
    try {
      const q = await quote(payload);
      setServerQuote(q);
    } finally {
      setLoading(false);
    }
  }

function buildSummaryText(q: any) {
  let text = " *Flor de Canela - Cotización* \n\n";
  text += "Aquí tienes el detalle de tu pedido:\n\n";

  // 🔹 PRIORIDAD: usar q.lines (como el resumen actual)
  if (q.lines && q.lines.length > 0) {
    q.lines.forEach((ln: any) => {
      text += `• ${ln.label} — *S/ ${ln.subtotal}*\n`;
    });
  }

  // 🔹 Soporte alternativo: si usa items directamente
  else if (q.items && q.items.length > 0) {
    q.items.forEach((item: any) => {
      text += `• *${item.name}* — ${item.qty} unidades\n`;
    });
  }

  // 🔹 Packs (si existen)
  if (q.packs && q.packs.length > 0) {
    text += "\n *Packs seleccionados:*\n";
    q.packs.forEach((pack: any) => {
      text += `• *${pack.name}* × ${pack.count}\n`;
    });
  }

  // 🔹 Total y condiciones
  text += "\n──────────────────────\n";
  text += ` *Total estimado:* S/ ${q.total}\n\n`;
  text += " *Anticipación:* 48h (no incluye delivery)\n";
  text += " *Tiempo de espera:* 10 min aprox.\n";
  text += "──────────────────────\n\n";
  text += "Gracias por cotizar con nosotros \n";
  text += "Confirmaremos tu pedido por este medio.\n";

  return text;
}

function sendWhatsApp(q: any) {
  const msg = buildSummaryText(q);
  const phone = "51948878204"; // sin el +
  const encodedMsg = encodeURIComponent(msg);
  window.open(`https://wa.me/${phone}?text=${encodedMsg}`, "_blank");
}

  function sendEmail(q: any) {
  const subject = encodeURIComponent("Cotización – Flor de Canela");
  const body = encodeURIComponent(buildSummaryText(q)); // codifica correctamente
  window.location.href = `mailto:vntas.flordecanela@gmail.com?subject=${subject}&body=${body}`;
}

  // 🖨️ Nueva función para imprimir o guardar PDF
  function printQuote() {
    window.print();
  }

  

  return (
    <div className="mx-auto max-w-7xl px-6 py-10">
      <h2 className="text-2xl font-bold">Cotizador</h2>
      <div className="mt-6 grid gap-4">
        {lines.length === 0 && <p>No hay productos en el cotizador.</p>}
        {lines.map((l, i) => (
          <div key={i} className="glass p-4 flex items-center justify-between">
            <div>
              {l.kind === "item" ? (
                <>
                  <div className="font-semibold">{l.item.name}</div>
                  <div className="text-sm text-slate-600">{l.qty} unidades</div>
                </>
              ) : (
                <>
                  <div className="font-semibold">{l.pack.name}</div>
                  <div className="text-sm text-slate-600">
                    x{l.count} · {l.pack.pieces} bocaditos
                  </div>
                </>
              )}
            </div>
            <button className="btn-ghost" onClick={() => removeAt(i)}>
              Quitar
            </button>
          </div>
        ))}
      </div>

      <div className="mt-6 flex gap-3">
        <button className="btn-ghost" onClick={clear}>
          Vaciar
        </button>
        <button
          className="btn-primary"
          onClick={doQuote}
          disabled={loading || lines.length === 0}
        >
          {loading ? "Calculando…" : "Calcular total"}
        </button>
      </div>

      {serverQuote && (
        <div className="mt-8 glass p-6">
          <h3 className="font-semibold">Resumen</h3>
          <ul className="mt-3 text-sm text-slate-700 grid gap-1">
            {serverQuote.lines.map((ln: any, idx: number) => (
              <li key={idx} className="flex items-center justify-between">
                <span>{ln.label}</span>
                <span>{formatPEN(ln.subtotal)}</span>
              </li>
            ))}
          </ul>

          <div className="mt-4 border-t pt-3 flex items-center justify-between font-semibold">
            <span>Total</span>
            <span>{formatPEN(serverQuote.total)}</span>
          </div>

          {/* 🆕 Botones agregados */}
          <div className="mt-4 flex flex-wrap gap-3">
            <button
              className="btn-primary"
              onClick={() => sendWhatsApp(serverQuote)}
            >
              Enviar por WhatsApp
            </button>
            <button className="btn-ghost" onClick={() => sendEmail(serverQuote)}>
              Enviar por Email
            </button>
            <button className="btn-ghost" onClick={printQuote}>
              Imprimir / Guardar PDF
            </button>
            
          </div>

          <p className="text-xs text-slate-500 mt-3">
            Nos basamos en los precios y condiciones de tu carta: anticipación
            48h, no incluye delivery, y tiempo de espera 10min del conductor.
            Medios de pago disponibles y contacto en el pie de página.
          </p>
        </div>
      )}
    </div>
  );
}
