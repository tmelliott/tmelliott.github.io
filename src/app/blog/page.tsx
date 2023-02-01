import Image from "next/image";
import Link from "next/link";
import getPosts from "./getPosts";

export default function Blog() {
  const posts = getPosts();
  console.log(posts);

  return (
    <>
      <h1 className=" text-xl font-heading">Blog Posts</h1>

      <div className="grid lg:grid-cols-2 gap-8 my-8">
        {posts.map(
          ({ slug, title, description, image, tags, draft }, index) => (
            <div className={index === 0 ? "lg:col-span-2" : ""} key={slug}>
              <Link href={`/blog/${slug}`}>
                <div
                  className={`flex flex-col md:flex-row gap-2 shadow bg-gray-100 group ${
                    index === 0 ? "lg:h-96" : "lg:flex-col"
                  }`}
                >
                  {/* image */}
                  <div
                    className={`h-52 md:min-h-52 md:w-52 bg-gray-800 relative overflow-hidden  ${
                      index === 0 ? "lg:w-72 lg:h-full" : "lg:w-full"
                    }`}
                  >
                    <Image
                      src={`${image}`}
                      alt={title}
                      fill={true}
                      className="object-cover group-hover:scale-105 transition-transform"
                    />
                  </div>
                  <div className="px-4 pb-4 flex-1">
                    <h3
                      className={`text-lg flex-1 font-heading hover:text-blue-800 ${
                        index === 0 && "lg:text-xl"
                      }`}
                    >
                      {title}
                    </h3>
                    <p className="text-sm italic">{description}</p>
                  </div>
                </div>
              </Link>
            </div>
          )
        )}
      </div>
    </>
  );
}
