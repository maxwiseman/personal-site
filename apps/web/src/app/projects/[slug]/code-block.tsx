"use client";
import Highlight from "react-highlight";
import "highlight.js/styles/github.css";

export function CodeBlock({
  children,
  language,
}: {
  children?: React.ReactNode;
  language?: string;
}): JSX.Element {
  return <Highlight className={language}>{children}</Highlight>;
}
