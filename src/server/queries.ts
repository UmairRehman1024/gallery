"use server";
import "server-only";

import { db } from "./db";
import { auth } from "@clerk/nextjs/server";
import { albums, images } from "./db/schema";
import { and, eq } from "drizzle-orm";
import { notFound, redirect } from "next/navigation";

import { UTApi } from "uploadthing/server";
import { getLastPathEntry } from "~/lib/getLastPathEntry";

export async function getMyImages() {
  const user = auth();

  if (!user.userId) throw new Error("Unauthorised");

  const images = await db.query.images.findMany({
    where: (model, { eq }) => eq(model.userId, user.userId),
    orderBy: (model, { desc }) => desc(model.id),
  });
  return images;
}

export async function getMyImagesParent(AlbumID: number | null) {
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

export async function getPreviousAlbumID(currentID: number) {
  const user = auth();
  if (!user.userId) throw new Error("Unauthorised");

  const parentId = (
    await db.query.albums.findFirst({
      where: (model, { eq }) => eq(model.id, currentID),
    })
  )?.parentId;

  return parentId;
}

export async function getPreviousAlbumIDFromName(
  currentName: string | undefined,
) {
  const user = auth();
  if (!user.userId) throw new Error("Unauthorised");

  if (currentName == undefined) return null;
  const parentId = (
    await db.query.albums.findFirst({
      where: (model, { eq }) => eq(model.name, currentName),
    })
  )?.parentId;

  return parentId;
}

export async function redirectPreviousAlbum(currentName: string | undefined) {
  const user = auth();
  if (!user.userId) throw new Error("Unauthorised");

  if (currentName == undefined) return null;
  const parentId = (
    await db.query.albums.findFirst({
      where: (model, { eq }) => eq(model.name, currentName),
    })
  )?.parentId;

  if (!parentId) redirect("/");

  const parent = await db.query.albums.findFirst({
    where: (model, { eq }) => eq(model.id, parentId),
  });

  redirect(`${parent?.name}`);
}

export async function getPreviousAlbumIDFrom(currentName: string | undefined) {
  const user = auth();
  if (!user.userId) throw new Error("Unauthorised");

  if (currentName == undefined) return null;
  const parent = await db.query.albums.findFirst({
    where: (model, { eq }) => eq(model.name, currentName),
  });
  return parent?.id;
}
