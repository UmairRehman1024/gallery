export function getLastPathEntry(path: string): string {
  // Split the path by "/"
  const segments = path.split("/");

  // Filter out any empty segments (to handle leading/trailing slashes)
  const filteredSegments = segments.filter((segment) => segment.length > 0);

  // Return the last entry, or an empty string if none exists
  return filteredSegments.length > 0
    ? (filteredSegments[filteredSegments.length - 1] as string)
    : "";
}
