"use client";

import moment from "moment";
import { Avatar, AvatarFallback, AvatarImage } from "ui/components/ui/avatar";
import type { BranchData } from "./github-data";

export function Commit({
  branchData,
}: {
  branchData: BranchData;
}): JSX.Element {
  return (
    <div className="flex w-full flex-row flex-nowrap items-center justify-between gap-2">
      {/* <IconBrandGithub className="w-5 h-5" /> */}
      <div className="flex flex-row flex-nowrap items-center gap-2">
        <Avatar className="h-7 w-7 ring-1 ring-gray-900/10 dark:ring-white/10">
          <AvatarImage
            alt={branchData.commit.committer.name}
            src={branchData.committer.avatar_url as unknown as string}
          />
          <AvatarFallback>{branchData.commit.author.name}</AvatarFallback>
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
