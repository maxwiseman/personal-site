import type {
  PortableTextMarkComponentProps,
  PortableTextTypeComponentProps,
} from "@portabletext/react";
import { PortableText } from "@portabletext/react";
import Link from "next/link";
import { cn } from "ui/lib/utils";
import { CodeBlock } from "../../../components/code-block";
import { Lenis } from "../../../components/lenis";
import client from "../../../lib/client";
import styles from "./article.module.css";
// import type { BranchData, RepoData } from "./github-data";

interface Project {
  _createdAt: Date;
  _updatedAt: Date;
  _id: string;
  _rev: string;
  _type: "project";
  name: string;
  slug: { current: string; _type: "slug" };
  description: string;
  repo: string;
  branch: string;
  github: string;
  link: string;
  body: Block[];
  vercel: boolean;
  react: boolean;
  next: boolean;
  drizzle: boolean;
  planetscale: boolean;
  neon: boolean;
  cloudflare: boolean;
  ai: boolean;
  tailwind: boolean;
}

interface Block {
  _type: "block";
  children: {
    _type: string;
    marks?: [];
    text?: string;
    _key?: string;
    markDefs?: [];
  }[];
  markDefs: [];
  style: "normal";
}

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
        <div className="flex h-screen max-h-screen w-screen flex-col items-center justify-center px-10">
          <h1 className="w-full max-w-full text-center font-mono text-6xl font-medium md:text-7xl lg:text-8xl">
            {project.name}
          </h1>
          <h2 className="w-full max-w-full text-center font-mono text-3xl font-medium md:text-4xl lg:text-5xl">
            Projects
          </h2>
        </div>

        <div className="flex w-full justify-center">
          <article className={cn("w-full max-w-3xl", styles.article)}>
            <PortableText {...portableTextProps} />
          </article>
        </div>
      </div>
    </>
  );
}
