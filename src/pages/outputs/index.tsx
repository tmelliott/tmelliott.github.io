import type { ReactElement } from "react";

import fs from "fs";
import matter from "gray-matter";
import type { GetStaticProps } from "next";
import Head from "next/head";
import Link from "next/link";
import path from "path";

import BaseLayout from "../../layouts/BaseLayout";
import type { NextPageWithLayout } from "../_app";

const OUTPUT_DIRECTORY = path.join(process.cwd(), "src", "pages", "outputs");

type Output = {
  url: string;
  title: string;
  description: string;
  pubDate: string;
  tags: string[];
  content?: string;
};

interface OutputsProps {
  outputs: Output[];
}

const Outputs: NextPageWithLayout<OutputsProps> = ({ outputs }) => {
  return (
    <>
      <Head>
        <title>Outputs | Tom Elliott</title>
        <meta name="description" content="" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <h2 className="text-lg font-bold">All Outputs</h2>
      <section className="flex flex-col gap-2">
        {outputs.map((output) => (
          <Link
            key={output.url}
            href={output.url}
            className="border-b py-2 group last:border-none"
          >
            <div className="flex-1">
              <time
                // datetime={Output.frontmatter.pubDate}
                className="text-xs italic text-slate-400"
              >
                {new Date(output.pubDate).toLocaleDateString("en-us", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </time>
              <h4 className="group-hover:text-slate-600">{output.title}</h4>
            </div>
            <p className="text-sm">{output.description}</p>
          </Link>
        ))}
      </section>
    </>
  );
};

Outputs.getLayout = function getLayout(page: ReactElement) {
  return <BaseLayout>{page}</BaseLayout>;
};

export const getStaticProps: GetStaticProps<OutputsProps> = async () => {
  // list files in pages/Outputs directory
  const files = fs.readdirSync(OUTPUT_DIRECTORY);

  // filter out non-markdown files
  const mdFiles = files.filter(
    (fn) => fn.endsWith(".mdx") || fn.endsWith(".md")
  );

  // read frontmatter from each file
  const outputs: Output[] = mdFiles.map((file) => {
    const { title, description, pubDate, tags } = matter(
      fs.readFileSync(path.join(OUTPUT_DIRECTORY, file))
    ).data;
    return {
      url: `/outputs/${file.replace(/\.mdx?$/, "")}`,
      title,
      description,
      pubDate: new Date(pubDate).toJSON(),
      tags: tags || [],
    };
  });

  return {
    props: {
      outputs: outputs.sort(
        (a, b) =>
          -(new Date(a.pubDate).getTime() - new Date(b.pubDate).getTime())
      ),
    },
  };
};

export default Outputs;
