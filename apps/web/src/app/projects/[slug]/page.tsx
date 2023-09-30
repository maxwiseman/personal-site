import type {
  PortableTextMarkComponentProps,
  PortableTextTypeComponentProps,
} from "@portabletext/react";
import { PortableText } from "@portabletext/react";
import Link from "next/link";
import { cn } from "ui/lib/utils";
import { Lenis } from "../../../components/lenis";
import client from "../../../lib/client";
import styles from "./article.module.css";
import { CodeBlock } from "./code-block";

interface Project {
  _createdAt: Date;
  _updatedAt: Date;
  _id: string;
  _rev: string;
  _type: "project";
  name: string;
  slug: { current: string; _type: "slug" };
  description: string;
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

export const revalidate = 43200;

export async function generateStaticParams(): Promise<string[]> {
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion -- It seems that ESLint doesn't really understand this
  const projects = (await client.fetch(`*[_type == "project"]`)) as Project[];
  const projectSlugs = projects.map(project => {
    return project.slug.current;
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
    `*[_type == "project" && slug.current == "${params.slug}"]`
  )) as Project[];
  const project = projects[0];
  return (
    <>
      <Lenis />
      <div className="bg-[#33CCFC] w-1/6 h-4/6 absolute top-[50%] left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full -rotate-45" />
      <div className="bg-[#FE43EB] w-[10%] h-3/6 absolute top-[60%] left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full rotate-45" />
      <div
        className="w-screen min-h-screen backdrop-blur-[100px] bg-[url('/square.svg')] dark:bg-[url('/square_dark.svg')] bg-center"
        style={{
          backgroundSize: "33px",
        }}
      >
        <div className="w-screen max-h-screen h-screen flex flex-col justify-center items-center px-10">
          <h1 className="font-mono font-medium lg:text-8xl md:text-7xl text-6xl w-full max-w-full text-center">
            {project.name}
          </h1>
          <h2 className="font-mono font-medium lg:text-5xl md:text-4xl text-3xl w-full max-w-full text-center">
            Projects
          </h2>
        </div>

        <div className="w-full flex justify-center">
          <article className={cn("max-w-3xl w-full", styles.article)}>
            <PortableText
              components={{
                marks: {
                  link: (
                    props: PortableTextMarkComponentProps<{
                      _type: "link";
                      href: URL;
                    }>
                  ): JSX.Element => {
                    return (
                      <Link href={props.value?.href || ""}>{props.text}</Link>
                    );
                  },
                },
                types: {
                  code: (
                    props: PortableTextTypeComponentProps<{
                      code: string;
                      language: string;
                      filename: string;
                    }>
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
              }}
              value={project.body}
            />
          </article>
        </div>
      </div>
    </>
  );
}
