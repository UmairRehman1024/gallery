import { getMyAlbumImages } from "~/server/actions/image";
import { GalleryImage } from "./image";
import Link from "next/link";
import Image from "next/image";
import { GetInitialImages } from "~/server/queries/image";

//props: { Current: number | null }

export async function ImagesServer() {
  const images = await GetInitialImages();
  return (
    <>
      {images.map((image) => (
        <div className="flex h-52 w-52 flex-col items-center justify-center">
          <Link href={`/img/${image.id}`} className="h-full w-full">
            <div className="relative h-5/6 w-full">
              <Image
                src={image.url}
                alt={image.name}
                fill
                className="h-full w-full object-contain"
                sizes="208px"
              />
            </div>
            <div className="h-8 overflow-hidden text-ellipsis text-nowrap pt-2 text-center">
              {image.name}
            </div>
          </Link>
        </div>
      ))}
    </>
  );
}
