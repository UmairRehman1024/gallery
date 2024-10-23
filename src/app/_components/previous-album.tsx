"use client";
import { useRouter } from "next/navigation";
import { Button } from "~/components/ui/button";
import { redirectToPreviousAlbumID } from "~/server/actions/album";

export function PreviousAlbumButton(props: { albumURL: number[] }) {
  const currentID = props.albumURL[props.albumURL.length - 1];
  if (!currentID) throw new Error("Current ID is undefined");

  // const handleOnClick = async () => {

  //   console.log(currentID);

  //   const previousID = await getPreviousAlbumID(currentID);
  //   router.push(`${previousID}`);
  // };

  return (
    <form action={redirectToPreviousAlbumID}>
      <Button type="submit">Previous Album</Button>
      <input type="hidden" name="currentID" value={currentID} />
    </form>
  );
}
