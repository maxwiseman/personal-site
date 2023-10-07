export interface Project {
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
  github?: string;
  link?: string;
  body: Block[];
  stack?: {
    vercel: boolean;
    react: boolean;
    next: boolean;
    drizzle: boolean;
    planetscale: boolean;
    neon: boolean;
    cloudflare: boolean;
    ai: boolean;
    tailwind: boolean;
  };
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
