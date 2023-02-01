import { readdirSync, readFileSync } from "fs";
import { compile } from "@mdx-js/mdx";
import matter from "gray-matter";
import { join } from "path";

function readFrontmatter(slug: string) {
  const file = join(process.cwd(), "content", "blog", slug);
  const { data } = matter(readFileSync(file, "utf8"));

  if (data.image) {
    data.image = join("/images", data.image);
  } else {
    data.image = `https://picsum.photos/seed/${slug}/600/400?blur=5`;
  }

  return {
    slug: slug.replace(/\.mdx?$/, ""),
    title: data.title || slug,
    description: data.description || "",
    image: data.image,
    date: data.date || null,
    tags: data.tags || [],
    draft: data.draft || false,
  };
}

export default function getPosts() {
  // list all folders in /content/blog directory
  const files = readdirSync(`${process.cwd()}/content/blog`);
  const posts = files.map((slug) => readFrontmatter(slug));

  return posts;
}
