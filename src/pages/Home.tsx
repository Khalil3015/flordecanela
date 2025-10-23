import HeroClassic from "../components/HeroClassic";
import { Link } from "react-router-dom";

function Feature({ title, text }: { title: string; text: string }) {
  return (
    <div className="card-soft p-6">
      <div className="text-lg font-semibold">{title}</div>
      <p className="mt-2 text-sm text-slate-600">{text}</p>
    </div>
  );
}

export default function Home() {
  return (
    <div>
      <HeroClassic />

      <section className="container mx-auto px-4 py-14">
        <div className="text-center">
          <span className="chip">¿Por qué elegirnos?</span>
          <h2 className="mt-3 font-serifBrand text-3xl md:text-4xl font-bold">Experiencia, sabor y presentación</h2>
          <p className="mt-3 text-slate-600 max-w-2xl mx-auto">
            Packs listos para tus eventos, carta variada y un cotizador simple. Calidad que se nota desde el primer bocado.
          </p>
        </div>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <Feature title="Presentación premium" text="Tarjetas claras, sombras suaves y fotos que mandan." />
          <Feature title="Rápido de cotizar" text="Elige por tramos exactos (24/25/48/50/96/100) y listo." />
          <Feature title="Entrega a tiempo" text="Agenda con 48 h. Delivery no incluido, consulta por zona." />
        </div>

        <div className="mt-10 text-center">
          <Link className="btn-primary" to="/cotizar">Empezar cotización</Link>
        </div>
      </section>
    </div>
  );
}
