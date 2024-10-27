import "server-only";
import { auth } from "@clerk/nextjs/server";

import { and, eq } from "drizzle-orm";
import { redirect } from "next/navigation";

import { UTApi } from "uploadthing/server";
import { db } from "../db";
import { images } from "../db/schema";

// export async function getMyImages() {
//   const user = auth();

//   if (!user.userId) throw new Error("Unauthorised");

//   const images = await db.query.images.findMany({
//     where: (model, { eq }) => eq(model.userId, user.userId),
//     orderBy: (model, { desc }) => desc(model.id),
//   });
//   return images;
// }

export async function getMyAlbumImages(AlbumID: number | undefined) {
  const user = await auth();

  if (!user.userId) throw new Error("Unauthorised");

  if (!AlbumID) {
    //all albums on homepage
    const images = await db.query.images.findMany({
      where: (model, { and, eq, isNull }) =>
        and(eq(model.userId, user.userId), isNull(model.albumId)),
      orderBy: (model, { desc }) => desc(model.id),
    });
    return images;
  } else {
    // albums in another album
    const images = await db.query.images.findMany({
      where: (model, { and, eq }) =>
        and(eq(model.userId, user.userId), eq(model.albumId, AlbumID)),
      orderBy: (model, { desc }) => desc(model.id),
    });
    return images;
  }
}

export async function getImage(id: number) {
  const user = await auth();
  if (!user.userId) throw new Error("Unauthorised");

  const image = await db.query.images.findFirst({
    where: (model, { eq }) => eq(model.id, id),
  });

  if (!image) throw new Error("Image not found");

  if (image.userId !== user.userId) throw new Error("Unauthorised");

  return image;
}
export async function deleteImage(id: number) {
  console.log("deleting image - " + id);
  const utapi = new UTApi();
  const user = await auth();
  if (!user.userId) throw new Error("Unauthorised");

  const image = await db
    .delete(images)
    .where(and(eq(images.id, id), eq(images.userId, user.userId)))
    .returning({ key: images.key, albumID: images.albumId });

  if (!image[0]) throw new Error("Image not found");

  await utapi.deleteFiles(image[0].key);

  if (image[0].albumID == null) {
    console.log("rediecting to homepage");
    redirect("/");
  } else {
    console.log("rediecting to " + image[0].albumID);
    redirect(`/${image[0].albumID}`);
  }
}

export async function checkImageExists(id: number): Promise<Boolean> {
  const user = await auth();
  if (!user.userId) throw new Error("Unauthorised");

  const image = await db.query.images.findFirst({
    where: (model, { eq }) => eq(model.id, id),
  });

  if (!image) return false;

  if (image.userId !== user.userId) return false;

  return true;
}
