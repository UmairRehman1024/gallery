import { SignedIn, SignedOut } from "@clerk/nextjs";
import { Images } from "../_components/images";
import { Albums } from "../_components/albums";
import { PreviousAlbumButton } from "../_components/previous-album";
import { notFound, redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function HomePage({
  params,
}: {
  params: { album?: string[] };
}) {
  //check if params are valid

  const albumURL = await CheckParams(params.album);

  return (
    <main className="">
      <SignedOut>
        <div className="h-full w-full pt-4 text-center text-2xl">
          Please sign in above
        </div>
      </SignedOut>
      <SignedIn>
        <div className="flex flex-wrap justify-center gap-4 p-2">
          {params.album && <PreviousAlbumButton albumURL={albumURL} />}
          <Albums albumURL={albumURL} />
          <Images albumURL={albumURL} />
        </div>
      </SignedIn>
    </main>
  );
}

function CheckParams(params?: string[]) {
  let albumURL: number[] = [];
  if (params != undefined) {
    albumURL = [];
    params.forEach((param) => {
      //check if param is number

      const paramNumber = Number(param);

      console.log(paramNumber);

      if (isNaN(paramNumber)) {
        notFound();
      }

      albumURL?.push(paramNumber);

      //check if valid ID
    });
  }
  return albumURL;
}
