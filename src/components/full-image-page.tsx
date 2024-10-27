import { clerkClient } from "@clerk/nextjs/server";
import {
  checkImageExists,
  deleteImage,
  getImage,
} from "~/server/actions/image";
import { Button } from "./ui/button";
import Image from "next/image";
import { notFound } from "next/navigation";

export default async function FullPageImageView(props: {
  id: number;
  children?: React.ReactNode;
}) {
  const image = await getImage(props.id);

  const imageExists = checkImageExists(props.id);

  if (!imageExists) {
    // Redirect or show a 404 if the image does not exist
    console.log("IMAGE NOT FOUND");
    return notFound();
  }

  const uploaderInfo = await (await clerkClient()).users.getUser(image.userId);
  return (
    <div className="flex h-full w-full min-w-0 gap-2">
      <div className="relative size-full">
        <Image
          src={image.url}
          fill
          priority
          className="object-contain"
          alt={image.name}
          sizes="calc(100vw - 249px)"
        />
        {props.children}
      </div>
      <div className="flex w-56 flex-shrink-0 flex-col gap-2 border-l">
        <div className="border-b p-2 text-center text-lg">{image.name}</div>

        <div className="flex flex-col px-2">
          <span>Uploaded By</span>
          <span>{uploaderInfo.fullName}</span>
        </div>
        <div className="flex flex-col px-2">
          <span>Created On</span>
          <span>{new Date(image.createdAt).toLocaleDateString()}</span>
        </div>

        <div className="p-2">
          <form
            action={async () => {
              "use server";

              await deleteImage(image.id);
            }}
          >
            <Button type="submit" variant="destructive">
              Delete
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
