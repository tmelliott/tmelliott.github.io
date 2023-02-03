import { readdirSync, readFileSync } from "fs";
import matter from "gray-matter";
import { join } from "path";

function readFrontmatter(slug: string) {
  const file = join(process.cwd(), "content", "pubs", slug);
  const { data } = matter(readFileSync(file, "utf8"));

  return {
    slug: slug.replace(/\.mdx?$/, ""),
    title: data.title || slug,
    description: data.description || "",
    date: data.date || null,
    tags: data.tags || [],
    links: data.links || [],
    draft: data.draft || false,
  };
}

export default function getPubs() {
  // list all folders in /content/blog directory
  const files = readdirSync(`${process.cwd()}/content/pubs`);
  const pubs = files.map((slug) => readFrontmatter(slug));

  return pubs;
}
