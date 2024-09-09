import Link from "next/link";
import { Button } from "~/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center gap-2 pt-4 text-2xl">
      <h2>Not Found</h2>
      <p className="text-base">Could not find requested resource</p>

      <Button asChild className="w-32">
        <Link href="/">Return Home</Link>
      </Button>
    </div>
  );
}
