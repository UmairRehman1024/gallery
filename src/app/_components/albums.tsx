import { Album } from "~/components/album";
import { getAlbumID, getMyAlbums } from "~/server/queries/album";

export async function Albums(props: { albumURL: number[] }) {
  let albums;

  // if (props.albumURL) {
  //   const currentAlbumID = await getAlbumID(
  //     props.albumURL[props.albumURL.length - 1],
  //   );
  //   albums = await getMyAlbums(currentAlbumID);
  // } else {
  //   albums = await getMyAlbums(null);
  // }

  if (props.albumURL && props.albumURL.length != undefined) {
    albums = await getMyAlbums(props.albumURL[props.albumURL.length - 1]);
  } else {
    albums = await getMyAlbums(undefined);
  }

  return (
    <>
      <div>{props.albumURL}</div>
      {albums.map((album) => (
        <Album
          key={album.id}
          id={album.id}
          name={album.name}
          currentAlbumURL={props.albumURL}
        ></Album>
      ))}
    </>
  );
}
