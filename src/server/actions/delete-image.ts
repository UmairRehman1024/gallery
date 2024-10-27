"use server";
import "server-only";
import { auth } from "@clerk/nextjs/server";

import { and, eq } from "drizzle-orm";
import { redirect } from "next/navigation";

import { UTApi } from "uploadthing/server";
import { db } from "../db";
import { images } from "../db/schema";

export async function deleteImage(formdata: FormData) {
  const utapi = new UTApi();
  const user = await auth();
  if (!user.userId) throw new Error("Unauthorised");

  const imageID = formdata.get("imageID");
  if (!imageID) throw new Error("Image ID is null");

  const imageIDNumber = Number(imageID);
  if (isNaN(imageIDNumber)) throw new Error("Image ID is not a number");

  const image = await db
    .delete(images)
    .where(and(eq(images.id, imageIDNumber), eq(images.userId, user.userId)))
    .returning({ key: images.key, albumID: images.albumId });

  if (!image[0]) throw new Error("Image not found");

  await utapi.deleteFiles(image[0].key);

  if (image[0].albumID == null) {
    redirect("/");
  } else {
    redirect(`/${image[0].albumID}`);
  }
}
