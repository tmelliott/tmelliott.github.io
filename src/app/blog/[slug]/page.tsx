import { readFileSync } from "fs";
import { serialize } from "next-mdx-remote/serialize";
import MDXPost from "./MDXPost";
import dayjs from "dayjs";
import rehypeHighlight from "rehype-highlight";
import Image from "next/image";
import { join } from "path";
import getPosts from "../getPosts";

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
    join(process.cwd(), "content", "blog", `${slug}.mdx`),
    "utf8"
  );

  const rawMdx = await serialize(source, {
    parseFrontmatter: true,
    mdxOptions: {
      rehypePlugins: [rehypeHighlight],
    },
  });

  const { frontmatter, ...postMdx } = rawMdx;

  const image = frontmatter?.image;
  const date = dayjs(frontmatter?.date || null);

  return (
    <div className="flex justify-start p-8">
      {/* a nice image header */}

      <div className="prose">
        <div className="w-full h-[300px] relative p-0 mb-4">
          <Image
            src={`${
              image
                ? image
                : `https://picsum.photos/seed/${slug}/600/400?blur=5}`
            }`}
            alt={frontmatter.title}
            fill={true}
            className="p-0 m-0 object-cover"
          />
        </div>

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
  // list posts in /content/blog/
  const posts = getPosts();

  return posts.map(({ slug }) => ({
    slug,
  }));
}
