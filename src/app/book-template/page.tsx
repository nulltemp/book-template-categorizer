import { auth } from "@clerk/nextjs/server";
import {
  getTemplatesForUser,
  addTemplate,
  removeTemplate,
  updateTemplate,
} from "@/actions/bookTemplateAction";
import { redirect } from "next/navigation";

export default async function BookTemplatePage() {
  const { userId } = await auth();

  if (!userId) {
    redirect("/sign-in");
  }

  const bookTemplates = await getTemplatesForUser(userId);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-4xl font-bold">書籍テンプレート管理</h1>

      <div className="mt-8 w-full max-w-md">
        <h2 className="text-2xl font-semibold mb-4">
          新しいテンプレートを追加
        </h2>
        <form action={addTemplate} className="space-y-4">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              テンプレート名
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 text-black"
            />
          </div>
          <div>
            <label
              htmlFor="width"
              className="block text-sm font-medium text-gray-700"
            >
              幅 (mm)
            </label>
            <input
              type="number"
              id="width"
              name="width"
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 text-black"
            />
          </div>
          <div>
            <label
              htmlFor="height"
              className="block text-sm font-medium text-gray-700"
            >
              高さ (mm)
            </label>
            <input
              type="number"
              id="height"
              name="height"
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 text-black"
            />
          </div>
          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            追加
          </button>
        </form>
      </div>

      <div className="mt-8 w-full max-w-md">
        <h2 className="text-2xl font-semibold mb-4">既存のテンプレート</h2>
        {bookTemplates.length === 0 ? (
          <p>テンプレートがありません。</p>
        ) : (
          <ul className="divide-y divide-gray-200">
            {bookTemplates.map((template) => (
              <li key={template.id} className="py-4">
                <div className="rounded-lg border border-gray-200 p-4">
                  <form action={updateTemplate} className="grid gap-4">
                    <input type="hidden" name="id" value={template.id} />
                    <div className="grid gap-4 sm:grid-cols-3">
                      <div>
                        <label
                          htmlFor={`name-${template.id}`}
                          className="block text-sm font-medium text-gray-700"
                        >
                          テンプレート名
                        </label>
                        <input
                          id={`name-${template.id}`}
                          name="name"
                          defaultValue={template.name}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 text-black"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor={`width-${template.id}`}
                          className="block text-sm font-medium text-gray-700"
                        >
                          幅 (mm)
                        </label>
                        <input
                          id={`width-${template.id}`}
                          name="width"
                          type="number"
                          defaultValue={template.width}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 text-black"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor={`height-${template.id}`}
                          className="block text-sm font-medium text-gray-700"
                        >
                          高さ (mm)
                        </label>
                        <input
                          id={`height-${template.id}`}
                          name="height"
                          type="number"
                          defaultValue={template.height}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 text-black"
                        />
                      </div>
                    </div>
                    <div className="flex justify-end">
                      <button
                        type="submit"
                        className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-indigo-700"
                      >
                        更新
                      </button>
                    </div>
                  </form>

                  <form
                    action={removeTemplate}
                    className="mt-4 flex justify-end"
                  >
                    <input type="hidden" name="id" value={template.id} />
                    <button
                      type="submit"
                      className="inline-flex items-center px-3 py-1.5 rounded-md bg-red-600 text-sm font-medium text-white hover:bg-red-700"
                    >
                      削除
                    </button>
                  </form>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
