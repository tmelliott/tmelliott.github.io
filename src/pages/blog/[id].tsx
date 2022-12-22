import { ReactElement } from "react";
import ReactMarkdown from "react-markdown";

import fs from "fs";
import matter from "gray-matter";
import { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";
import path from "path";
import { ParsedUrlQuery } from "querystring";

import BaseLayout from "../../layouts/BaseLayout";
import { NextPageWithLayout } from "../_app";
import { Post, BLOG_DIRECTORY } from "./index";

type PostProps = {
  post: Post;
};

const BlogPost: NextPageWithLayout<PostProps> = ({ post }) => {
  return (
    <>
      <Head>
        <title>{post.title + " | Tom Elliott"}</title>
        <meta name="description" content="" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <section className="flex flex-col gap-2 prose">
        <h2 className="text-lg font-bold">{post.title}</h2>
        {post.content && <ReactMarkdown>{post.content}</ReactMarkdown>}
      </section>
    </>
  );
};

BlogPost.getLayout = function getLayout(page: ReactElement) {
  return <BaseLayout>{page}</BaseLayout>;
};

interface Params extends ParsedUrlQuery {
  id: string;
}

export const getStaticProps: GetStaticProps<PostProps, Params> = async (
  context
) => {
  // list files in pages/blog directory
  const files = fs.readdirSync(BLOG_DIRECTORY);

  // find post matching id
  const { id } = context.params!;
  const file = files.find((fn) => fn.replace(/\.mdx?$/, "") === id);
  if (!file) {
    return {
      redirect: {
        destination: "/blog",
        permanent: false,
      },
    };
  }

  const {
    content,
    data: { title, description, pubDate },
  } = matter(fs.readFileSync(path.join(BLOG_DIRECTORY, file)));

  return {
    props: {
      post: {
        url: `/blog/${file.replace(/\.mdx?$/, "")}`,
        title,
        description,
        pubDate: new Date(pubDate).toJSON(),
        content,
      },
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
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
      pubDate: new Date(pubDate).toJSON(),
    };
  });

  return {
    paths: posts.map((post) => ({
      params: {
        id: post.url.replace("/blog/", ""),
      },
    })),
    fallback: false,
  };
};

export default BlogPost;
