"use client";

import { TooltipProvider } from "ui/components/ui/tooltip";
import { ThemeProvider } from "next-themes";
import { Analytics } from "@vercel/analytics/react";
import { Toaster } from "ui/components/ui/toaster";

export function Providers({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <Analytics />
      <Toaster />
      <TooltipProvider>{children}</TooltipProvider>
    </ThemeProvider>
  );
}
