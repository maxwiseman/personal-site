"use client";

import { TooltipProvider } from "ui/components/ui/tooltip";
import { ThemeProvider, useTheme } from "next-themes";
import { Analytics } from "@vercel/analytics/react";
import { Toaster } from "sonner";

export function Providers({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <Analytics />
      <ToastProvider />
      <TooltipProvider>{children}</TooltipProvider>
    </ThemeProvider>
  );
}

function ToastProvider(): JSX.Element {
  const { theme } = useTheme();
  return (
    <Toaster
      closeButton
      richColors
      theme={theme as "light" | "dark" | "system"}
    />
  );
}
