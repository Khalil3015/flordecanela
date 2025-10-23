export default function Footer() {
  return (
    <footer className="mt-16 bg-white border-t border-slate-200">
      <div className="mx-auto max-w-7xl px-6 py-10 grid gap-6 md:grid-cols-3 text-sm">
        <div>
          <div className="font-semibold">Flor de Canela — Coffee Break & Catering</div>
          <div className="text-slate-600 mt-1">Santiago de Surco, Lima – Perú</div>
          <div className="text-slate-600 mt-1">Tel: 948 878 204 · Email: vntas.flordecanela@gmail.com</div>
          {/* Datos del PDF. */ }
        </div>
        <div>
          <div className="font-semibold">Horarios & pedidos</div>
          <p className="text-slate-600 mt-1">Agenda tu pedido con 48h de anticipación. Nuestros precios no incluyen delivery.</p>
        </div>
        <div>
          <div className="font-semibold">Pagos</div>
          <p className="text-slate-600 mt-1">Transferencias, Yape/Plin y tarjetas.</p>
        </div>
      </div>
      <div className="text-center text-xs text-slate-500 py-6">© {new Date().getFullYear()} Flor de Canela — Todos los derechos reservados.</div>
    </footer>
  );
}
