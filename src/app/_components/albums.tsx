import { Album } from "~/components/album";
import { getAlbumID, getMyAlbums } from "~/server/actions/album";

export async function Albums(props: { albumID?: number }) {
  let albums;

  // if (props.albumURL) {
  //   const currentAlbumID = await getAlbumID(
  //     props.albumURL[props.albumURL.length - 1],
  //   );
  //   albums = await getMyAlbums(currentAlbumID);
  // } else {
  //   albums = await getMyAlbums(null);
  // }

  if (props.albumID) {
    albums = await getMyAlbums(props.albumID);
  } else {
    albums = await getMyAlbums(undefined);
  }

  return (
    <>
      {/* <div>{props.albumURL}</div> */}
      {albums.map((album) => (
        <Album key={album.id} id={album.id} name={album.name}></Album>
      ))}
    </>
  );
}
