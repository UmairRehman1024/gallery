function getLastNumber(input: string): number {
  // Split the string by '/' and get the last element
  const elements = input.split("/");
  const lastElement = elements[elements.length - 1];

  // Convert the last element to a number and return it
  return Number(lastElement);
}

export function getAlbumIDFromPath(path: string): number | null {
  let parentId;

  if (path == "/") {
    parentId = null;
  } else {
    parentId = getLastNumber(path);
  }
  return parentId;
}
