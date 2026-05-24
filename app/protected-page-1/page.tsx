import { redirect } from "next/navigation";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { drizzle } from "drizzle-orm/libsql";
import { eq } from "drizzle-orm";
import { createClient } from "@libsql/client";
import { usersTable } from "../db/schema/users";

export default async function ProtectedPage1() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/");
  }

  const client = createClient({
    url: process.env.TURSO_DATABASE_URL!,
    authToken: process.env.TURSO_AUTH_TOKEN!,
  });
  const db = drizzle({ client });

  const user: typeof usersTable.$inferInsert = {
    name: "John",
    age: 30,
    email: "john@example.com",
  };

  await db.insert(usersTable).values(user);
  console.log("New user created!");

  const users = await db.select().from(usersTable);
  console.log("Getting all users from the database: ", users);

  await db
    .update(usersTable)
    .set({
      age: 31,
    })
    .where(eq(usersTable.email, user.email));
  console.log("User info updated!");

  await db.delete(usersTable).where(eq(usersTable.email, user.email));
  console.log("User deleted!");

  if (!session) {
    return <div>アクセス権がありません。ログインしてください。</div>;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-4xl font-bold">保護されたページ 1</h1>
      <p className="mt-3 text-xl">
        このページは認証済みユーザーのみが閲覧できます。
      </p>
      <p className="mt-3 text-xl">こんにちは、{session.user?.name}さん！</p>
    </div>
  );
}
