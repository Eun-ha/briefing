export default function NotFound() {
  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-950 dark:bg-black dark:text-zinc-50">
      <main className="mx-auto flex max-w-5xl flex-col gap-10 px-6 py-14 sm:px-10">
        <section className="rounded-3xl bg-white p-8 shadow-sm dark:bg-zinc-900">
          <h1 className="text-3xl font-semibold">페이지를 찾을 수 없습니다</h1>
          <p className="mt-3 text-zinc-600 dark:text-zinc-300">
            요청하신 페이지가 존재하지 않습니다.
          </p>
        </section>
      </main>
    </div>
  );
}