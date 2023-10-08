import imageUrlBuilder from "@sanity/image-url";
import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardTitle } from "ui/components/ui/card";
import { Separator } from "ui/components/ui/separator";
import client from "../lib/client";
import type { BlogPost } from "./blog";

export function BlogCard({ post }: { post: BlogPost }): JSX.Element {
  const builder = imageUrlBuilder(client);

  return (
    <Link href={`/blog/${post.slug.current}`}>
      <Card className="flex h-72 w-full flex-row flex-nowrap overflow-hidden">
        <Image
          alt=""
          className="h-full w-1/4 object-cover"
          height={400}
          src={builder.image(post.cover).url()}
          width={300}
        />
        <div className="w-full p-6">
          <CardTitle className="p-0 pb-0 text-xl">{post.name}</CardTitle>
          <Separator className="my-3" />
          <CardContent className="text-muted-foreground w-max p-0">
            {post.description}
          </CardContent>
        </div>
      </Card>
    </Link>
  );
}
