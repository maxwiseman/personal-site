"use client";

import { useTheme } from "next-themes";
import Image from "next/image";
import { useEffect, useState } from "react";

export function HeroImage({
  light,
  dark,
}: {
  light: string;
  dark: string;
}): JSX.Element {
  const { theme } = useTheme();

  let src: string;

  const [prefersDarkTheme, setPrefersDarkTheme] = useState<boolean>(false);

  const darkModeQuery = window.matchMedia("prefers-color-scheme: dark");

  useEffect(() => {
    if (document.querySelector(".dark")) {
      setPrefersDarkTheme(true);
    } else {
      setPrefersDarkTheme(false);
    }
  }, [darkModeQuery]);

  if ((theme === "system" && prefersDarkTheme) || theme === "dark") {
    src = dark;
  } else {
    src = light;
  }

  return (
    <div className="w-full flex justify-center items-center">
      <div className="mx-6 sm:mx-8 md:mx-12 lg:mx-24">
        <div className="-m-2 max-w-6xl backdrop-blur-sm rounded-xl bg-gray-900/5 dark:bg-white/5 p-2 ring-1 ring-inset ring-gray-900/10 dark:ring-white/10 lg:-m-4 lg:rounded-2xl lg:p-4">
          <Image
            alt="Preview"
            className="rounded-md max-h-[75vh] object-cover bg-white p-0 shadow-2xl ring-1 ring-gray-900/10 dark:ring-gray-400/10"
            height={866}
            src={src}
            width={1364}
          />
        </div>
      </div>
    </div>
  );
}