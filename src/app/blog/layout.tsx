export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col lg:flex-row h-full">
      <section className="flex-1">{children}</section>
      <aside className="w-[240px] border-l h-full p-8 flex flex-col gap-4">
        <h4 className="font-bold">Recent posts</h4>
        <ul className="">
          <li>post 1</li>
          <li>post 2</li>
          <li>post 3</li>
        </ul>

        <hr />
        <h4 className="font-bold">Tags</h4>
        <ul className="">
          <li>tag 1</li>
          <li>tag 2</li>
          <li>tag 3</li>
        </ul>
      </aside>
    </div>
  );
}
