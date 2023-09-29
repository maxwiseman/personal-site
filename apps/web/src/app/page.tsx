import { Lenis } from "../components/lenis";
import { ProjectCard } from "../components/project-card";

export default function Page(): JSX.Element {
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
          <div
            // className="gap-5 flex flex-row flex-wrap justify-center"
            className="gap-5 grid grid-flow-row md:grid-cols-2 lg:grid-cols-3 h-max"
          >
            <ProjectCard
              links={[
                {
                  type: "github",
                  content: "https://github.com/maxwiseman/Scholarly",
                },
              ]}
              technology={[
                "vercel",
                "next",
                "react",
                "drizzle",
                "neon",
                "cloudflare",
              ]}
              title="Schoarly"
            >
              Labore eiusmod culpa fugiat non est ex culpa laborum laboris
              cupidatat ad veniam. Irure nisi in quis anim deserunt fugiat ad
              aliquip ipsum. Reprehenderit et ullamco duis minim cupidatat magna
              occaecat id irure enim ad.
            </ProjectCard>
            <ProjectCard
              links={[
                {
                  type: "github",
                  content: "https://github.com/maxwiseman/personal-site",
                },
              ]}
              technology={["vercel", "next", "react", "cloudflare"]}
              title="Personal Site"
            >
              Commodo sit in quis eu mollit dolor. Excepteur ea reprehenderit
              incididunt consequat nostrud. Magna occaecat anim duis do sit
              consectetur aliqua. Est est id Lorem veniam consectetur culpa
              officia duis enim cillum. Amet labore eu dolor est veniam id aute
              deserunt est proident elit irure. Ullamco dolor ea elit ex qui.
              Sunt magna irure culpa elit aliqua nisi ea ex ea.
            </ProjectCard>
            <ProjectCard
              links={[
                {
                  type: "github",
                  content: "https://github.com/maxwiseman/flashcards-v2",
                },
                {
                  type: "link",
                  content: "https://flashcards.maxwiseman.io",
                },
              ]}
              technology={[
                "vercel",
                "next",
                "react",
                "drizzle",
                "planetscale",
                "cloudflare",
              ]}
              title="Flashcards"
            >
              Culpa exercitation tempor sint aliqua sint est. Ipsum laborum
              excepteur nostrud magna ea adipisicing reprehenderit ea nisi.
              Eiusmod laborum minim irure voluptate cupidatat Lorem ea occaecat
              culpa culpa. Nulla velit do fugiat irure mollit ipsum cupidatat
              occaecat dolor eiusmod magna anim nisi fugiat. Non voluptate quis
              ullamco in. Tempor excepteur tempor tempor ut quis.
            </ProjectCard>
            <ProjectCard
              links={[
                {
                  type: "github",
                  content: "https://github.com/maxwiseman/Serge-Frontend",
                },
              ]}
              technology={["vercel", "next", "react", "ai", "cloudflare"]}
              title="LLaMa Frontend"
            >
              Culpa exercitation tempor sint aliqua sint est. Ipsum laborum
              excepteur nostrud magna ea adipisicing reprehenderit ea nisi.
              Eiusmod laborum minim irure voluptate cupidatat Lorem ea occaecat
              culpa culpa. Nulla velit do fugiat irure mollit ipsum cupidatat
              occaecat dolor eiusmod magna anim nisi fugiat. Non voluptate quis
              ullamco in. Tempor excepteur tempor tempor ut quis.
            </ProjectCard>
          </div>
        </div>
      </div>
    </>
  );
}
