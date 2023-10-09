"use client";

import { IconLoader } from "@tabler/icons-react";
import moment from "moment";
import Link from "next/link";
import { useQuery } from "react-query";
import { Avatar, AvatarFallback, AvatarImage } from "ui/components/ui/avatar";
import type { Project } from "../../../components/project";
import type { BranchData, RepoData } from "./github-data";

export function CommitBlock({ project }: { project: Project }): JSX.Element {
  const { data: repoData, isFetched: repoFetched } = useQuery(
    "repo",
    async () => {
      const data = await fetch(
        `https://api.github.com/repos/${project.repo}`,
      ).then((response: Response): Promise<RepoData> => response.json());
      return data;
    },
  );
  const { data: branchData, isFetched: branchFetched } = useQuery(
    "branch",
    async () => {
      const data = await fetch(
        `https://api.github.com/repos/${project.repo}/commits`,
      ).then((response: Response): Promise<BranchData[]> => response.json());
      return data;
    },
  );

  if (repoFetched && branchFetched) {
    return (
      <Link
        className="mx-6 mt-10 w-full max-w-6xl space-y-5 rounded-xl bg-gray-900/5 p-5 ring-1 ring-inset ring-gray-900/10 backdrop-blur-sm dark:bg-white/5 dark:text-white dark:ring-white/10 sm:mx-8 md:mx-12 lg:mx-24"
        href={repoData?.html_url || ""}
      >
        {branchData ? <Commit branchData={branchData[0]} /> : null}
      </Link>
    );
  }
  return (
    <div className="mx-6 mt-10 flex w-full max-w-6xl flex-row flex-nowrap items-center gap-2 space-y-5 rounded-xl bg-gray-900/5 p-5 ring-1 ring-inset ring-gray-900/10 backdrop-blur-sm dark:bg-white/5 dark:text-white dark:ring-white/10 sm:mx-8 md:mx-12 lg:mx-24">
      <IconLoader className="m-1 h-5 w-5 animate-spin" /> Loading...
    </div>
  );
}

export function Commit({
  branchData,
}: {
  branchData: BranchData;
}): JSX.Element {
  return (
    <div className="flex w-full flex-row flex-nowrap items-center justify-between gap-2">
      <div className="flex flex-row flex-nowrap items-center gap-2">
        <Avatar className="h-7 w-7 ring-1 ring-gray-900/10 dark:ring-white/10">
          <AvatarImage
            alt={branchData.commit.committer.name}
            src={branchData.committer.avatar_url as unknown as string}
          />
          <AvatarFallback>
            <IconLoader className="h-4 w-4 animate-spin text-gray-400" />
          </AvatarFallback>
        </Avatar>
        <span className="mr-1">{branchData.commit.author.name}:</span>
        <span className="text-muted-foreground">
          {branchData.commit.message}
        </span>
      </div>
      <span className="text-muted-foreground">
        {moment(branchData.commit.author.date).fromNow()}
      </span>
    </div>
  );
}
