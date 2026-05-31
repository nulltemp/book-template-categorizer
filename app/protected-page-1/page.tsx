import { auth, currentUser } from "@clerk/nextjs/server";

export default async function ProtectedPage1() {
  const { isAuthenticated } = await auth();

  if (!isAuthenticated) {
    return <div>Sign in to view this page</div>;
  }

  const user = await currentUser();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-4xl font-bold">保護されたページ 1</h1>
      <p className="mt-3 text-xl">
        このページは認証済みユーザーのみが閲覧できます。
      </p>
      <p className="mt-3 text-xl">こんにちは、{user?.firstName}さん！</p>
    </div>
  );
}
