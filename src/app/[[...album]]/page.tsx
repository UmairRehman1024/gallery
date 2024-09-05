import { SignedIn, SignedOut } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { getMyAlbums, getMyImages, getAlbumID } from "~/server/queries";

export const dynamic = "force-dynamic";

async function Images(props: { albumURL: string }) {
  const images = await getMyImages();

  console.log(props.albumURL);

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
    <div className="flex flex-wrap justify-center gap-4 p-2">
      <div>{props.albumURL}</div>
      {albums.map((album) => (
        <Album key={album.id} name={album.name}></Album>
      ))}

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
    </div>
  );
}

export default async function HomePage({
  params,
}: {
  params: { album: string };
}) {
  return (
    <main className="">
      <SignedOut>
        <div className="h-full w-full pt-4 text-center text-2xl">
          Please sign in above
        </div>
      </SignedOut>
      <SignedIn>
        <Images albumURL={params.album} />
      </SignedIn>
    </main>
  );
}

function Album(props: { name: string }) {
  return (
    <div className="flex h-52 w-52 items-center justify-center">
      <Link
        className="flex h-1/3 w-3/4 items-center justify-center rounded border-4 border-slate-300 shadow"
        href={props.name}
      >
        <p>{props.name}</p>
      </Link>
    </div>
  );
}
