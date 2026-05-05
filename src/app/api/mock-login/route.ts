import { NextResponse } from 'next/server';

/** El login de demo usa solo `POST /api/token` con JSON (`username`, `password`). */
export async function POST() {
  return NextResponse.json(
    {
      error: 'Este endpoint está obsoleto. Usa POST /api/token con Content-Type application/json.'
    },
    { status: 410 }
  );
}
