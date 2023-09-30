"use client";
import { IconClipboardCopy } from "@tabler/icons-react";
import "highlight.js/styles/github.css";
import Highlight from "react-highlight";
import { Button } from "ui/components/ui/button";
import { Card, CardContent, CardHeader } from "ui/components/ui/card";
import { Separator } from "ui/components/ui/separator";
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

  return (
    <Card className="overflow-hidden my-6">
      {fileName ? (
        <>
          <CardHeader className="pb-0 pt-3 flex flex-row items-center justify-between">
            <span className="font-mono text-muted-foreground">{fileName}</span>
          </CardHeader>
          <Separator className="my-3" />
        </>
      ) : (
        <div className="h-6" />
      )}
      <CardContent className="relative mb-3 pb-0 flex items-center min-h-[36px] overflow-x-scroll">
        <Button
          className="absolute right-6 top-0 bg-card"
          onClick={() => {
            navigator.clipboard
              .writeText(content || "")
              .then(() => {
                toast({
                  title: "Copied to clipboard!",
                  description:
                    "The code was successfully copied to your clipboard",
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
        <Highlight className={cn("!p-0", language)}>{children}</Highlight>
      </CardContent>
    </Card>
  );
}