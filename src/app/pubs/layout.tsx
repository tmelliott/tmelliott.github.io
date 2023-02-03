import Link from "next/link";
import getPubs from "./getPubs";

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pubs = getPubs();

  // get list of all unique tags
  const tags = pubs.reduce((acc, pub) => {
    if (pub.tags) {
      pub.tags.forEach((tag: string) => {
        if (!acc.includes(tag)) {
          acc.push(tag);
        }
      });
    }
    return acc;
  }, [] as string[]);

  // 5 most recent pubs
  const recentPubs = pubs.slice(0, 5);

  return (
    <div className="flex flex-col 2xl:flex-row gap-8 h-full">
      <section className="xl:h-full 2xl:overflow-y-scroll flex-1 p-4: lg:p-8">
        {children}
      </section>
      <aside className="2xl:w-[240px] border-t 2xl:border-t-0 2xl:border-l h-full py-8 2xl:py-0 2xl:px-8 flex 2xl:flex-col gap-12">
        <div className="flex gap-4 flex-col">
          <h4 className="font-bold font-heading">Recent pubs</h4>
          <ul className="text-sm flex flex-col gap-2">
            {recentPubs.map((post) => (
              <Link href={`/pubs/${post.slug}`} key={post.slug}>
                <li className="flex gap-1 items-center">{post.title}</li>
              </Link>
            ))}
          </ul>
        </div>

        <div className="flex gap-4 flex-col">
          <h4 className="font-bold font-heading">Tags</h4>
          <ul className="text-sm flex flex-col gap-2">
            {tags.map((tag) => (
              <Link href={`/pubs/tag/${tag}`} key={tag}>
                <li className="flex gap-1 items-center">
                  <strong>#</strong>
                  {tag}
                </li>
              </Link>
            ))}
          </ul>
        </div>
      </aside>
    </div>
  );
}
