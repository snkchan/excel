"use client";

import { useRouter } from "next/navigation";

export default function HomeBtn() {
  const router = useRouter();

  return (
    <button
      onClick={() => router.push("/")}
      className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-700 transition-colors"
    >
      홈으로
    </button>
  );
}
