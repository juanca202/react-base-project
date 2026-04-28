import Link from "next/link";

export default function Home() {
  return (
    <div className="flex min-h-full flex-1 flex-col items-center justify-center p-6">
      <Link
        href="/settings"
        className="text-foreground underline underline-offset-4 hover:opacity-80"
      >
        Settings
      </Link>
    </div>
  );
}
