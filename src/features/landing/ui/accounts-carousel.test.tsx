import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { AccountsCarousel } from '@/features/landing/ui/accounts-carousel';

describe('AccountsCarousel', () => {
  it('muestra estado vacío cuando no hay cuentas', () => {
    render(<AccountsCarousel accounts={[]} />);

    expect(screen.getByLabelText('Resumen de cuentas')).toBeInTheDocument();
    expect(screen.getByText('No hay cuentas para mostrar.')).toBeInTheDocument();
  });

  it('muestra título y formatea tarjetas de ahorro/corriente', () => {
    render(
      <AccountsCarousel
        accounts={[
          {
            id: 'acc-001',
            number: '001234567890',
            balance: 1251.5,
            type: 'saving',
            name: 'Cuenta principal'
          },
          {
            id: 'acc-002',
            number: '009876543210',
            balance: 420,
            type: 'checking'
          }
        ]}
      />
    );

    expect(screen.getByText('Tus cuentas')).toBeInTheDocument();
    expect(screen.getByText('Cuenta principal')).toBeInTheDocument();
    expect(screen.getByText('Cta. ahorros**** *7890')).toBeInTheDocument();
    expect(screen.getByText('Cta. corriente**** *3210')).toBeInTheDocument();
    expect(screen.getAllByText('Saldo')).toHaveLength(2);
  });

  it('en variante figma no renderiza encabezado y muestra copy de tarjeta crédito', () => {
    render(
      <AccountsCarousel
        variant="figma"
        accounts={[
          {
            id: 'acc-003',
            number: '4111111111111111',
            balance: -120.75,
            type: 'credit-card',
            name: 'Tarjeta clasica'
          }
        ]}
      />
    );

    expect(screen.queryByText('Tus cuentas')).not.toBeInTheDocument();
    expect(screen.getByText('Tarjeta clasica')).toBeInTheDocument();
    expect(screen.getByText('4111**** 1111')).toBeInTheDocument();
    expect(screen.getByText('Total a pagar')).toBeInTheDocument();
  });
});
