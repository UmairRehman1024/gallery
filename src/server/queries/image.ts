import { auth } from "@clerk/nextjs/server";
import { db } from "../db";

export async function GetInitialImages() {
  //assumes on homepage
  //returns images on homepage

  const user = auth();

  if (!user.userId) throw new Error("Unauthorised");

  const images = await db.query.images.findMany({
    where: (model, { and, eq, isNull }) =>
      and(eq(model.userId, user.userId), isNull(model.albumId)),
    orderBy: (model, { desc }) => desc(model.id),
  });
  return images;
}
