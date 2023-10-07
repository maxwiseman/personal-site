"use client";
import { SlashIcon } from "@radix-ui/react-icons";
import { IconClipboardCopy } from "@tabler/icons-react";
import Highlight from "react-highlight";
import reactStringReplace from "react-string-replace";
import { toast } from "sonner";
import { Button } from "ui/components/ui/button";
import { Card, CardContent, CardHeader } from "ui/components/ui/card";
import { Separator } from "ui/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "ui/components/ui/tooltip";
import { cn } from "ui/lib/utils";
import "./github_code.css";
import "./github_code_dark.css";

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
  function copyCodeToClipboard(): void {
    toast.promise(
      async () => {
        await navigator.clipboard.writeText(content || "");
      },
      {
        loading: "Copying code to clipboard...",
        success: "Code copied to clipboard",
        error: (err: Error) => {
          return `${err.name}: ${err.message}`;
        },
      },
    );
  }

  return (
    <Card className="my-6 overflow-hidden">
      {fileName ? (
        <>
          <CardHeader className="flex flex-row items-center justify-between pb-0 pt-3">
            <span className="text-muted-foreground flex flex-row items-center gap-1 font-mono">
              {reactStringReplace(fileName, "/", () => {
                return <SlashIcon className="h-4 w-4" />;
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
              className="bg-card absolute right-6 top-0"
              onClick={() => {
                copyCodeToClipboard();
              }}
              size="icon"
              variant="outline"
            >
              <IconClipboardCopy className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Copy to clipboard</TooltipContent>
        </Tooltip>
        <CardContent className="mb-3 flex min-h-[36px] items-center overflow-x-scroll pb-0">
          <Highlight className={cn("!bg-card !p-0", language)}>
            {children}
          </Highlight>
        </CardContent>
      </div>
    </Card>
  );
}
