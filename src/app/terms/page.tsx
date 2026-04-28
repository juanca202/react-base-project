import Link from "next/link";

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-prose p-6">
      <Link
        href="/settings"
        className="text-sm text-zinc-600 underline underline-offset-4 hover:text-foreground dark:text-zinc-400"
      >
        ← Back to settings
      </Link>
      <h1 className="mt-4 text-2xl font-semibold">Terms and conditions</h1>
      <p className="mt-4 text-zinc-600 dark:text-zinc-400">
        Placeholder for your terms and conditions legal content.
      </p>
    </div>
  );
}
