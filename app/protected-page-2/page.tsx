"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ProtectedPage2() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "loading") return; // セッションの読み込み中
    if (!session) {
      // セッションがない場合、ログインページにリダイレクト
      router.push("/"); // または特定のログインページ
    }
  }, [session, status, router]);

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (!session) {
    return <div>アクセス権がありません。ログインしてください。</div>;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-4xl font-bold">保護されたページ 2</h1>
      <p className="mt-3 text-xl">
        このページも認証済みユーザーのみが閲覧できます。
      </p>
      <p className="mt-3 text-xl">こんにちは、{session.user?.name}さん！</p>
    </div>
  );
}
