/**
 * Contrato alineado con GET /api/activity — docs/product/technical-docs/api-activity.md
 */
export type Movement = {
  accountNumber: string;
  date: string;
  description: string;
  amount: number;
};
