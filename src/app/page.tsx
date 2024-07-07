import { SignedIn, SignedOut } from "@clerk/nextjs";
import Link from "next/link";
import { db } from "~/server/db";

export const dynamic = "force-dynamic";

const mockURLs = [
  "https://utfs.io/f/878d8c27-cc75-4aeb-8de2-7a2bfdbda5af-1nqriq.png",
  "https://utfs.io/f/44d9f548-a0c8-480c-936c-c948f07cd4df-13f8ci.jpg",
  "https://utfs.io/f/1ab14a50-f59f-442d-9e81-cfe32dabf3bf-x4qg1h.png",
  "https://utfs.io/f/e164afbc-9898-4470-afb9-15eefeff6e6c-xqvczi.png",
];

const mockImages = mockURLs.map((url, index) => ({
  id: index + 1,
  url,
}));
async function Images() {
  const images = await db.query.images.findMany({
    orderBy: (model, { desc }) => desc(model.id),
  });
  return (
    <div className="flex flex-wrap gap-4 p-8">
      {[...images, ...images, ...images].map((image) => (
        <div key={image.id} className="flex w-48 flex-col">
          <img src={image.url} />
          <div>{image.name}</div>
        </div>
      ))}
    </div>
  );
}

export default async function HomePage() {
  return (
    <main className="">
      <SignedOut>
        <div className="h-full w-full pt-4 text-center text-2xl">
          Please sign in above
        </div>
      </SignedOut>
      <SignedIn>
        <Images />
      </SignedIn>
    </main>
  );
}
