import { auth } from "@clerk/nextjs/server";
import { db } from "../db";

export async function GetInitialAlbums() {
  //assumes on homepage
  //returns the albums on homepage
  const user = auth();

  if (!user.userId) throw new Error("Unauthorised");

  const albums = await db.query.albums.findMany({
    where: (model, { and, eq, isNull }) =>
      and(eq(model.userId, user.userId), isNull(model.parentId)),
    orderBy: (model, { desc }) => desc(model.id),
  });
  return albums;
}
