import { NextResponse } from 'next/server';
import { getRecentActivityMock } from '@/features/landing/api/activity-mock';

/** GET /api/activity — contrato definido en docs/product/technical-docs/api-activity.md */
export async function GET() {
  const activity = await getRecentActivityMock();
  return NextResponse.json(activity);
}
