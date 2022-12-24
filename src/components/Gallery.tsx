// gallery of images
import Image from "next/image";

type GalleryImage = {
  src: string;
  caption: string;
};
type GalleryProps = {
  images: GalleryImage[];
};

export default function Gallery({ images }: GalleryProps) {
  return (
    <div className="grid grid-cols-2 gap-2">
      {images.map((image) => (
        <div
          key={image.src}
          className="flex flex-col bg-gray-100 shadow p-2 gap-2"
        >
          <img src={image.src} alt={image.caption} className="flex-1 m-0" />
          <p className="text-xs text-left italic m-0">{image.caption}</p>
        </div>
      ))}
    </div>
  );
}
