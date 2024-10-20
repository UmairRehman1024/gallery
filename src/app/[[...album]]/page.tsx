import { SignedIn, SignedOut } from "@clerk/nextjs";
import { Images } from "../_components/images";
import { Albums } from "../_components/albums";
import { PreviousAlbumButton } from "../_components/previous-album";

export const dynamic = "force-dynamic";

export default async function HomePage({
  params,
}: {
  params: { album: number[] };
}) {
  return (
    <main className="">
      <SignedOut>
        <div className="h-full w-full pt-4 text-center text-2xl">
          Please sign in above
        </div>
      </SignedOut>
      <SignedIn>
        <div className="flex flex-wrap justify-center gap-4 p-2">
          {params.album && <PreviousAlbumButton albumURL={params.album} />}
          <Albums albumURL={params.album} />
          <Images albumURL={params.album} />
        </div>
      </SignedIn>
    </main>
  );
}
