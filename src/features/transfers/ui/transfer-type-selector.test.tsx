import { fireEvent, render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { TransferTypeSelector } from '@/features/transfers/ui/transfer-type-selector';

const pushMock = vi.fn();

vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: pushMock
  })
}));

describe('TransferTypeSelector', () => {
  beforeEach(() => {
    pushMock.mockClear();
  });

  it('bloquea continuar hasta seleccionar tipo de transferencia', () => {
    render(<TransferTypeSelector />);

    const continueButton = screen.getByRole('button', { name: 'Continuar' });
    expect(continueButton).toBeDisabled();

    fireEvent.click(screen.getByRole('radio', { name: /Entre mis cuentas/i }));
    expect(continueButton).toBeEnabled();
  });

  it('navega a la ruta dinámica al confirmar selección', () => {
    render(<TransferTypeSelector />);

    fireEvent.click(screen.getByRole('radio', { name: /Entre mis cuentas/i }));
    fireEvent.click(screen.getByRole('button', { name: 'Continuar' }));

    expect(pushMock).toHaveBeenCalledWith('/transfers/between-accounts');
  });
});
