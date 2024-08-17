import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const LangOptions = [
  { lang: "js", name: "JavaScript" },
  { lang: "jsx", name: "JavaScript (JSX)" },
  { lang: "ts", name: "TypeScript" },
  { lang: "tsx", name: "TypeScript (TSX)" },
  { lang: "java", name: "Java" },
  { lang: "go", name: "Go" },
  { lang: "py", name: "Python" },
  { lang: "html", name: "HTML" },
  { lang: "css", name: "CSS" },
  { lang: "bash", name: "Bash" },
  { lang: "plaintext", name: "Plain Text" },
] as const;

export type LangKeys = (typeof LangOptions)[number]["lang"];

type Options = {
  lang?: LangKeys;
  highlight?: string;
  lineNumbers?: boolean;
};

export function toMarkdown(
  code: string,
  { lang = defaultLang, highlight = "", lineNumbers = false }: Options
) {
  return `
   \`\`\`${lang} {${highlight}} ${lineNumbers ? "showLineNumbers" : ""}
  ${code}
   \`\`\`
  `;
}

export const defaultCode = `class Node {
      int val;
      Node parent, left, right;
      public Node(int val) {
          this.val = val;
      }
      @Override
      public String toString() {
          return Integer.toString(val);
      }
}`;
export const defaultLang = "java" satisfies LangKeys;
export const defaultFilename = "untitled";
