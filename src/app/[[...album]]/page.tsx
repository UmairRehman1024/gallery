import { SignedIn, SignedOut } from "@clerk/nextjs";
import Link from "next/link";
import { redirect } from "next/navigation";
import { getMyAlbums, getMyImages, getAlbumID } from "~/server/queries";
import { Images } from "../_components/images";

export const dynamic = "force-dynamic";

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
