import { clerkClient } from "@clerk/nextjs/server";
import { deleteImage, getImage } from "~/server/queries/image";
import { Button } from "./ui/button";
import { redirect } from "next/navigation";
import Image from "next/image";
import { revalidatePath } from "next/cache";

export default async function FullPageImageView(props: { id: number }) {
  const image = await getImage(props.id);

  const uploaderInfo = await clerkClient().users.getUser(image.userId);
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
