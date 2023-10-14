"use client";

import {
  IconExternalLink,
  IconPlayerPause,
  IconPlayerPlay,
} from "@tabler/icons-react";
import { useTheme } from "next-themes";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "ui/components/ui/button";

export function HeroImage({
  light,
  dark,
  href,
}: {
  light: string;
  dark: string;
  href?: string;
}): JSX.Element {
  const { theme } = useTheme();

  let src: string;

  const [prefersDarkTheme, setPrefersDarkTheme] = useState<boolean>(false);
  const [showPreview, setShowPreview] = useState<boolean>(false);
  const [frameWidth, setFrameWidth] = useState<number>(getWidth());
  const [frameHeight, setFrameHeight] = useState<number>(getHeight());

  useEffect(() => {
    addEventListener("resize", () => {
      setFrameWidth(getWidth());
      setFrameHeight(getHeight());
    });
  }, []);

  useEffect(() => {
    if (document.querySelector(".dark")) {
      setPrefersDarkTheme(true);
    } else {
      setPrefersDarkTheme(false);
    }
  }, []);

  function getWidth(): number {
    if (typeof window !== "undefined")
      return Math.min(1120, window.innerWidth - 224);
    return 0;
  }
  function getHeight(): number {
    if (typeof window !== "undefined") return window.innerHeight * 0.75;
    return 0;
  }

  if ((theme === "system" && prefersDarkTheme) || theme === "dark") {
    src = dark;
  } else {
    src = light;
  }

  if (href)
    return (
      <div className="flex w-full items-center justify-center">
        <div className="mx-6 sm:mx-8 md:mx-12 lg:mx-24">
          {/* <Link href={href} target="_blank"> */}

          <div className="group max-w-6xl rounded-xl bg-gray-900/5 p-2 ring-1 ring-inset ring-gray-900/10 backdrop-blur-sm dark:bg-white/5 dark:ring-white/10 lg:rounded-2xl lg:p-4">
            {showPreview ? (
              <div className="relative">
                <iframe
                  className="bg-background max-h-[75vh] rounded-md object-cover p-0 shadow-2xl ring-1 ring-gray-900/10 dark:ring-gray-400/10"
                  height={frameHeight}
                  src={href}
                  title="Preview"
                  width={frameWidth}
                />
                <div className="absolute right-0 top-0 m-3 flex flex-row gap-2 opacity-0 transition-opacity group-hover:opacity-100">
                  <Button
                    className="bg-background"
                    onClick={() => {
                      setShowPreview(false);
                    }}
                    size="icon"
                    variant="outline"
                  >
                    <IconPlayerPause className="h-4 w-4" />
                  </Button>
                  <Link href={href} tabIndex={-1}>
                    <Button
                      className="bg-background"
                      size="icon"
                      variant="outline"
                    >
                      <IconExternalLink className="h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </div>
            ) : (
              <div className="relative">
                <Image
                  alt="Preview"
                  className="bg-background max-h-[75vh] rounded-md object-cover p-0 shadow-2xl ring-1 ring-gray-900/10 dark:ring-gray-400/10"
                  height={866}
                  src={src}
                  width={1364}
                />
                {/* <div className="absolute top-0 right-0 m-3 flex flex-row gap-2 transition-opacity opacity-0 group-hover:opacity-100 focus-within:opacity-100">
                  <Button
                    className="bg-background"
                    onClick={() => {
                      setShowPreview(true);
                    }}
                    size="icon"
                    variant="outline"
                  >
                    <IconPlayerPlay className="w-4 h-4" />
                  </Button>
                  <Link href={href} tabIndex={-1}>
                    <Button
                      className="bg-background"
                      size="icon"
                      variant="outline"
                    >
                      <IconExternalLink className="w-4 h-4" />
                    </Button>
                  </Link>
                </div> */}
                <div className="absolute left-0 top-0 flex h-full w-full flex-row items-center justify-center gap-2 rounded-md bg-black/50 opacity-0 backdrop-blur-lg transition-opacity duration-300 focus-within:opacity-100 hover:opacity-100 motion-reduce:transition-none">
                  <Button
                    className="flex flex-row gap-2"
                    onClick={() => {
                      setShowPreview(true);
                    }}
                  >
                    <IconPlayerPlay className="h-4 w-4" /> Live Preview
                  </Button>
                  <Link href={href} tabIndex={-1}>
                    <Button className="flex flex-row gap-2">
                      <IconExternalLink className="h-4 w-4" /> Open in New Tab
                    </Button>
                  </Link>
                </div>
              </div>
            )}
          </div>
          {/* </Link> */}
        </div>
      </div>
    );
  return (
    <div className="flex w-full items-center justify-center">
      <div className="mx-6 sm:mx-8 md:mx-12 lg:mx-24">
        <div className="max-w-6xl rounded-xl bg-gray-900/5 p-2 ring-1 ring-inset ring-gray-900/10 backdrop-blur-sm dark:bg-white/5 dark:ring-white/10 lg:rounded-2xl lg:p-4">
          <Image
            alt="Preview"
            className="max-h-[75vh] rounded-md bg-white object-cover p-0 shadow-2xl ring-1 ring-gray-900/10 dark:ring-gray-400/10"
            height={866}
            src={src}
            width={1364}
          />
        </div>
      </div>
    </div>
  );
}
