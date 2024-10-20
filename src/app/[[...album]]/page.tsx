import { SignedIn, SignedOut } from "@clerk/nextjs";

import { PreviousAlbumButton } from "../_components/previous-album";
import { ImagesServer } from "../_components/images_server";
import { AlbumsServer } from "../_components/albums_server";

export const dynamic = "force-dynamic";

export default async function HomePage({
  params,
}: {
  params: { album: string[] };
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
          <AlbumsServer />
          <ImagesServer />
        </div>
      </SignedIn>
    </main>
  );
}
