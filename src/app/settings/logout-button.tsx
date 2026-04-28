"use client";

import { useRouter } from "next/navigation";

export function LogoutButton() {
  const router = useRouter();

  return (
    <button
      type="button"
      className="w-full text-left text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
      onClick={() => {
        router.push("/");
      }}
    >
      Sign out
    </button>
  );
}
