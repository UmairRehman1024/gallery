import { clerkClient } from "@clerk/nextjs/server";
import { getImage } from "~/server/queries";

export default async function FullPageImageView(props: { id: number }) {
  const image = await getImage(props.id);

  const uploaderInfo = await clerkClient().users.getUser(image.userId);
  return (
    <div className="flex h-full w-full min-w-0 gap-2">
      <div className="flex flex-shrink items-center justify-center">
        <img src={image.url} alt={image.name} className="object-contain" />
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
      </div>
    </div>
  );
}
