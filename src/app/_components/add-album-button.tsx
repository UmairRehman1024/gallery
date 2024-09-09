"use client";

import { usePathname, useRouter } from "next/navigation";
import { Button } from "~/components/ui/button";
import { addAlbum } from "~/server/queries";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import { DialogClose, DialogFooter } from "~/components/ui/dialog";
import { Copy } from "lucide-react";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

const formSchema = z.object({
  albumName: z
    .string()
    .trim()
    .min(1, "Album name is required")
    .refine((s) => !s.includes(" "), "No Spaces!"),
});

export function AlbumButton() {
  const path = usePathname();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      albumName: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    addAlbum(values.albumName, path);
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Add Album</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Add an album</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="albumName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Album Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your album name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Submit</Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

// <form
//   action={async () => {
//     "use server";

//     const name = "autumn";
//     console.log(usePathname());

//     const album = await addAlbum(name);
//     console.log(album);
//   }}
// >
//   <Button type="submit">Add Album</Button>
