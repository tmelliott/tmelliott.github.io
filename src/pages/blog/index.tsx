import { ReactElement } from "react";

import fs from "fs";
import matter from "gray-matter";
import { GetStaticProps, InferGetStaticPropsType } from "next";
import Head from "next/head";
import Link from "next/link";
import path from "path";

import BaseLayout from "../../layouts/BaseLayout";
import { NextPageWithLayout } from "../_app";

const BLOG_DIRECTORY = path.join(process.cwd(), "src", "pages", "blog");

type Post = {
  url: string;
  title: string;
  description: string;
  pubDate: string;
};

interface BlogProps {
  posts: Post[];
}

const Blog: NextPageWithLayout<BlogProps> = ({ posts }) => {
  return (
    <>
      <Head>
        <title>Tom Elliott | Blog</title>
        <meta name="description" content="" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <h2 className="text-lg font-bold">All posts</h2>
      <section className="flex flex-col gap-2">
        {posts.map((post) => (
          <Link
            key={post.url}
            href={post.url}
            className="border-b py-2 group last:border-none"
          >
            <div className="flex-1">
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
    (fn) => fn.endsWith(".mdx") || fn.endsWith(".md")
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
      pubDate,
    };
  });

  return {
    props: {
      posts,
    },
  };
};

export default Blog;
