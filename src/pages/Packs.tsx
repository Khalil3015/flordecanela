import { useEffect, useState } from "react";
import { getPacks } from "../lib/api";
import { useCartStore } from "../store/cart";

function formatPEN(n: number) { return new Intl.NumberFormat("es-PE",{style:"currency",currency:"PEN",maximumFractionDigits:0}).format(n); }

export default function Packs() {
  const [variados, setVariados] = useState<any[]>([]);
  const [salados, setSalados] = useState<any[]>([]);
  const addPack = useCartStore(s=>s.addPack);

  useEffect(() => {
    getPacks("variado").then(setVariados);
    getPacks("salado").then(setSalados);
  }, []);

  const Block = ({ title, data }: { title: string; data: any[] }) => (
    <section className="mt-10">
      <h3 className="text-xl font-semibold">{title}</h3>
      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-6">
        {data.map(p => (
          <article key={p.id} className="glass p-5">
            <div className="flex items-center justify-between">
              <h4 className="font-semibold">{p.name}</h4>
              <span className="chip">{formatPEN(p.price)}</span>
            </div>
            <div className="text-sm text-slate-600 mt-1">{p.persons} · {p.pieces} bocaditos</div>
            {p.items?.length ? <ul className="mt-3 text-sm list-disc pl-5">{p.items.slice(0,6).map((it:string)=> <li key={it}>{it}</li>)}</ul> : null}
            <button className="btn-ghost mt-4" onClick={() => addPack(p, 1)}>Agregar Pack</button>
          </article>
        ))}
      </div>
    </section>
  );

  return (
    <div className="mx-auto max-w-7xl px-6 py-10">
      <h2 className="text-2xl font-bold">Packs por cantidad</h2>
      <p className="text-slate-600 mt-2">Selecciona un pack y agrégalo al cotizador.</p>
      <Block title="Packs Variados" data={variados} />
      <Block title="Packs Salados" data={salados} />
    </div>
  );
}
