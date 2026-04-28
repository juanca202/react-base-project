import Link from "next/link";
import { LogoutButton } from "./logout-button";

export default function SettingsPage() {
  return (
    <div className="mx-auto flex min-h-full w-full max-w-md flex-col gap-6 p-6">
      <header>
        <Link
          href="/"
          className="text-sm text-zinc-600 underline underline-offset-4 hover:text-foreground dark:text-zinc-400"
        >
          ← Back
        </Link>
        <h1 className="mt-4 text-2xl font-semibold tracking-tight">Settings</h1>
      </header>

      <nav aria-label="Account and legal">
        <ul className="divide-y divide-zinc-200 rounded-lg border border-zinc-200 dark:divide-zinc-800 dark:border-zinc-800">
          <li>
            <Link
              href="/privacy"
              className="block px-4 py-3 text-zinc-900 hover:bg-zinc-50 dark:text-zinc-100 dark:hover:bg-zinc-900/40"
            >
              Privacy policy
            </Link>
          </li>
          <li>
            <Link
              href="/terms"
              className="block px-4 py-3 text-zinc-900 hover:bg-zinc-50 dark:text-zinc-100 dark:hover:bg-zinc-900/40"
            >
              Terms and conditions
            </Link>
          </li>
          <li className="px-4 py-3">
            <LogoutButton />
          </li>
        </ul>
      </nav>
    </div>
  );
}
