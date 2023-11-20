import { Card, CardContent, CardTitle } from "ui/components/ui/card";
import { cn } from "ui/lib/utils";

export default function Note({
  children,
  title,
  variant = "note",
  className,
}: {
  children?: React.ReactNode;
  title?: string;
  variant?: "note" | "success" | "warning" | "error";
  className?: string;
}): JSX.Element {
  const variants = {
    note: "!ring-[hsl(220,100%,94%)] bg-[hsl(220,100%,97%)] text-[hsl(208,100%,45%)] dark:!ring-[hsl(220,89%,16%)] dark:bg-[hsl(220,76%,10%)] dark:text-[hsl(220,100%,81%)]",
    success:
      "!ring-[hsl(145,92%,91%)] bg-[hsl(143,85%,96%)] text-[hsl(140,100%,27%)] dark:!ring-[hsl(147,100%,12%)] dark:bg-[hsl(150,100%,6%)] dark:text-[hsl(150,86%,65%)]",
    warning:
      "!ring-[hsl(56,71%,74%)] bg-[hsl(56,100%,89%)] text-[hsl(50,45%,51%)] dark:!ring-[hsl(56,89%,16%)] dark:bg-[hsl(56,76%,10%)] dark:text-[hsl(56,100%,81%)]",
    error:
      "!ring-[hsl(359,100%,94%)] bg-[hsl(359,100%,97%)] text-[hsl(360,100%,45%)] dark:!ring-[hsl(357,89%,16%)] dark:bg-[hsl(358,76%,10%)] dark:text-[hsl(358,100%,81%)]",
  };

  return (
    <Card className={cn("ring-1 border-0", variants[variant], className)}>
      <CardTitle className="p-4 pb-3 flex flex-row items-center gap-2">
        {title}
      </CardTitle>
      <CardContent className="p-4 pt-0">{children}</CardContent>
    </Card>
  );
}
