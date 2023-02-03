import Image from "next/image";
import Link from "next/link";
import getPubs from "./getPubs";

export default function Blog() {
  const pubs = getPubs();

  return (
    <>
      <h1 className=" text-xl font-heading">Articles & Reports</h1>

      <div className="flex flex-col gap-8 my-8">
        {pubs.map(({ slug, title, description, tags, links, draft }, index) => (
          <div className={index === 0 ? "lg:col-span-2" : ""} key={slug}>
            <Link href={`/pubs/${slug}`}>
              <div
                className={`flex flex-col gap-2 shadow bg-gray-100 group ${
                  index === 0 ? "lg:h-96" : "lg:flex-col"
                }`}
              >
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
        ))}
      </div>
    </>
  );
}
