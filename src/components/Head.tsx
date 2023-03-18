import Head from "next/head";

export default function HeadTags({
  title,
  description,
  photo,
}: {
  title: string;
  description: string;
  photo?: string;
}) {
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="icon" href="/favicon.ico" />
    </Head>
  );
}
