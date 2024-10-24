import { SignedIn, SignedOut } from "@clerk/nextjs";
import { Images } from "../../_components/images";
import { Albums } from "../../_components/albums";
import { PreviousAlbumButton } from "../../_components/previous-album";
import { notFound, redirect } from "next/navigation";
import { CheckAlbumExists } from "~/server/queries/album";

export const dynamic = "force-dynamic";

export default async function AlbumPage({
  params,
}: {
  params: { slug: string };
}) {
  //check if params are valid

  console.log(`slug-${params.slug}`);

  return (
    <main className="">
      <SignedOut>
        <div className="h-full w-full pt-4 text-center text-2xl">
          Please sign in above
        </div>
      </SignedOut>
      <SignedIn>
        <SignedInChildren albumID={params.slug}></SignedInChildren>
      </SignedIn>
    </main>
  );
}

async function SignedInChildren({ albumID }: { albumID: string }) {
  // const albumURL = CheckParams(props.params);

  console.log(albumID);

  const albumIDNumber = Number(albumID);

  console.log("albumID-" + albumIDNumber);
  if (isNaN(albumIDNumber)) {
    notFound();
  }

  const albumIDExists = await CheckAlbumExists(albumIDNumber);
  console.log("albumIDExists-" + albumIDExists);

  if (!albumIDExists) {
    notFound();
  }
  return (
    <div className="flex flex-wrap justify-center gap-4 p-2">
      <PreviousAlbumButton albumID={albumIDNumber} />
      <Albums albumID={albumIDNumber} />
      <Images albumID={albumIDNumber} />
    </div>
  );
}
