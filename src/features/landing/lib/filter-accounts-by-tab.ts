import type { Account } from '@/features/landing/types/account';
import type { AccountCategoryTab } from '@/features/landing/types/account-category';

export function filterAccountsByTab(accounts: Account[], tab: AccountCategoryTab): Account[] {
  switch (tab) {
    case 'all':
      return accounts;
    case 'accounts':
      return accounts.filter((a) => a.type === 'saving' || a.type === 'checking');
    case 'cards':
      return accounts.filter((a) => a.type === 'credit-card');
    case 'investments':
    case 'loans':
      return [];
    default:
      return accounts;
  }
}
