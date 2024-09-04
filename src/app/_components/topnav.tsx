import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { SimpleUploadButton } from "./simple-upload-button";
import { ThemeToggle } from "~/app/_components/theme-toggle";
import { Button } from "~/components/ui/button";
import { addAlbum } from "~/server/queries";

export function TopNav() {
  return (
    <nav className="flex w-full items-center justify-between border-b p-4 text-xl font-semibold">
      <div>Gallery</div>

      <div className="flex flex-row items-center gap-4">
        <SignedOut>
          <SignInButton />
        </SignedOut>
        <SignedIn>
          <AlbumButton />
          <ThemeToggle />
          <SimpleUploadButton />
          <UserButton />
        </SignedIn>
      </div>
    </nav>
  );
}

function AlbumButton() {
  return (
    <form
      action={async () => {
        "use server";

        const album = await addAlbum();
        console.log(album);
      }}
    >
      <Button type="submit">Add Album</Button>
    </form>
  );
}
