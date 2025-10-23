import { Link } from "react-router-dom";

export default function HeroClassic() {
  return (
    <section className="relative">
      {/* Imagen de fondo */}
      <div className="absolute inset-0">
        <img
          src="/img/hero-rolls.jpg"
          alt="Pepperoni rolls de Flor de Canela"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/55 via-black/20 to-transparent" />
      </div>

      <div className="relative container mx-auto px-4 py-20 md:py-28 grid md:grid-cols-[1.1fr,0.9fr] gap-8 items-center">
        {/* Texto izquierda */}
        <div className="text-white">
          <span className="chip bg-white/90 text-slate-700">Coffee Break & Catering</span>
          <h1 className="heading-hero mt-5 text-4xl md:text-6xl">
            Sabores artesanales<br/> con <span className="text-brand-cream/90">estilo</span>
          </h1>
          <p className="mt-4 max-w-xl text-lg text-white/90">
            Bocaditos salados y dulces, packs por cantidad y cotizador en línea. Inspirado en tu carta de Flor de Canela.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            <Link className="btn-primary" to="/carta">Ver carta</Link>
            <Link className="btn-ghost bg-white/90" to="/packs">Ver packs</Link>
          </div>
          <div className="mt-5 flex flex-wrap gap-2 text-xs text-white/90">
            <span className="chip bg-white/80">Santiago de Surco – Lima</span>
            <span className="chip bg-white/80">948 878 204</span>
            <span className="chip bg-white/80">vntas.flordecanela@gmail.com</span>
          </div>
        </div>

        {/* Panel vacío para respirar (mantiene proporción imagen) */}
        <div className="hidden md:block" />
      </div>
    </section>
  );
}
