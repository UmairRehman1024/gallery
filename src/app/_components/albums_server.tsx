import Link from "next/link";
import { getMyAlbums } from "~/server/actions/album";
import { GetInitialAlbums } from "~/server/queries/album";

//props: {Current: number | null, IDs: number[]}
export async function AlbumsServer() {
  const albums = await GetInitialAlbums();

  //const path = props.IDs.length === 0 ? "/" : `/${props.IDs.join("/")}`;

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
          {/* <Link
            className="flex h-1/3 w-3/4 items-center justify-center rounded border-4 border-slate-300 shadow"
            href={`${path}/${album.id}`}
          >
            <p>{album.name}</p>
          </Link> */}
          <div className="flex h-1/3 w-3/4 items-center justify-center rounded border-4 border-slate-300 shadow">
            <p>Album</p>
          </div>
        </div>
      ))}
    </>
  );
}
//change link to form with action to chnage the current album
