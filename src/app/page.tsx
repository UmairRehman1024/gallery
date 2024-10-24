import { SignedIn, SignedOut } from "@clerk/nextjs";
import { Albums } from "./_components/albums";
import { Images } from "./_components/images";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  return (
    <main className="">
      <SignedOut>
        <div className="h-full w-full pt-4 text-center text-2xl">
          Please sign in above
        </div>
      </SignedOut>
      <SignedIn>
        <div className="flex flex-wrap justify-center gap-4 p-2">
          <Albums albumID={undefined} />
          <Images albumID={undefined} />
        </div>
      </SignedIn>
    </main>
  );
}
