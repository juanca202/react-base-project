import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import Home from './page';

vi.mock('next/link', () => {
  function MockLink({ children, href }: { children: React.ReactNode; href: string }) {
    return <a href={href}>{children}</a>;
  }
  return { default: MockLink };
});

describe('Home', () => {
  it('renders accounts and recent movements sections', () => {
    render(<Home />);
    expect(screen.getByRole('heading', { name: /mis cuentas/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /últimos movimientos/i })).toBeInTheDocument();
    expect(screen.getByText(/cuenta nómina/i)).toBeInTheDocument();
    expect(screen.getByText(/supermercado central/i)).toBeInTheDocument();
  });

  it('renders quick action links', () => {
    render(<Home />);
    expect(screen.getByRole('link', { name: /transferencias/i })).toHaveAttribute(
      'href',
      '/transfers'
    );
    expect(screen.getByRole('link', { name: /servicios/i })).toHaveAttribute(
      'href',
      '/services-payment'
    );
    expect(screen.getByRole('link', { name: /pagos qr/i })).toHaveAttribute('href', '/qr-payments');
  });
});
