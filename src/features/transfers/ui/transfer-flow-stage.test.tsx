import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { TransferFlowStage } from '@/features/transfers/ui/transfer-flow-stage';
import { executeTransferMock } from '@/features/transfers/api/transfers-mock';
import type { Account } from '@/shared/contracts/accounts';

const pushMock = vi.fn();

vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: pushMock
  })
}));

vi.mock('@/features/transfers/api/transfers-mock', () => ({
  executeTransferMock: vi.fn()
}));

const accountsFixture: Account[] = [
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
];

describe('TransferFlowStage', () => {
  beforeEach(() => {
    pushMock.mockClear();
    vi.mocked(executeTransferMock).mockReset();
    sessionStorage.clear();
  });

  it('muestra error si origen y destino son la misma cuenta', () => {
    render(<TransferFlowStage transferType="between-accounts" accounts={accountsFixture} />);

    fireEvent.change(screen.getByLabelText('Cuenta origen'), { target: { value: 'acc-001' } });
    fireEvent.change(screen.getByLabelText('Cuenta destino'), { target: { value: 'acc-001' } });
    fireEvent.change(screen.getByLabelText('Monto'), { target: { value: '100' } });
    fireEvent.click(screen.getByRole('button', { name: 'Continuar a verificación' }));

    expect(
      screen.getByText('La cuenta destino debe ser distinta a la cuenta origen.')
    ).toBeInTheDocument();
  });

  it('muestra error cuando el monto supera el saldo disponible', () => {
    render(<TransferFlowStage transferType="between-accounts" accounts={accountsFixture} />);

    fireEvent.change(screen.getByLabelText('Cuenta origen'), { target: { value: 'acc-002' } });
    fireEvent.change(screen.getByLabelText('Cuenta destino'), { target: { value: 'acc-001' } });
    fireEvent.change(screen.getByLabelText('Monto'), { target: { value: '600' } });
    fireEvent.click(screen.getByRole('button', { name: 'Continuar a verificación' }));

    expect(
      screen.getByText('El monto supera el saldo disponible de la cuenta origen.')
    ).toBeInTheDocument();
  });

  it('avanza a verificación y permite cancelar al selector', () => {
    render(<TransferFlowStage transferType="between-accounts" accounts={accountsFixture} />);

    fireEvent.change(screen.getByLabelText('Cuenta origen'), { target: { value: 'acc-001' } });
    fireEvent.change(screen.getByLabelText('Cuenta destino'), { target: { value: 'acc-002' } });
    fireEvent.change(screen.getByLabelText('Monto'), { target: { value: '150' } });
    fireEvent.change(screen.getByLabelText('Concepto (Opcional)'), {
      target: { value: 'Pago mensual' }
    });
    fireEvent.click(screen.getByRole('button', { name: 'Continuar a verificación' }));

    expect(screen.getByText('REVISAR TRANSFERENCIA')).toBeInTheDocument();
    expect(screen.getByText('Pago mensual')).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: 'Cancelar' }));
    expect(pushMock).toHaveBeenCalledWith('/transfers');
  });

  it('confirma transferencia y muestra pantalla de éxito con referencia', async () => {
    vi.mocked(executeTransferMock).mockResolvedValueOnce({
      transferType: 'between-accounts',
      originAccountId: 'acc-001',
      destinationAccountId: 'acc-002',
      amount: 200,
      description: 'Transfer demo',
      operationId: 'TRX-ABC123',
      executedAt: '2026-05-05T12:00:00.000Z'
    });

    render(<TransferFlowStage transferType="between-accounts" accounts={accountsFixture} />);

    fireEvent.change(screen.getByLabelText('Cuenta origen'), { target: { value: 'acc-001' } });
    fireEvent.change(screen.getByLabelText('Cuenta destino'), { target: { value: 'acc-002' } });
    fireEvent.change(screen.getByLabelText('Monto'), { target: { value: '200' } });
    fireEvent.change(screen.getByLabelText('Concepto (Opcional)'), {
      target: { value: 'Transfer demo' }
    });
    fireEvent.click(screen.getByRole('button', { name: 'Continuar a verificación' }));
    fireEvent.click(screen.getByRole('button', { name: 'Transferir' }));

    await waitFor(() => {
      expect(screen.getByText('COMPROBANTE')).toBeInTheDocument();
    });

    expect(screen.getByText(/TRX-ABC123/)).toBeInTheDocument();
  });
});
