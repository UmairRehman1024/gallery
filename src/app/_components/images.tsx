import Link from "next/link";
import {
  getAlbumID,
  getMyAlbums,
  getMyImages,
  getMyImagesParent,
} from "~/server/queries";
import Image from "next/image";
import { Album } from "~/components/album";

export async function Images(props: { albumURL: string[] }) {
  let images;

  if (props.albumURL) {
    const currentAlbumID = await getAlbumID(
      props.albumURL[props.albumURL.length - 1],
    );
    images = await getMyImagesParent(currentAlbumID);
  } else {
    images = await getMyImagesParent(null);
  }

  return (
    <>
      {images.map((image) => (
        <div
          key={image.id}
          className="flex h-52 w-52 flex-col items-center justify-center"
        >
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
