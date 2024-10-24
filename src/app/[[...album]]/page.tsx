import { SignedIn, SignedOut } from "@clerk/nextjs";
import { Images } from "../_components/images";
import { Albums } from "../_components/albums";
import { PreviousAlbumButton } from "../_components/previous-album";
import { notFound, redirect } from "next/navigation";
import { CheckAlbumExists, CheckParams } from "~/server/queries/album";

export const dynamic = "force-dynamic";

export default async function HomePage({
  params,
}: {
  params: { album?: string[] };
}) {
  //check if params are valid

  return (
    <main className="">
      <SignedOut>
        <div className="h-full w-full pt-4 text-center text-2xl">
          Please sign in above
        </div>
      </SignedOut>
      <SignedIn>
        <SignedInChildren params={params.album}></SignedInChildren>
      </SignedIn>
    </main>
  );
}

function SignedInChildren(props: { params: string[] | undefined }) {
  const albumURL = CheckParams(props.params);
  return (
    <div className="flex flex-wrap justify-center gap-4 p-2">
      {albumURL && <PreviousAlbumButton albumURL={albumURL} />}
      <Albums albumURL={albumURL} />
      <Images albumURL={albumURL} />
    </div>
  );
}
