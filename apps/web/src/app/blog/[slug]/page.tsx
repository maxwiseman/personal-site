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
    { next: { revalidate: 14400 } }
  )) as BlogPost[];
  const postSlugs = posts.map(project => {
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
    `*[_type == "blog-post" && slug.current == "${params.slug}"]`
  )) as BlogPost[];
  const post = posts[0];
  return (
    <>
      <Lenis />
      <div className="blur-[100px] absolute w-screen h-screen -z-10">
        <div className="bg-[#33CCFC] w-1/6 h-4/6 absolute top-[50%] left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full -rotate-45" />
        <div className="bg-[#FE43EB] w-[10%] h-3/6 absolute top-[60%] left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full rotate-45" />
      </div>
      <div
        className="w-screen min-h-screen bg-[url('/square.svg')] dark:bg-[url('/square_dark.svg')] bg-center"
        style={{
          backgroundSize: "33px",
        }}
      >
        <div className="w-screen max-h-screen h-screen flex flex-col justify-center items-center px-10">
          <h1 className="font-mono font-medium lg:text-8xl md:text-7xl text-6xl w-full max-w-full text-center">
            {post.name}
          </h1>
          <h2 className="font-mono font-medium lg:text-5xl md:text-4xl text-3xl w-full max-w-full text-center">
            Blog
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
              value={post.body}
            />
          </article>
        </div>
      </div>
    </>
  );
}
