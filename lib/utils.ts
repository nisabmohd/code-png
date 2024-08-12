import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export type Lang =
  | "js"
  | "jsx"
  | "ts"
  | "tsx"
  | "java"
  | "go"
  | "py"
  | "html"
  | "css"
  | "bash"
  | "plaintext";

type Options = {
  lang?: Lang;
  highlight?: string;
  lineNumbers?: boolean;
};

export function toMarkdown(
  code: string,
  { lang = defaultLang, highlight = "", lineNumbers = false }: Options
) {
  return `
   \`\`\`${lang} ${highlight} ${lineNumbers ? "showLineNumbers" : ""}
  ${code}
   \`\`\`
  `;
}

export const defaultCode = `console.log("hello world")`;
export const defaultLang = "java" satisfies Lang;
export const defaultFilename = "untitled";
