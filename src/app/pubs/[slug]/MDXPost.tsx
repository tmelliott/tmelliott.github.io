"use client";

import Gallery from "@/components/Gallery";
import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";

export default function MDXPost({
  mdx,
}: {
  mdx: MDXRemoteSerializeResult<
    Record<string, unknown>,
    Record<string, string>
  >;
}) {
  return <MDXRemote {...mdx} components={{ Gallery }} />;
}
