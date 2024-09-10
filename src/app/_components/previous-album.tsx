"use client";
import { redirect, useRouter } from "next/navigation";
import Router from "next/router";
import { URL } from "url";
import { Button } from "~/components/ui/button";

export function PreviousAlbumButton(props: { albumURL: string[] }) {
  const router = useRouter();

  const handleOnClick = () => {
    // Remove top-level album (last element from the array)
    const pathArray = removeLastElement(props.albumURL);

    // Convert array back to a string path
    const path = pathArray.length === 0 ? "/" : `/${pathArray.join("/")}`;

    // Push the new path
    router.push(path);
  };

  return <Button onClick={handleOnClick}>Previous Album</Button>;
}

// get path
//

//get current album
//get parent album
//redirect to parent album

//use stack

// function removeLastElement(path: string| string[]): string | string[] {
//   // console.log(path);
//   // const segments = path.split("/");

//   // // Remove the last segment if it exists
//   // if (segments.length > 1) {
//   //   segments.pop();
//   // }

//   // // Join the remaining segments and ensure the result starts with a '/'
//   // const newPath = segments.join("/");
//   // return newPath ? (newPath.startsWith("/") ? newPath : "/" + newPath) : "/";

//     // Create a shallow copy of the array and remove the last element
//     const newPathArray = [...path];
//     newPathArray.pop();

//     return newPathArray.length > 0 ? newPathArray : ['/'];

// }

// function removeLastElement(path: string | string[]): string | string[] {
//   if (typeof path === "string") {
//     const segments = path.split("/");

//     if (segments.length > 1) {
//       segments.pop();
//     }

//     const newPath = segments.join("/");
//     return newPath ? (newPath.startsWith("/") ? newPath : "/" + newPath) : "/";
//   } else if (Array.isArray(path)) {
//     const newPathArray = [...path];
//     newPathArray.pop();

//     return newPathArray.length > 0 ? newPathArray : ["/"];
//   }

//   return "/";
// }

function removeLastElement(pathArray: string[]): string[] {
  const newPathArray = [...pathArray];

  if (newPathArray.length > 1) {
    newPathArray.pop();
  } else {
    // If there's only one element, return an empty array which represents root
    return [];
  }

  return newPathArray;
}
