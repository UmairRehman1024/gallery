import { db } from "../db";

export async function CheckAlbumExists(id: number) {
  const album = await db.query.albums.findFirst({
    where: (model, { eq }) => eq(model.id, id),
  });

  if (album == undefined) {
    return false;
  } else {
    return true;
  }
}
