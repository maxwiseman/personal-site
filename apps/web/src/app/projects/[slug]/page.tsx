import type {
  PortableTextMarkComponentProps,
  PortableTextTypeComponentProps,
} from "@portabletext/react";
import { PortableText } from "@portabletext/react";
import imageUrlBuilder from "@sanity/image-url";
import Link from "next/link";
import { cn } from "ui/lib/utils";
import { CodeBlock } from "../../../components/code-block";
import { HeroImage } from "../../../components/hero-image";
import { Lenis } from "../../../components/lenis";
import { dict, type Project } from "../../../components/project";
import client from "../../../lib/client";
import styles from "./article.module.css";
import { ProjectBadge } from "./project-badge";
// import type { BranchData, RepoData } from "./github-data";

export const revalidate = 14400;

export async function generateStaticParams(): Promise<{ slug: string }[]> {
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion -- It seems that ESLint doesn't really understand this
  const projects = (await client.fetch(
    `*[_type == "project"]`,
    {},
    { next: { revalidate: 14400 } },
  )) as Project[];
  const projectSlugs = projects.map((project) => {
    return { slug: project.slug.current };
  });

  return projectSlugs;
}

export default async function Page({
  params,
}: {
  params: { slug: string };
}): Promise<JSX.Element> {
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion -- It seems that ESLint doesn't really understand this
  const projects = (await client.fetch(
    `*[_type == "project" && slug.current == "${params.slug}"]`,
  )) as Project[];
  const project = projects[0];

  // const branchData = await fetch(
  //   `https://api.github.com/repos/${project.repo}/commits/${project.branch}`,
  // ).then((response: Response): Promise<BranchData> => response.json());
  // const repoData = await fetch(
  //   `https://api.github.com/repos/${project.repo}`,
  // ).then((response: Response): Promise<RepoData> => response.json());

  const portableTextProps = {
    components: {
      marks: {
        link: (
          props: PortableTextMarkComponentProps<{
            _type: "link";
            href: URL;
          }>,
        ): JSX.Element => {
          return <Link href={props.value?.href || ""}>{props.text}</Link>;
        },
      },
      types: {
        code: (
          props: PortableTextTypeComponentProps<{
            code: string;
            language: string;
            filename: string;
          }>,
        ): JSX.Element => {
          return (
            <CodeBlock
              content={props.value.code}
              fileName={props.value.filename}
              language={props.value.language}
            >
              {props.value.code}
            </CodeBlock>
          );
        },
      },
    },
    value: project.body,
  };

  const builder = imageUrlBuilder(client);

  return (
    <>
      <Lenis />
      <div className="absolute -z-10 h-screen w-screen blur-[100px]">
        <div className="absolute left-1/2 top-[50%] h-4/6 w-1/6 -translate-x-1/2 -translate-y-1/2 -rotate-45 rounded-full bg-[#33CCFC]" />
        <div className="absolute left-1/2 top-[60%] h-3/6 w-[10%] -translate-x-1/2 -translate-y-1/2 rotate-45 rounded-full bg-[#FE43EB]" />
      </div>
      <div
        className="min-h-screen w-screen bg-[url('/square.svg')] bg-center dark:bg-[url('/square_dark.svg')]"
        style={{
          backgroundSize: "33px",
        }}
      >
        <div className="flex h-[75vh] max-h-[32rem] w-screen flex-col items-center justify-center px-10">
          <div className="max-w-min overflow-scroll">
            <h1 className="min-w-max max-w-full text-center font-mono text-6xl font-medium md:text-7xl lg:text-8xl">
              {project.name}
            </h1>
            <div className="mt-5 flex max-w-full flex-row flex-wrap justify-center gap-2">
              {Object.keys(project.stack || {})
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
                        <ProjectBadge icon={dict[item].icon} key={project._id}>
                          {dict[item].name}
                        </ProjectBadge>
                      );
                    }
                    return null;
                  },
                )}
            </div>
          </div>
        </div>

        {project.image ? (
          <HeroImage
            dark={builder.image(project.image.dark).auto("format").url()}
            light={builder.image(project.image.light).auto("format").url()}
          />
        ) : null}

        {/* <div className="w-full flex justify-center items-center">
          <Card className="mt-12 w-full max-w-6xl mx-6 sm:mx-8 md:mx-12 lg:mx-24">
            <CardContent className="p-6">
              <div className="relative bottom-0 min-h-max flex-col items-start justify-normal p-0 font-medium">
                Tech Stack:
                <div className="mt-2 flex w-full flex-col flex-wrap gap-1">
                  {Object.keys(project.stack || {})
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
              </div>
            </CardContent>
          </Card>
        </div> */}

        <div className="mt-16 flex w-full justify-center px-6 sm:px-8 md:px-12 lg:px-24">
          <article className={cn("w-full max-w-3xl", styles.article)}>
            <PortableText {...portableTextProps} />
          </article>
        </div>
      </div>
    </>
  );
}
