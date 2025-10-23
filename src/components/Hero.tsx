import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-hero-fc">
      {/* blobs decorativos */}
      <div className="pointer-events-none absolute -left-20 -top-20 h-[500px] w-[500px] rounded-full bg-brand-cream blur-3xl opacity-40" />
      <div className="pointer-events-none absolute -right-32 bottom-[-120px] h-[560px] w-[560px] rounded-full bg-brand-lilac/30 blur-3xl" />

      <div className="mx-auto max-w-7xl px-6 pt-10 pb-14 grid md:grid-cols-2 gap-8 items-center">
        {/* Texto */}
        <div>
          <span className="chip">Coffee Break & Catering</span>
          <h1 className="mt-5 text-4xl md:text-6xl font-extrabold leading-tight">
            Sabores artesanales con <span className="text-brand-cinnamon">estilo</span>
          </h1>
          <p className="mt-4 text-lg text-slate-600">
            Bocaditos salados y dulces, packs por cantidad y cotizador en línea. Inspirado en tu carta de Flor de Canela.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4">
            <Link to="/carta" className="btn-primary relative overflow-hidden">
              <span className="relative z-10">Ver carta</span>
              <span className="absolute inset-0 gradient-shimmer animate-shimmer rounded-full"></span>
            </Link>
            <Link to="/packs" className="btn-ghost">Ver packs</Link>
          </div>

          {/* badges */}
          <div className="mt-6 flex flex-wrap gap-2 text-xs text-slate-600">
            <span className="chip">Santiago de Surco – Lima</span>
            <span className="chip">948 878 204</span>
            <span className="chip">vntas.flordecanela@gmail.com</span>
          </div>
        </div>

        {/* Imagen */}
        <motion.div
          initial={{ opacity: 0, y: 30, rotate: -2 }} animate={{ opacity: 1, y: 0, rotate: 0 }}
          transition={{ duration: .8, ease: "easeOut" }}
          className="relative"
        >
          <div className="card overflow-hidden shadow-ring-soft animate-float">
            <img
              src="/img/hero-rolls.jpg"
              alt="Pepperoni rolls de Flor de Canela"
              className="w-full h-[360px] object-cover"
            />
          </div>

          {/* mini tarjetas flotantes */}
          <motion.div
            className="absolute -left-6 -bottom-6 card px-4 py-3 text-sm"
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: .4 }}
          >
            <div className="font-semibold">Pepperoni Rolls</div>
            <div className="text-slate-600">Horneados · crocantes</div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
