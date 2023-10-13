import type { BlogPost } from "../components/blog";
import { BlogCard } from "../components/blog-card";
import { Lenis } from "../components/lenis";
import type { Project } from "../components/project";
import { ProjectCard } from "../components/project-card";
import client from "../lib/client";

export function generateStaticParams(): [] {
  return [];
}
export const revalidate = 14400;

export default async function Page(): Promise<JSX.Element> {
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion -- It seems that ESLint doesn't really understand this
  const projects = (await client.fetch(
    `*[_type == "project"]`,
    {},
    { next: { revalidate: 14400 } },
  )) as Project[];
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion -- It seems that ESLint doesn't really understand this
  const blogPosts = (await client.fetch(
    `*[_type == "blog-post"]`,
    {},
    { next: { revalidate: 14400 } },
  )) as BlogPost[];
  return (
    <>
      <Lenis />
      <div className="absolute -z-10 h-screen w-screen blur-[100px]">
        <div className="max-w-screen absolute left-1/2 top-[50%] h-4/6 w-1/6 -translate-x-1/2 -translate-y-1/2 -rotate-45 rounded-full bg-[#33CCFC] md:left-[75%]" />
        <div className="max-w-screen absolute left-1/2 top-[60%] h-3/6 w-[10%] -translate-x-1/2 -translate-y-1/2 rotate-45 rounded-full bg-[#FE43EB] md:left-[80%]" />
      </div>
      <div
        className="max-w-screen z-30 min-h-screen w-screen bg-[url('/square.svg')] bg-center dark:bg-[url('/square_dark.svg')]"
        style={{
          backgroundSize: "33px",
        }}
      >
        {/* <div className="z-50 flex h-screen max-h-screen w-screen flex-col items-center justify-center px-10 md:w-1/2">
          <div>
            <h1 className="w-min max-w-full font-mono text-6xl font-medium md:text-7xl lg:text-8xl">
              Max Wiseman
            </h1>
            <address className="w-max font-mono text-3xl not-italic">
              Knoxville, TN
            </address>
          </div>
        </div> */}
        <div className="flex h-screen w-full items-center justify-center">
          <div className="mx-24 max-w-[50vw] md:w-full md:max-w-7xl">
            <div>
              <h1 className="w-min max-w-full font-mono text-6xl font-medium md:text-7xl lg:text-8xl">
                Max Wiseman
              </h1>
              <address className="w-max font-mono text-3xl not-italic">
                Knoxville, TN
              </address>
            </div>
          </div>
        </div>
        <div className="flex min-h-screen w-screen flex-col items-center justify-center gap-16 p-5 md:p-24">
          <h2 className="font-mono text-5xl font-medium">Projects</h2>
          <div className="grid h-max max-w-7xl grid-flow-row gap-5 md:grid-cols-2 lg:grid-cols-3">
            {projects.map((project) => {
              return (
                // @ts-expect-error Server Component
                <ProjectCard key={project._id} project={project}>
                  {project.description}
                </ProjectCard>
              );
            })}
          </div>
        </div>
        <div className="flex min-h-screen w-screen flex-col items-center justify-center gap-16 p-5 md:p-24">
          <h2 className="font-mono text-5xl font-medium">Blog</h2>
          <div className="h-max w-full max-w-7xl gap-5">
            {blogPosts.map((post) => {
              return <BlogCard key={post._id} post={post} />;
            })}
          </div>
        </div>
      </div>
    </>
  );
}
