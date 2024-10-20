"use client";

import { getMyAlbumImages } from "~/server/queries/image";
import { useAlbumStore } from "~/providers/album-store-provider";
import { GalleryImage } from "./image";
import Link from "next/link";
import Image from "next/image";
import { ImagesServer } from "./images_server";

export function Images(props: { albumURL: string[] }) {
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
      <ImagesServer Current={getCurrent()}></ImagesServer>
    </>
  );
}
