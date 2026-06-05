"use server";

import { auth } from "@clerk/nextjs/server";
import {
  getBookTemplatesByUserId,
  createBookTemplate,
  deleteBookTemplate,
  updateBookTemplate,
} from "@/lib/bookTemplate";
import { revalidatePath } from "next/cache";

async function getAuthenticatedUserId() {
  const { userId } = await auth();
  if (!userId) {
    throw new Error("認証が必要です。");
  }
  return userId;
}

export async function getTemplatesForUser(userId: string) {
  return await getBookTemplatesByUserId(userId);
}

export async function addTemplate(formData: FormData) {
  const name = formData.get("name") as string;
  const width = parseInt(formData.get("width") as string);
  const height = parseInt(formData.get("height") as string);

  if (name && !isNaN(width) && !isNaN(height)) {
    await createBookTemplate(await getAuthenticatedUserId(), name, width, height);
    revalidatePath("/book-template");
  }
}

export async function updateTemplate(formData: FormData) {
  const id = parseInt(formData.get("id") as string);
  const name = formData.get("name") as string;
  const width = parseInt(formData.get("width") as string);
  const height = parseInt(formData.get("height") as string);

  if (!isNaN(id) && name && !isNaN(width) && !isNaN(height)) {
    await updateBookTemplate(id, await getAuthenticatedUserId(), { name, width, height });
    revalidatePath("/book-template");
  }
}

export async function removeTemplate(formData: FormData) {
  const id = parseInt(formData.get("id") as string);

  if (!isNaN(id)) {
    await deleteBookTemplate(id, await getAuthenticatedUserId());
    revalidatePath("/book-template");
  }
}
