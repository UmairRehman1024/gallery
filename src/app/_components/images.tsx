"use client";

import { getMyAlbumImages } from "~/server/queries/image";
import { useAlbumStore } from "~/providers/album-store-provider";
import { GalleryImage } from "./image";
import Link from "next/link";
import Image from "next/image";

export async function Images(props: { albumURL: string[] }) {
  // let images;

  // if (props.albumURL) {
  //   const currentAlbumID = await getAlbumID(
  //     props.albumURL[props.albumURL.length - 1],
  //   );
  //   images = await getMyAlbumImages(currentAlbumID);
  // } else {
  //   images = await getMyAlbumImages(null);
  // }

  const { getCurrent } = useAlbumStore((state) => state);

  // const images = await getMyAlbumImages(getCurrent());
  //cant call server action in client component without form or event handler

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
