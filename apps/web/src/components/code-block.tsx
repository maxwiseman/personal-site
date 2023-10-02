"use client";
import { SlashIcon } from "@radix-ui/react-icons";
import { IconClipboardCopy } from "@tabler/icons-react";
// import "highlight.js/styles/github.css";
import { useTheme } from "next-themes";
import { Suspense, lazy } from "react";
import Highlight from "react-highlight";
import reactStringReplace from "react-string-replace";
import { Button } from "ui/components/ui/button";
import { Card, CardContent, CardHeader } from "ui/components/ui/card";
import { Separator } from "ui/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "ui/components/ui/tooltip";
import { useToast } from "ui/components/ui/use-toast";
import { cn } from "ui/lib/utils";

export function CodeBlock({
  children,
  language,
  content,
  fileName,
}: {
  children?: React.ReactNode;
  language?: string;
  content?: string;
  fileName?: string;
}): JSX.Element {
  const { toast } = useToast();
  const { theme } = useTheme();

  const LightTheme = lazy(() => import("../app/projects/[slug]/light"));
  const DarkTheme = lazy(() => import("../app/projects/[slug]/dark"));

  return (
    <Card className="overflow-hidden my-6">
      {fileName ? (
        <>
          <CardHeader className="pb-0 pt-3 flex flex-row items-center justify-between">
            <span className="font-mono text-muted-foreground flex flex-row items-center gap-1">
              {reactStringReplace(fileName, "/", () => {
                return <SlashIcon className="w-4 h-4" />;
              })}
            </span>
          </CardHeader>
          <Separator className="my-3" />
        </>
      ) : (
        <div className="h-3" />
      )}
      <div className="relative">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              className="absolute right-6 top-0 bg-card"
              onClick={() => {
                navigator.clipboard
                  .writeText(content || "")
                  .then(() => {
                    toast({
                      // title: "Copied to clipboard!",
                      description: "Code copied to clipboard",
                      duration: 3000,
                    });
                  })
                  .catch(() => {
                    toast({
                      variant: "destructive",
                      title: "Error copying to clipboard",
                      description: "We're not sure what went wrong.",
                    });
                  });
              }}
              size="icon"
              variant="outline"
            >
              <IconClipboardCopy className="w-4 h-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Copy to clipboard</TooltipContent>
        </Tooltip>
        <CardContent className="mb-3 pb-0 flex items-center min-h-[36px] overflow-x-scroll">
          <Suspense>
            {theme === "light" ? <LightTheme /> : null}
            {theme === "dark" ? <DarkTheme /> : null}
          </Suspense>
          <Highlight className={cn("!p-0 !bg-card", language)}>
            {children}
          </Highlight>
        </CardContent>
      </div>
    </Card>
  );
}
