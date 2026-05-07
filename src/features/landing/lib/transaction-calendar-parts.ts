const MONTHS_ES = [
  'ENE',
  'FEB',
  'MAR',
  'ABR',
  'MAY',
  'JUN',
  'JUL',
  'AGO',
  'SEP',
  'OCT',
  'NOV',
  'DIC'
];

/** Día + mes abreviado (tipo maqueta Actividad reciente, Figma 36:1699). Usa UTC del ISO. */
export function transactionCalendarParts(isoDate: string): { day: string; month: string } {
  const d = new Date(isoDate);
  const day = String(d.getUTCDate()).padStart(2, '0');
  const month = MONTHS_ES[d.getUTCMonth()] ?? '';
  return { day, month };
}
