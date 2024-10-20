"use server";

import "server-only";
import { auth } from "@clerk/nextjs/server";

import { and, eq } from "drizzle-orm";
import { redirect } from "next/navigation";

import { UTApi } from "uploadthing/server";
import { getLastPathEntry } from "~/utils/getLastPathEntry";
import { db } from "../db";
import { images } from "../db/schema";

export async function getMyImages() {
  const user = auth();

  if (!user.userId) throw new Error("Unauthorised");

  const images = await db.query.images.findMany({
    where: (model, { eq }) => eq(model.userId, user.userId),
    orderBy: (model, { desc }) => desc(model.id),
  });
  return images;
}

export async function getMyAlbumImages(AlbumID: number | null) {
  const user = auth();

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
