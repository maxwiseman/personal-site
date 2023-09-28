import { Card, CardContent, CardTitle } from "ui/components/ui/card";
import { Separator } from "ui/components/ui/separator";
import { Button } from "ui/components/ui/button";
import { GitHubLogoIcon, Link2Icon } from "@radix-ui/react-icons";
import Link from "next/link";

export function ProjectCard({
  title,
  links,
  children,
}: {
  title?: string;
  links?: {
    type: "github" | "link";
    content: string;
  }[];
  children?: React.ReactNode;
}): JSX.Element {
  return (
    <Card className="min-h-max w-full h-max p-6">
      {title ? (
        <>
          <CardTitle className="text-xl flex flex-row flex-wrap gap-2 justify-between items-center pb-1">
            <span className="w-max">{title}</span>
            <div className="w-max flex flex-row flex-nowrap gap-2">
              {links?.map(link => {
                return (
                  <Link href={link.content} key={link.type} target="blank">
                    <Button size="icon" variant="outline">
                      {link.type === "github" && (
                        <GitHubLogoIcon className="w-4 h-4" />
                      )}
                      {link.type === "link" && (
                        <Link2Icon className="w-4 h-4" />
                      )}
                    </Button>
                  </Link>
                );
              })}
            </div>
          </CardTitle>
          <Separator className="my-3" />
        </>
      ) : null}
      <CardContent className="p-0 pt-0">{children}</CardContent>
    </Card>
  );
}
