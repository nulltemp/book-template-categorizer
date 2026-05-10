"use client";

import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

export function LogoutButton() {
  const router = useRouter();

  const logout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/");
  };

  return (
    <button
      className="flex h-12 w-full items-center justify-center gap-2 rounded-full bg-red-500 px-5 text-white transition-colors hover:bg-red-600 md:w-[158px]"
      onClick={logout}
    >
      ログアウト
    </button>
  );
}
