import Image from "next/image";
import getPosts from "./getPosts";

export default function Blog() {
  const posts = getPosts();

  return (
    <>
      <h1>Blog Posts</h1>

      <ul className="flex flex-col gap-8 my-8">
        {posts.map(({ slug, title, description, image, tags, draft }) => (
          <li key={slug} className="flex gap-4">
            <div>
              <h3 className="text-lg flex-1 hover:text-blue-800">
                <a href={`/blog/${slug}`}>{title}</a>
              </h3>
              <p className="text-sm italic">{description}</p>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}
