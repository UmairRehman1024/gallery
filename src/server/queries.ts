import "server-only";
import { db } from "./db";
import { auth } from "@clerk/nextjs/server";
import { albums, images } from "./db/schema";
import { and, eq } from "drizzle-orm";
import { redirect } from "next/navigation";

import { UTApi } from "uploadthing/server";

export async function getMyImages() {
  const user = auth();

  if (!user.userId) throw new Error("Unauthorised");

  const images = await db.query.images.findMany({
    where: (model, { eq }) => eq(model.userId, user.userId),
    orderBy: (model, { desc }) => desc(model.id),
  });
  return images;
}

export async function getImage(id: number) {
  const user = auth();
  if (!user.userId) throw new Error("Unauthorised");

  const image = await db.query.images.findFirst({
    where: (model, { eq }) => eq(model.id, id),
  });

  if (!image) throw new Error("Image not found");

  if (image.userId !== user.userId) throw new Error("Unauthorised");

  return image;
}
export async function deleteImage(id: number) {
  const utapi = new UTApi();
  const user = auth();
  if (!user.userId) throw new Error("Unauthorised");

  const fileKey = await db
    .delete(images)
    .where(and(eq(images.id, id), eq(images.userId, user.userId)))
    .returning({ key: images.key });

  if (!fileKey[0]) throw new Error("Image not found");

  await utapi.deleteFiles(fileKey[0].key);

  redirect("/");
}

export async function addAlbum() {
  //take name of album

  const user = auth();
  if (!user.userId) throw new Error("Unauthorised");

  const album = await db
    .insert(albums)
    .values({
      name: "Winter",
      userId: user.userId,
    })
    .returning();

  return album;
}

export async function getMyAlbums() {
  const user = auth();

  if (!user.userId) throw new Error("Unauthorised");

  const albums = await db.query.albums.findMany({
    where: (model, { eq }) => eq(model.userId, user.userId),
    orderBy: (model, { desc }) => desc(model.id),
  });
  return albums;
}
