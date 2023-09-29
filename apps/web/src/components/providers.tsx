"use client";

import { TooltipProvider } from "ui/components/ui/tooltip";

export function Providers({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return <TooltipProvider>{children}</TooltipProvider>;
}
