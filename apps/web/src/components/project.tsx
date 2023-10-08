import {
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
import { cloneElement } from "react";

export interface Project {
  _createdAt: Date;
  _updatedAt: Date;
  _id: string;
  _rev: string;
  _type: "project";
  name: string;
  slug: { current: string; _type: "slug" };
  description: string;
  image?: {
    _type: "image";
    dark: {
      _type: "image";
      asset: {
        _ref: string;
        _type: string;
      };
    };
    light: {
      _type: "image";
      asset: {
        _ref: string;
        _type: string;
      };
    };
  };
  repo: string;
  branch: string;
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

export function Technology({
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

interface Technology {
  icon: React.ReactElement;
  name: string;
}

export const dict: {
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
