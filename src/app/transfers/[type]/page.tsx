import Link from 'next/link';
import { redirect } from 'next/navigation';
import { getAccountsMock } from '@/features/landing/api/accounts-mock';
import { TransferFlowStage } from '@/features/transfers/ui/transfer-flow-stage';

type TransferTypePageProps = {
  params: Promise<{ type: string }>;
};

function getTransferTypeLabel(type: string) {
  if (type === 'between-accounts') {
    return 'Transferir';
  }

  return 'Tipo de transferencia no reconocido';
}

export default async function TransferTypePage({ params }: TransferTypePageProps) {
  const { type } = await params;

  if (type !== 'between-accounts') {
    redirect('/transfers');
  }

  const typeLabel = getTransferTypeLabel(type);
  const accounts = await getAccountsMock();

  return (
    <main className="min-h-full w-full bg-[#f2f3f7] px-6 pb-10 pt-14">
      <div className="mx-auto w-full max-w-[360px] space-y-5">
        <Link
          href="/transfers"
          className="inline-flex text-[#1a1a1a]"
          aria-label="Volver al selector"
        >
          <svg viewBox="0 0 24 24" className="size-5" fill="none">
            <path
              d="M15 5l-7 7 7 7"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </Link>
        <h1 className="text-[32px] font-normal leading-[28px] tracking-[0.02em] text-[#1a1a1a]">
          {typeLabel.toUpperCase()}
        </h1>
        <TransferFlowStage transferType={type} accounts={accounts} />
      </div>
    </main>
  );
}
