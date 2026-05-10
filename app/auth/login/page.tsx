"use client";

import { createClient } from "@/lib/supabase/client";
import { useState } from "react";

export default function Page() {
  const [signingIn, setSigningIn] = useState(false);

  const supabase = createClient();

  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <button
          className="flex h-12 w-full items-center justify-center gap-2 rounded-full bg-blue-500 px-5 text-white transition-colors hover:bg-blue-600 md:w-[158px]"
          onClick={async (e: React.MouseEvent<HTMLButtonElement>) => {
            e.preventDefault();

            setSigningIn(true);
            await supabase.auth.signInWithOAuth({
              provider: "google",
              options: {
                redirectTo: `${window.location.origin}/auth/callback`,
              },
            });
            setSigningIn(false);
          }}
          disabled={signingIn}
        >
          {signingIn ? "ログイン中..." : "Googleでログイン"}
        </button>
      </div>
    </div>
  );
}
