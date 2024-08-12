"use client";

import useEditor from "@/store/editor";
import { useEffect, useState } from "react";
import { serialize } from "next-mdx-remote/serialize";
import { MDXRemote } from "next-mdx-remote";
import { toMarkdown } from "@/lib/utils";
import { CircleIcon } from "lucide-react";
import rehypePrism from "rehype-prism-plus";

export default function Preview() {
  const { filename, code, lang } = useEditor();
  const [mdxSource, setMdxSource] =
    useState<Awaited<ReturnType<typeof serialize>>>();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function convert() {
      const data = await serialize(toMarkdown(code, { lang }), {
        mdxOptions: {
          rehypePlugins: [rehypePrism],
        },
      });
      setMdxSource(data);
    }

    convert()
      .catch((e) => console.log(e))
      .finally(() => setLoading(false));
  }, [code, lang]);

  if (loading) return "Loading...";
  return (
    <div className="p-5 font-code flex items-center justify-center h-full overflow-y-auto">
      <div className="prose prose-zinc dark:prose-invert dark:prose-code:text-neutral-200 prose-code:text-neutral-700 prose-pre:font-code dark:prose-code:bg-neutral-900 dark:prose-pre:bg-neutral-900 prose-code:bg-neutral-100 prose-pre:bg-neutral-100 prose-pre:rounded-t-none prose-pre:rounded-lg max-w-[98%] min-w-[55%] prose-code:whitespace-pre-wrap">
        <Topbar filename={filename} />
        {mdxSource && <MDXRemote {...mdxSource} />}
      </div>
    </div>
  );
}

function Topbar({ filename }: { filename: string }) {
  return (
    <div className="flex items-center gap-4 h-11 px-7 rounded-t-lg -mb-7 dark:bg-neutral-800 bg-neutral-200">
      <div className="flex items-center gap-1">
        <CircleIcon className="w-[0.6rem] h-[0.6rem] fill-current text-green-500" />
        <CircleIcon className="w-[0.6rem] h-[0.6rem] fill-current text-orange-500" />
        <CircleIcon className="w-[0.6rem] h-[0.6rem] fill-current text-red-500" />
      </div>
      <div className="text-sm">{filename}</div>
    </div>
  );
}
