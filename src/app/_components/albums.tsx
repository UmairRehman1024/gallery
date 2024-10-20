"use client";

import Link from "next/link";
import { Album } from "~/components/album";
import { useAlbumStore } from "~/providers/album-store-provider";
import { getAlbumID, getMyAlbums } from "~/server/queries/album";

export async function Albums(props: { albumURL: string[] }) {
  // if (props.albumURL) {
  //   const currentAlbumID = await getAlbumID(
  //     props.albumURL[props.albumURL.length - 1],
  //   );
  //   albums = await getMyAlbums(currentAlbumID);
  // } else {
  //   albums = await getMyAlbums(null);
  // }

  const { IDs, getCurrent } = useAlbumStore((state) => state);

  const albums = await getMyAlbums(getCurrent());

  const path = IDs.length === 0 ? "/" : `/${IDs.join("/")}`;

  return (
    <>
      {albums.map((album) => (
        // <Album
        //   key={album.id}
        //   id={album.id}
        //   name={album.name}
        //   currentAlbumURL={props.albumURL}
        // ></Album>
        <div className="flex h-52 w-52 items-center justify-center">
          <Link
            className="flex h-1/3 w-3/4 items-center justify-center rounded border-4 border-slate-300 shadow"
            href={`${path}/${album.id}`}
          >
            <p>{album.name}</p>
          </Link>
        </div>
      ))}
    </>
  );
}
