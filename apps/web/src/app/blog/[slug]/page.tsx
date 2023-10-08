import type {
  PortableTextMarkComponentProps,
  PortableTextTypeComponentProps,
} from "@portabletext/react";
import { PortableText } from "@portabletext/react";
import Link from "next/link";
import { cn } from "ui/lib/utils";
import type { BlogPost } from "../../../components/blog";
import { CodeBlock } from "../../../components/code-block";
import { Lenis } from "../../../components/lenis";
import client from "../../../lib/client";
import styles from "../../../components/article.module.css";

export const revalidate = 14400;

export async function generateStaticParams(): Promise<{ slug: string }[]> {
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion -- It seems that ESLint doesn't really understand this
  const posts = (await client.fetch(
    `*[_type == "blog-post"]`,
    {},
    { next: { revalidate: 14400 } },
  )) as BlogPost[];
  const postSlugs = posts.map((project) => {
    return { slug: project.slug.current };
  });

  return postSlugs;
}

export default async function Page({
  params,
}: {
  params: { slug: string };
}): Promise<JSX.Element> {
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion -- It seems that ESLint doesn't really understand this
  const posts = (await client.fetch(
    `*[_type == "blog-post" && slug.current == "${params.slug}"]`,
  )) as BlogPost[];
  const post = posts[0];

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
    value: post.body,
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
            {post.name}
          </h1>
          <h2 className="w-full max-w-full text-center font-mono text-3xl font-medium md:text-4xl lg:text-5xl">
            Blog
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
