import Link from "next/link";
import Image from "next/image";

export async function GalleryImage({
  id,
  url,
  name,
}: {
  id: number;
  url: string;
  name: string;
}) {
  return (
    <div className="flex h-52 w-52 flex-col items-center justify-center">
      <Link href={`/img/${id}`} className="h-full w-full">
        <div className="relative h-5/6 w-full">
          <Image
            src={url}
            alt={name}
            fill
            className="h-full w-full object-contain"
            sizes="208px"
          />
        </div>
        <div className="h-8 overflow-hidden text-ellipsis text-nowrap pt-2 text-center">
          {name}
        </div>
      </Link>
    </div>
  );
}
