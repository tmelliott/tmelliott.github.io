export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col 2xl:flex-row h-full gap-8">
      <section className="flex-1">{children}</section>
      <aside className="2xl:w-[240px] border-t 2xl:border-t-0 2xl:border-l h-full py-8 2xl:py-0 2xl:px-8 flex 2xl:flex-col gap-12">
        <div className="flex gap-4 flex-col">
          <h4 className="font-bold font-heading">Recent posts</h4>
          <ul className="">
            <li>post 1</li>
            <li>post 2</li>
            <li>post 3</li>
          </ul>
        </div>

        <div className="flex gap-4 flex-col">
          <h4 className="font-bold font-heading">Tags</h4>
          <ul className="">
            <li>tag 1</li>
            <li>tag 2</li>
            <li>tag 3</li>
          </ul>
        </div>
      </aside>
    </div>
  );
}
