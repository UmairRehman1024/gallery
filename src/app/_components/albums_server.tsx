import Link from "next/link";
import { getMyAlbums } from "~/server/queries/album";

export async function AlbumsServer(props: {
  Current: number | null;
  IDs: number[];
}) {
  const albums = await getMyAlbums(props.Current);

  const path = props.IDs.length === 0 ? "/" : `/${props.IDs.join("/")}`;

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
