/**
 * Chips de filtro (demo visual) — maqueta Figma nodo 36:1699; sin filtrado real de datos.
 */
export function FilterChips() {
  const chips = [
    { id: 'all', label: 'Todos', active: true },
    { id: 'accounts', label: 'Cuentas', active: false },
    { id: 'cards', label: 'Tarjetas', active: false },
    { id: 'invest', label: 'Inversiones', active: false },
    { id: 'loans', label: 'Préstamos', active: false }
  ] as const;

  return (
    <div
      className="flex gap-2 overflow-x-auto px-6 pb-2 pt-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      role="toolbar"
      aria-label="Filtros de productos (demo)"
    >
      {chips.map((c) => (
        <button
          key={c.id}
          type="button"
          aria-pressed={c.active}
          className={
            c.active
              ? 'shrink-0 rounded-xl border border-[#d0f0f6] bg-[#f2f3f7] px-3 py-1 text-center text-xs font-semibold leading-5 text-[#008292]'
              : 'shrink-0 rounded-xl border border-white px-3 py-1 text-center text-xs font-semibold leading-5 text-white'
          }
        >
          {c.label}
        </button>
      ))}
    </div>
  );
}
