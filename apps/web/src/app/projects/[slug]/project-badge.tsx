import { cloneElement } from "react";

export function ProjectBadge({
  children,
  icon,
}: {
  children: React.ReactNode;
  icon: React.ReactElement;
}): JSX.Element {
  const newIcon = cloneElement(icon, { className: "w-4 h-4" });

  return (
    <div className="flex flex-row flex-nowrap items-center gap-2 rounded-full bg-gray-900/5 p-1 px-4 ring-1 ring-inset ring-gray-900/10 backdrop-blur-sm dark:bg-white/5 dark:text-white dark:ring-white/10">
      {newIcon}
      {children}
    </div>
  );
}
