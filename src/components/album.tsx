import Link from "next/link";

export function Album(props: { name: string; currentAlbumURL: string[] }) {
  let path;
  if (props.currentAlbumURL == undefined) {
    path = props.name;
  } else {
    path = `/${props.currentAlbumURL.join("/")}/${props.name}`;
  }
  return (
    <div className="flex h-52 w-52 items-center justify-center">
      <Link
        className="flex h-1/3 w-3/4 items-center justify-center rounded border-4 border-slate-300 shadow"
        href={path}
      >
        <p>{props.name}</p>
      </Link>
    </div>
  );
}
