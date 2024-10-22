"use server";
import "server-only";

import { db } from "../db";
import { auth } from "@clerk/nextjs/server";
import { albums } from "../db/schema";
import { notFound, redirect } from "next/navigation";

export async function addAlbum(name: string, path: string) {
  const user = auth();
  if (!user.userId) throw new Error("Unauthorised");

  const parentId = getLastNumber(path);

  const album = await db
    .insert(albums)
    .values({
      name,
      userId: user.userId,
      parentId,
    })
    .returning();

  //redirect to new album
  redirect(`/${path}/${album[0]?.id}`);
}

function getLastNumber(input: string): number {
  // Split the string by '/' and get the last element
  const elements = input.split("/");
  const lastElement = elements[elements.length - 1];

  // Convert the last element to a number and return it
  return Number(lastElement);
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

// export async function getPreviousAlbumID(currentID: number) {
//   const user = auth();
//   if (!user.userId) throw new Error("Unauthorised");

//   const parentId = (
//     await db.query.albums.findFirst({
//       where: (model, { eq }) => eq(model.id, currentID),
//     })
//   )?.parentId;

//   return parentId;
// }

// export async function getPreviousAlbumIDFromName(
//   currentName: string | undefined,
// ) {
//   const user = auth();
//   if (!user.userId) throw new Error("Unauthorised");

//   if (currentName == undefined) return null;
//   const parentId = (
//     await db.query.albums.findFirst({
//       where: (model, { eq }) => eq(model.name, currentName),
//     })
//   )?.parentId;

//   return parentId;
// }

// export async function redirectPreviousAlbum(currentName: string | undefined) {
//   const user = auth();
//   if (!user.userId) throw new Error("Unauthorised");

//   if (currentName == undefined) return null;
//   const parentId = (
//     await db.query.albums.findFirst({
//       where: (model, { eq }) => eq(model.name, currentName),
//     })
//   )?.parentId;

//   if (!parentId) redirect("/");

//   const parent = await db.query.albums.findFirst({
//     where: (model, { eq }) => eq(model.id, parentId),
//   });

//   redirect(`${parent?.id}`);
// }

// export async function getPreviousAlbumIDFrom(currentName: string | undefined) {
//   const user = auth();
//   if (!user.userId) throw new Error("Unauthorised");

//   if (currentName == undefined) return null;
//   const parent = await db.query.albums.findFirst({
//     where: (model, { eq }) => eq(model.name, currentName),
//   });
//   return parent?.id;
// }
