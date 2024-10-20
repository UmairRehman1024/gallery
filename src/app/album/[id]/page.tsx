export default async function AlbumPage({
  params,
}: {
  params: { album: string[] };
}) {
  return <div>hello {params.album}</div>;
}
