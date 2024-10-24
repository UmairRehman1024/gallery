"use client";
import { useRouter } from "next/navigation";
import { Button } from "~/components/ui/button";
import { redirectToPreviousAlbumID } from "~/server/actions/album";

export function PreviousAlbumButton(props: { albumID: number }) {
  return (
    <form action={redirectToPreviousAlbumID}>
      <Button type="submit">Previous Album</Button>
      <input type="hidden" name="currentID" value={props.albumID} />
    </form>
  );
}
