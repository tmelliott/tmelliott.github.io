import Image from "next/image";

type GalleryImageProp = {
  src: string;
  alt: string;
};

type GalleryProps = {
  title: string;
  images: GalleryImageProp[];
};

export default function Gallery({ images }: GalleryProps) {
  return (
    <div className="flex items-center justify-center gap-8 flex-wrap">
      {images.map(({ src, alt }) => (
        <div className="shadow p-2 flex flex-col gap-2" key={src}>
          <Image
            src={`/images/${src}`}
            alt={alt}
            width={200}
            height={80}
            className="object-cover object-center m-0"
          />
          <p className="text-xs italic m-0">{alt}</p>
        </div>
      ))}
    </div>
  );
}
