// gallery of images
import { useState } from "react";

type GalleryImage = {
  src: string;
  caption: string;
};
type GalleryProps = {
  images: GalleryImage[];
};

export default function Gallery({ images }: GalleryProps) {
  const [fullscreenImage, setFullscreenImage] = useState<GalleryImage | null>();

  return (
    <div className="flex flex-wrap gap-4 justify-center">
      {images.map((image) => (
        <div
          key={image.src}
          className="flex flex-col bg-gray-100 shadow p-2 gap-2 flex-1 w-2/5 cursor-pointer"
          onClick={() => setFullscreenImage(image)}
        >
          <div className="relative aspect-square bg-pink-100 overflow-hidden">
            <img
              src={image.src}
              alt={image.caption}
              className="flex-1 m-0 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 scale-100 hover:scale-110 transition-transform"
            />
          </div>
          <p className="text-xs text-left italic m-0">{image.caption}</p>
        </div>
      ))}

      {fullscreenImage && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
          <div className="flex items-center justify-center h-full w-full p-8">
            <img
              src={fullscreenImage.src}
              alt={fullscreenImage.caption}
              className="object-contain w-full h-full shadow-lg"
            />
          </div>
          <button
            className="absolute top-0 right-0 m-4 text-white"
            onClick={() => setFullscreenImage(null)}
          >
            Close
          </button>
        </div>
      )}
    </div>
  );
}
