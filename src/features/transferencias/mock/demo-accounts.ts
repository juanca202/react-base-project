/** Cuentas demo alineadas con pantallas Figma US-004 (formulario, modal, comprobante). */

export const DEMO_ROUTER_NUMBER = '021000021';

export type TransferDemoAccount = {
  id: string;
  accountNumber: string;
  displayName: string;
  /** Línea larga tipo formulario Figma */
  detailLine: string;
  /** Línea enmascarada tipo modal / comprobante */
  maskedLine: string;
  balance: number;
  selectable: boolean;
};

export const TRANSFER_DEMO_ACCOUNTS: TransferDemoAccount[] = [
  {
    id: 'gastos',
    accountNumber: '4489203829',
    displayName: 'Gastos',
    detailLine: 'Cta. Ahorros 4489203829',
    maskedLine: 'Cta. Ahorros ********142',
    balance: 231.88,
    selectable: true
  },
  {
    id: 'departamento',
    accountNumber: '4489203356',
    displayName: 'Departamento',
    detailLine: 'Cta. Ahorros 4489203356',
    maskedLine: 'Cta. Ahorros ********445',
    balance: 91.02,
    selectable: true
  },
  {
    id: 'auto',
    accountNumber: '4489203896',
    displayName: 'Auto',
    detailLine: 'Cta. Ahorros 4489203896',
    maskedLine: 'Cta. Ahorros ********896',
    balance: 1238.88,
    selectable: true
  },
  {
    id: 'corriente',
    accountNumber: '4489200646',
    displayName: 'Cuenta corriente',
    detailLine: 'Cta. corriente 4489200646',
    maskedLine: 'Cta. corriente ********646',
    balance: 0,
    selectable: false
  }
];

export function findDemoAccountByNumber(accountNumber: string): TransferDemoAccount | undefined {
  return TRANSFER_DEMO_ACCOUNTS.find((a) => a.accountNumber === accountNumber);
}
