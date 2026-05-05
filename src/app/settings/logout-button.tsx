'use client';

export function LogoutButton() {
  return (
    <form action="/api/mock-logout" method="post" className="contents">
      <button
        type="submit"
        className="w-full text-left text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
      >
        Sign out
      </button>
    </form>
  );
}
