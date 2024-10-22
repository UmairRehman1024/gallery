import Link from "next/link";
import { getAlbumID } from "~/server/actions/album";
import Image from "next/image";
import { getMyAlbumImages } from "~/server/actions/image";

export async function Images(props: { albumURL?: number[] }) {
  let images;

  // if (props.albumURL) {
  //   const currentAlbumID = await getAlbumID(
  //     props.albumURL[props.albumURL.length - 1],
  //   );
  //   images = await getMyAlbumImages(currentAlbumID);
  // } else {
  //   images = await getMyAlbumImages(null);
  // }

  if (props.albumURL) {
    images = await getMyAlbumImages(props.albumURL[props.albumURL.length - 1]);
  } else {
    images = await getMyAlbumImages(undefined);
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
