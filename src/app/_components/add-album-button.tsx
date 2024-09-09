// "use client";

import { usePathname } from "next/navigation";
import { Button } from "~/components/ui/button";
import { addAlbum } from "~/server/queries";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import { DialogClose, DialogFooter } from "~/components/ui/dialog";
import { Copy } from "lucide-react";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";

export function AlbumButton() {
  return (
    // <form
    //   action={async () => {
    //     "use server";

    //     const name = "autumn";
    //     console.log(usePathname());

    //     const album = await addAlbum(name);
    //     console.log(album);
    //   }}
    // >
    //   <Button type="submit">Add Album</Button>

    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Add Album</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Add an album</DialogTitle>
        </DialogHeader>
        <div className="flex items-center">
          <div className="grid flex-1 gap-2">
            <Label htmlFor="name" className="sr-only">
              Name
            </Label>
            <Input id="name" placeholder="Enter the name of the album" />
          </div>
          <Button type="submit" size="sm" className="px-3">
            Submit
          </Button>
        </div>
      </DialogContent>
    </Dialog>

    // </form>
  );
}
