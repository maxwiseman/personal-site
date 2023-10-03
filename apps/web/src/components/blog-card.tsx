import imageUrlBuilder from "@sanity/image-url";
import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardTitle } from "ui/components/ui/card";
import { Separator } from "ui/components/ui/separator";
import client from "../lib/client";
import type { BlogPost } from "./blog";

export function BlogCard({ post }: { post: BlogPost }): JSX.Element {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call -- This is a sanity thing that for some reason doesn't seem to have types
  const builder = imageUrlBuilder(client);

  return (
    <Link href={`/blog/${post.slug.current}`}>
      <Card className="flex flex-row flex-nowrap w-full overflow-hidden">
        <Image
          alt=""
          className="h-72 w-96 object-cover"
          height={400}
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access -- This is a sanity thing that for some reason doesn't seem to have types
          src={builder.image(post.cover).url()}
          width={300}
        />
        <div className="p-6 w-full">
          <CardTitle className="p-0 pb-0 text-xl">{post.name}</CardTitle>
          <Separator className="my-3" />
          <CardContent className="p-0 text-muted-foreground w-max">
            {post.description}
          </CardContent>
        </div>
      </Card>
    </Link>
  );
}
