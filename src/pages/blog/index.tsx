import type { ReactElement } from "react";

import fs from "fs";
import matter from "gray-matter";
import type { GetStaticProps } from "next";
import type { MDXRemoteSerializeResult } from "next-mdx-remote";
import Head from "next/head";
import Link from "next/link";
import path from "path";

import BaseLayout from "../../layouts/BaseLayout";
import type { NextPageWithLayout } from "../_app";

export const BLOG_DIRECTORY = path.join(
  process.cwd(),
  "src",
  "content",
  "blog"
);

export type Post = {
  url: string;
  title: string;
  description: string;
  pubDate: string;
  image?: string;
  content: string | null;
  mdxSource: MDXRemoteSerializeResult<
    Record<string, unknown>,
    Record<string, string>
  > | null;
};

interface BlogProps {
  posts: Post[];
}

const Blog: NextPageWithLayout<BlogProps> = ({ posts }) => {
  return (
    <>
      <Head>
        <title>Blog | Tom Elliott</title>
        <meta name="description" content="" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <h2 className="text-lg font-bold">All posts</h2>
      <section className="flex flex-col gap-2 w-full">
        {posts.map((post) => (
          <Link
            key={post.url}
            href={post.url}
            className="border-b py-2 group last:border-none flex-1"
          >
            <div className="">
              <time
                // datetime={post.frontmatter.pubDate}
                className="text-xs italic text-slate-400"
              >
                {new Date(post.pubDate).toLocaleDateString("en-us", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </time>
              <h4 className="group-hover:text-slate-600">{post.title}</h4>
            </div>
            <p className="text-sm">{post.description}</p>
          </Link>
        ))}
      </section>
    </>
  );
};

Blog.getLayout = function getLayout(page: ReactElement) {
  return <BaseLayout>{page}</BaseLayout>;
};

export const getStaticProps: GetStaticProps<BlogProps> = async () => {
  // list files in pages/blog directory
  const files = fs.readdirSync(BLOG_DIRECTORY);

  // filter out non-markdown files
  const mdFiles = files.filter(
    (fn) => fn.endsWith(".md") || fn.endsWith(".mdx")
  );

  // read frontmatter from each file
  const posts: Post[] = mdFiles.map((file) => {
    const { title, description, pubDate } = matter(
      fs.readFileSync(path.join(BLOG_DIRECTORY, file))
    ).data;
    return {
      url: `/blog/${file.replace(/\.mdx?$/, "")}`,
      title,
      description,
      pubDate: new Date(pubDate).toJSON(),
      content: null,
      mdxSource: null,
    };
  });

  return {
    props: {
      posts: posts.sort(
        (a, b) =>
          -(new Date(a.pubDate).getTime() - new Date(b.pubDate).getTime())
      ),
    },
  };
};

export default Blog;
