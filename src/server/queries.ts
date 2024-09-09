"use server";
import "server-only";

import { db } from "./db";
import { auth } from "@clerk/nextjs/server";
import { albums, images } from "./db/schema";
import { and, eq } from "drizzle-orm";
import { notFound, redirect } from "next/navigation";

import { UTApi } from "uploadthing/server";
import { z } from "zod";

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

function getLastPathEntry(path: string): string {
  // Split the path by "/"
  const segments = path.split("/");

  // Filter out any empty segments (to handle leading/trailing slashes)
  const filteredSegments = segments.filter((segment) => segment.length > 0);

  // Return the last entry, or an empty string if none exists
  return filteredSegments.length > 0
    ? (filteredSegments[filteredSegments.length - 1] as string)
    : "";
}

export async function addAlbum(name: string, path: string) {
  const user = auth();
  if (!user.userId) throw new Error("Unauthorised");

  //getParentId
  let parentId;
  if (path == "/") {
    parentId = null;
  } else {
    const parent = await db.query.albums.findFirst({
      where: (model, { eq }) => eq(model.name, getLastPathEntry(path)),
    });
    parentId = parent?.id;
  }

  const album = await db
    .insert(albums)
    .values({
      name,
      userId: user.userId,
      parentId,
    })
    .returning();

  //redirect to new album
  redirect(`/${name}`);
}

export async function getMyAlbums(parentId: number | null) {
  const user = auth();

  if (!user.userId) throw new Error("Unauthorised");

  if (!parentId) {
    //all albums on homepage
    const albums = await db.query.albums.findMany({
      where: (model, { and, eq, isNull }) =>
        and(eq(model.userId, user.userId), isNull(model.parentId)),
      orderBy: (model, { desc }) => desc(model.id),
    });
    return albums;
  } else {
    // albums in another album
    const albums = await db.query.albums.findMany({
      where: (model, { and, eq }) =>
        and(eq(model.userId, user.userId), eq(model.parentId, parentId)),
      orderBy: (model, { desc }) => desc(model.id),
    });
    return albums;
  }
}

export async function getAlbumID(albumName: string | undefined) {
  const user = auth();

  if (!user.userId) throw new Error("Unauthorised");

  if (albumName == undefined) return null;

  const album = await db.query.albums.findFirst({
    where: (model, { eq }) => eq(model.name, albumName),
  });

  if (album === undefined) notFound();

  return album.id;
}
