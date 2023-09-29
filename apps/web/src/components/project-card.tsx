import { GitHubLogoIcon, Link2Icon } from "@radix-ui/react-icons";
import {
  IconBrandCloudflare,
  IconBrandNextjs,
  IconBrandOpenai,
  IconBrandPlanetscale,
  IconBrandReact,
  IconBrandVercel,
  IconCloudRain,
  IconLetterN,
} from "@tabler/icons-react";
import Link from "next/link";
import { cloneElement } from "react";
import { Button } from "ui/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardTitle,
} from "ui/components/ui/card";
import { Separator } from "ui/components/ui/separator";

export function ProjectCard({
  title,
  links,
  technology,
  children,
}: {
  title?: string;
  technology?: (
    | "vercel"
    | "react"
    | "next"
    | "drizzle"
    | "planetscale"
    | "neon"
    | "cloudflare"
    | "ai"
  )[];
  links?: {
    type: "github" | "link";
    content: string;
  }[];
  children?: React.ReactNode;
}): JSX.Element {
  const dict: {
    vercel: Technology;
    react: Technology;
    next: Technology;
    drizzle: Technology;
    planetscale: Technology;
    neon: Technology;
    cloudflare: Technology;
    ai: Technology;
  } = {
    vercel: {
      icon: <IconBrandVercel />,
      name: "Vercel",
    },
    react: {
      icon: <IconBrandReact />,
      name: "React",
    },
    next: {
      icon: <IconBrandNextjs />,
      name: "Next.JS",
    },
    drizzle: {
      icon: <IconCloudRain />,
      name: "Drizzle ORM",
    },
    planetscale: {
      icon: <IconBrandPlanetscale />,
      name: "Planetscale",
    },
    neon: {
      icon: <IconLetterN />,
      name: "Neon",
    },
    cloudflare: {
      icon: <IconBrandCloudflare />,
      name: "Cloudflare",
    },
    ai: {
      icon: <IconBrandOpenai />,
      name: "AI",
    },
  };
  technology?.sort();

  return (
    <Card className="min-h-max w-full min-w-[250px] p-6 relative h-max">
      <CardContent className="p-0 pt-0">
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
        {children}
        {technology ? (
          <CardFooter className="relative bottom-0 p-0 mt-6 font-medium min-h-max flex-col justify-normal items-start">
            Tech Stack:
            {/* <Separator className="my-3" /> */}
            <div className="mt-3 gap-1 flex flex-col flex-wrap w-full">
              {technology.map(item => {
                return (
                  <Technology icon={dict[item].icon} key={dict[item].name}>
                    {dict[item].name}
                  </Technology>
                );
              })}
            </div>
          </CardFooter>
        ) : null}
      </CardContent>
    </Card>
  );
}

interface Technology {
  icon: React.ReactElement;
  name: string;
}

function Technology({
  icon,
  children,
}: {
  icon: React.ReactElement;
  children: React.ReactNode;
}): JSX.Element {
  const newIcon = cloneElement(icon, { className: "w-4 h-4" });

  return (
    <div className="flex flex-row flex-nowrap gap-2 items-center w-max font-normal">
      {newIcon}
      {children}
    </div>
  );
}
