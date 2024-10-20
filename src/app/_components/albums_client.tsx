"use client";

import Link from "next/link";
import { Album } from "~/components/album";
import { useAlbumStore } from "~/providers/album-store-provider";
import { getAlbumID, getMyAlbums } from "~/server/queries/album";
import { AlbumsServer } from "./albums_server";

export function Albums(props: { albumURL: string[] }) {
  // if (props.albumURL) {
  //   const currentAlbumID = await getAlbumID(
  //     props.albumURL[props.albumURL.length - 1],
  //   );
  //   albums = await getMyAlbums(currentAlbumID);
  // } else {
  //   albums = await getMyAlbums(null);
  // }

  const { IDs, getCurrent } = useAlbumStore((state) => state);

  return <AlbumsServer Current={getCurrent()} IDs={IDs}></AlbumsServer>;
}
