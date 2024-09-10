import { Album } from "~/components/album";
import { getAlbumID, getMyAlbums } from "~/server/queries";

export async function Albums(props: { albumURL: string[] }) {
  let albums;

  if (props.albumURL) {
    const currentAlbumID = await getAlbumID(
      props.albumURL[props.albumURL.length - 1],
    );
    albums = await getMyAlbums(currentAlbumID);
  } else {
    albums = await getMyAlbums(null);
  }
  return (
    <>
      <div>{props.albumURL}</div>
      {albums.map((album) => (
        <Album
          key={album.id}
          name={album.name}
          currentAlbumURL={props.albumURL}
        ></Album>
      ))}
    </>
  );
}
