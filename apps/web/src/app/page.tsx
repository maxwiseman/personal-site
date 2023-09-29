import { Lenis } from "../components/lenis";
import { ProjectCard } from "../components/project-card";
import client from "../lib/client";

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

export default async function Page(): Promise<JSX.Element> {
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion -- It seems that ESLint doesn't really understand this
  const projects = (await client.fetch(`*[_type == "project"]`)) as Project[];
  return (
    <>
      <Lenis />
      <div className="bg-[#33CCFC] w-1/6 h-4/6 absolute top-[50%] left-1/2 md:left-[75%] -translate-x-1/2 -translate-y-1/2 rounded-full -rotate-45" />
      <div className="bg-[#FE43EB] w-[10%] h-3/6 absolute top-[60%] left-1/2 md:left-[80%] -translate-x-1/2 -translate-y-1/2 rounded-full rotate-45" />
      <div
        className="w-screen min-h-screen backdrop-blur-[100px] z-30"
        style={{ backgroundImage: "url('/square.png')" }}
      >
        <div className="z-50 w-screen max-h-screen md:w-1/2 h-screen flex flex-col justify-center items-center px-10">
          <div>
            <h1 className="font-mono font-medium lg:text-8xl md:text-7xl text-6xl w-min max-w-full">
              Max Wiseman
            </h1>
            <address className="font-mono not-italic w-max text-3xl">
              Knoxville, TN
            </address>
          </div>
        </div>
        <div className="w-screen min-h-screen p-5 md:p-24 flex flex-col gap-16 justify-center items-center">
          <h2 className="font-mono text-5xl font-medium">Projects</h2>
          <div className="gap-5 grid grid-flow-row md:grid-cols-2 lg:grid-cols-3 h-max">
            {projects.map(project => {
              return (
                <ProjectCard
                  key={project.slug.current}
                  links={[
                    {
                      type: "github",
                      content: project.github,
                    },
                    { type: "link", content: project.link },
                  ]}
                  slug={project.slug.current}
                  technology={project}
                  title={project.name}
                >
                  {project.description}
                </ProjectCard>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
