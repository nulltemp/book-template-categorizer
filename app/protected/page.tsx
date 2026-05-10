import { createClient } from "@/lib/supabase/server";
import { LogoutButton } from "@/components/logout-button";
import { redirect } from "next/navigation";

async function UserDetails() {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getClaims();

  if (error || !data?.claims) {
    redirect("/auth/login");
  }

  return JSON.stringify(data.claims, null, 2);
}

export default function ProtectedPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-4xl font-bold">保護されたページ</h1>
      <p className="mt-3 text-xl">
        このページは認証済みユーザーのみが閲覧できます。
      </p>
      <UserDetails />
      <LogoutButton />
    </div>
  );
}
