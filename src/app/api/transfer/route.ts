import { NextResponse } from 'next/server';

export type TransferRequest = {
  sourceAccountNumber: string;
  targetAccountNumber: string;
  routerNumber: string;
  amount: number;
  description: string;
};

export type TransferResponse = {
  message: string;
};

export async function POST(request: Request) {
  const body = (await request.json()) as TransferRequest;

  if (!body.sourceAccountNumber || !body.targetAccountNumber || !body.routerNumber) {
    return NextResponse.json({ error: 'Campos requeridos incompletos.' }, { status: 400 });
  }

  if (body.sourceAccountNumber === body.targetAccountNumber) {
    return NextResponse.json(
      { error: 'La cuenta origen y la cuenta destino no pueden ser la misma.' },
      { status: 400 }
    );
  }

  if (!body.amount || body.amount <= 0) {
    return NextResponse.json({ error: 'El monto debe ser mayor a cero.' }, { status: 400 });
  }

  const response: TransferResponse = {
    message: 'Transferencia realizada con éxito.'
  };

  return NextResponse.json(response, { status: 200 });
}
