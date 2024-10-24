"use server";
import "server-only";

import { db } from "../db";
import { auth } from "@clerk/nextjs/server";
import { albums } from "../db/schema";
import { notFound, redirect } from "next/navigation";
import { getAlbumIDFromPath } from "~/utils/get-last-number";

export async function addAlbum(name: string, path: string) {
  const user = auth();
  if (!user.userId) throw new Error("Unauthorised");

  const parentId = getAlbumIDFromPath(path);
  console.log(path);

  const album = await db
    .insert(albums)
    .values({
      name,
      userId: user.userId,
      parentId,
    })
    .returning();

  const redirectPath = `${album[0]?.id}`;

  console.log(redirectPath);

  //redirect to new album
  redirect(redirectPath);
}

export async function getMyAlbums(parentId: number | undefined) {
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

export async function redirectToPreviousAlbumID(formData: FormData) {
  const currentID = formData.get("currentID");
  if (!currentID) throw new Error("CurrentID is null");

  console.log(currentID);

  const currentIDNumber = Number(currentID);

  console.log(currentIDNumber);

  if (isNaN(currentIDNumber))
    throw new Error("CurrentID is not a valid number");

  const user = auth();
  if (!user.userId) throw new Error("Unauthorised");

  const parentId = (
    await db.query.albums.findFirst({
      where: (model, { eq }) => eq(model.id, currentIDNumber),
    })
  )?.parentId;

  if (parentId == null) redirect("/");

  redirect(`/${parentId}`);
}
