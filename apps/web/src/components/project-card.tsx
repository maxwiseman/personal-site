import { GitHubLogoIcon, Link2Icon } from "@radix-ui/react-icons";
import {
  IconArrowRight,
  IconBrandCloudflare,
  IconBrandNextjs,
  IconBrandOpenai,
  IconBrandPlanetscale,
  IconBrandReact,
  IconBrandTailwind,
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
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "ui/components/ui/tooltip";
// import type { BranchData, RepoData } from "../app/projects/[slug]/github-data";
import type { RepoData } from "../app/projects/[slug]/github-data";
import type { Project } from "./project";

export async function ProjectCard({
  project,
}: {
  project: Project;
  children?: React.ReactNode;
}): Promise<JSX.Element> {
  // const branchData = await fetch(
  //   `https://api.github.com/repos/${project.repo}/commits/${project.branch}`,
  // ).then((response: Response): Promise<BranchData> => response.json());
  const repoData = await fetch(
    `https://api.github.com/repos/${project.repo}`,
  ).then((response: Response): Promise<RepoData> => response.json());

  const links = [
    {
      type: "github",
      content: `https://github.com/${project.repo}`,
      icon: <GitHubLogoIcon className="h-4 w-4" />,
    },
    {
      type: "link",
      content: repoData.homepage,
      icon: <Link2Icon className="h-4 w-4" />,
    },
  ];

  return (
    <Card className="relative h-max min-h-max w-full min-w-[250px] p-6">
      <CardContent className="p-0 pt-0">
        {project.name ? (
          <>
            <CardTitle className="flex flex-row flex-wrap items-center justify-between gap-2 pb-1 text-xl">
              <span className="w-max">{project.name}</span>
              <div className="flex w-max flex-row flex-nowrap gap-2">
                {links.map((link) => {
                  if (link.content === undefined) return null;
                  return (
                    <Tooltip key={link.type}>
                      <Link href={link.content} tabIndex={-1} target="blank">
                        <TooltipTrigger asChild>
                          <Button size="icon" variant="outline">
                            {link.icon}
                          </Button>
                        </TooltipTrigger>
                      </Link>
                      <TooltipContent>
                        {link.type === "github" && "View on GitHub"}
                        {link.type === "link" && "View deployment"}
                      </TooltipContent>
                    </Tooltip>
                  );
                })}
              </div>
            </CardTitle>
            <Separator className="my-3" />
          </>
        ) : null}
        {/* {children} */}
        {project.description}
        {project.stack ? (
          <CardFooter className="relative bottom-0 mt-6 min-h-max flex-col items-start justify-normal p-0 font-medium">
            Tech Stack:
            <div className="mt-2 flex w-full flex-col flex-wrap gap-1">
              {Object.keys(project.stack)
                .sort()
                .map(
                  (
                    item:
                      | "vercel"
                      | "react"
                      | "next"
                      | "drizzle"
                      | "planetscale"
                      | "neon"
                      | "cloudflare"
                      | "ai"
                      | "tailwind",
                  ) => {
                    if (project.stack && project.stack[item]) {
                      return (
                        <Technology
                          icon={dict[item].icon}
                          key={dict[item].name}
                        >
                          {dict[item].name}
                        </Technology>
                      );
                    }
                    return null;
                  },
                )}
            </div>
            <Link
              className="mt-6 flex flex-row flex-nowrap items-center gap-1 transition-[gap] ease-in-out  hover:gap-2"
              href={`/projects/${project.slug.current}`}
            >
              Learn More <IconArrowRight className="h-4 w-4" />
            </Link>
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
    <div className="flex w-max flex-row flex-nowrap items-center gap-2 font-normal">
      {newIcon}
      {children}
    </div>
  );
}

const dict: {
  vercel: Technology;
  react: Technology;
  next: Technology;
  drizzle: Technology;
  planetscale: Technology;
  neon: Technology;
  cloudflare: Technology;
  ai: Technology;
  tailwind: Technology;
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
  tailwind: {
    icon: <IconBrandTailwind />,
    name: "Tailwind CSS",
  },
};
