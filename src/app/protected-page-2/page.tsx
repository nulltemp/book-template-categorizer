"use client";

export default function ProtectedPage2() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-4xl font-bold">保護されたページ 2</h1>
      <p className="mt-3 text-xl">
        このページも認証済みユーザーのみが閲覧できます。
      </p>
    </div>
  );
}
