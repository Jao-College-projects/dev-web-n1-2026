import { motion } from "framer-motion";

interface DashboardStatsProps {
  totalPecas: number;
  totalCategorias: number;
  ticketMedio: number;
  totalEstoque: number;
}

export function DashboardStats({ totalPecas, totalCategorias, ticketMedio, totalEstoque }: DashboardStatsProps): JSX.Element {
  return (
    <div className="row g-4 mb-12">
      {/* Total de Peças */}
      <div className="col-12 col-sm-6 col-lg-3">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white border border-stone-200 p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow"
        >
          <p className="font-sans text-[0.65rem] uppercase tracking-[0.2em] text-gold-dark mb-2">Total de Peças</p>
          <h3 className="font-display text-[1.8rem] font-medium text-charcoal">{totalPecas}</h3>
          <div className="h-1 w-8 bg-stone-100 mt-3" />
        </motion.div>
      </div>

      {/* Categorias */}
      <div className="col-12 col-sm-6 col-lg-3">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white border border-stone-200 p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow"
        >
          <p className="font-sans text-[0.65rem] uppercase tracking-[0.2em] text-gold-dark mb-2">Categorias Ativas</p>
          <h3 className="font-display text-[1.8rem] font-medium text-charcoal">{totalCategorias}</h3>
          <div className="h-1 w-8 bg-stone-100 mt-3" />
        </motion.div>
      </div>

      {/* Ticket Médio */}
      <div className="col-12 col-sm-6 col-lg-3">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white border border-stone-200 p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow"
        >
          <p className="font-sans text-[0.65rem] uppercase tracking-[0.2em] text-gold-dark mb-2">Ticket Médio</p>
          <h3 className="font-display text-[1.4rem] font-medium text-charcoal">
            R$ {ticketMedio.toLocaleString('pt-BR', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
          </h3>
          <div className="h-1 w-8 bg-stone-100 mt-3" />
        </motion.div>
      </div>

      {/* Total em Estoque */}
      <div className="col-12 col-sm-6 col-lg-3">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white border border-stone-200 p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow"
        >
          <p className="font-sans text-[0.65rem] uppercase tracking-[0.2em] text-gold-dark mb-2">Unidades em Estoque</p>
          <h3 className="font-display text-[1.8rem] font-medium text-charcoal">{totalEstoque}</h3>
          <div className="h-1 w-8 bg-stone-100 mt-3" />
        </motion.div>
      </div>
    </div>
  );
}
