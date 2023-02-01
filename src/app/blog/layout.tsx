export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col xl:flex-row h-full gap-8">
      <section className="flex-1">{children}</section>
      <aside className="lg:w-[240px] border-t lg:border-t-0 lg:border-l h-full py-8 lg:py-0 lg:px-8 flex lg:flex-col gap-12">
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
