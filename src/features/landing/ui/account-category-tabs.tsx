'use client';

import type { AccountCategoryTab } from '@/features/landing/types/account-category';

const TABS: { id: AccountCategoryTab; label: string }[] = [
  { id: 'all', label: 'Todos' },
  { id: 'accounts', label: 'Cuentas' },
  { id: 'cards', label: 'Tarjetas' },
  { id: 'investments', label: 'Inversiones' },
  { id: 'loans', label: 'Préstamos' }
];

export type AccountCategoryTabsProps = {
  active: AccountCategoryTab;
  onChange: (tab: AccountCategoryTab) => void;
};

/**
 * Pills del frame Home (Figma 36:1699): activo fondo claro; inactivo borde blanco sobre hero teal.
 */
export function AccountCategoryTabs({ active, onChange }: AccountCategoryTabsProps) {
  return (
    <div
      className="-mx-6 mb-4 flex gap-2 overflow-x-auto px-6 pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      role="tablist"
      aria-label="Filtrar productos"
    >
      {TABS.map(({ id, label }) => {
        const isActive = active === id;
        return (
          <button
            key={id}
            type="button"
            role="tab"
            aria-selected={isActive}
            onClick={() => onChange(id)}
            className={`shrink-0 rounded-[12px] border px-3 py-1 text-[length:var(--text-caption-size)] font-semibold leading-5 transition-colors ${
              isActive
                ? 'border-[var(--color-border-focus)] bg-[#f2f3f7] text-[var(--color-text-brand)]'
                : 'border-white bg-transparent text-white'
            }`}
          >
            {label}
          </button>
        );
      })}
    </div>
  );
}
