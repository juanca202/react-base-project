import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import TransfersPage from './page';

vi.mock('next/link', () => {
  function MockLink({ children, href }: { children: React.ReactNode; href: string }) {
    return <a href={href}>{children}</a>;
  }
  return { default: MockLink };
});

describe('TransfersPage', () => {
  it('renders transfer details step', () => {
    render(<TransfersPage />);

    expect(screen.getByRole('heading', { name: /transferencias/i })).toBeInTheDocument();
    expect(screen.getByLabelText(/cuenta de origen/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/cuenta destino/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/monto/i)).toBeInTheDocument();
  });

  it('moves to otp step after valid details', async () => {
    const user = userEvent.setup();
    render(<TransfersPage />);

    await user.clear(screen.getByLabelText(/monto/i));
    await user.type(screen.getByLabelText(/monto/i), '500');
    await user.click(screen.getByRole('button', { name: /continuar y pedir otp/i }));

    expect(
      await screen.findByRole('heading', { name: /confirma con otp/i }, { timeout: 3000 })
    ).toBeInTheDocument();
  });
});
