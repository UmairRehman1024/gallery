import { deleteImage } from "~/server/actions/delete-image";
import { Button } from "./ui/button";

export function DeleteButton({ imageID }: { imageID: number }) {
  return (
    <form action={deleteImage}>
      <Button type="submit" variant="destructive">
        Delete
      </Button>
      <input type="hidden" name="imageID" value={imageID} />
    </form>
  );
}
