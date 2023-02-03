import { readFileSync } from "fs";
import { serialize } from "next-mdx-remote/serialize";
import MDXPost from "./MDXPost";
import dayjs from "dayjs";
import rehypeHighlight from "rehype-highlight";
import Image from "next/image";
import { join } from "path";
import getPubs from "../getPubs";

var calendar = require("dayjs/plugin/calendar");
dayjs.extend(calendar);

export default async function BlogPost({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = params;

  // read the post file
  const source = readFileSync(
    join(process.cwd(), "content", "pubs", `${slug}.mdx`),
    "utf8"
  );

  const rawMdx = await serialize(source, {
    parseFrontmatter: true,
    mdxOptions: {
      rehypePlugins: [rehypeHighlight],
    },
  });

  const { frontmatter, ...postMdx } = rawMdx;
  const date = dayjs(frontmatter?.date || null);

  return (
    <div className="flex justify-start p-8">
      {/* a nice image header */}

      <div className="prose w-full md:w-auto">
        <h1>{frontmatter?.title || slug}</h1>
        {/* format date with datejs */}
        {frontmatter?.date && (
          <p className="text-sm italic">{date.format("D MMMM YYYY")}</p>
        )}

        <MDXPost mdx={postMdx} />
      </div>
    </div>
  );
}

export async function generateStaticParams() {
  // list pubs in /content/blog/
  const pubs = getPubs();

  return pubs.map(({ slug }) => ({
    slug,
  }));
}
