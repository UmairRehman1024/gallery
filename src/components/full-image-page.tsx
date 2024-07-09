import { getImage } from "~/server/queries";

export default async function FullPageImageView(props: { id: number }) {
  const image = await getImage(props.id);
  return (
    <div className="flex h-full w-full min-w-0 gap-2">
      <div className="flex flex-shrink items-center justify-center">
        <img src={image.url} alt={image.name} className="object-contain" />
      </div>
      <div className="flex w-48 flex-shrink-0 flex-col items-center border-l">
        <div className="text-xl font-bold">{image.name}</div>
      </div>
    </div>
  );
}
