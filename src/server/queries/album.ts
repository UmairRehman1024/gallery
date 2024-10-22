import { auth } from "@clerk/nextjs/server";
import { db } from "../db";
import { notFound } from "next/navigation";

export async function CheckAlbumExists(id: number) {
  const album = await db.query.albums.findFirst({
    where: (model, { eq }) => eq(model.id, id),
  });

  if (album == undefined) {
    return false;
  } else {
    return true;
  }
}

export function CheckParams(params?: string[]) {
  const user = auth();
  if (!user.userId) return;

  let albumURL: number[] | undefined;
  if (params != undefined) {
    albumURL = [];
    params.forEach((param) => {
      const paramNumber = Number(param);

      if (isNaN(paramNumber)) {
        notFound();
      }

      if (!CheckAlbumExists(paramNumber)) {
        notFound();
      }

      albumURL?.push(paramNumber);
    });
  }
  return albumURL;
}
