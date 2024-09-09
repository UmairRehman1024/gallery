"use client";

import { usePathname } from "next/navigation";
import { Button } from "~/components/ui/button";
import { addAlbum } from "~/server/queries";

export function AlbumButton() {
  return (
    <form
      action={async () => {
        "use server";

        const name = "autumn";
        console.log(usePathname());

        const album = await addAlbum(name);
        console.log(album);
      }}
    >
      <Button type="submit">Add Album</Button>
    </form>
  );
}
