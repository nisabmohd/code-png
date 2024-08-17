import useEditor from "@/store/editor";
import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { serialize } from "next-mdx-remote/serialize";
import { MDXRemote } from "next-mdx-remote";
import { toMarkdown } from "@/lib/utils";
import { CircleIcon } from "lucide-react";
import rehypePrism from "rehype-prism-plus";
import { toPng, toSvg } from "html-to-image";
import download from "downloadjs";

// TODO: Scrollable screenshot capture

const Preview = forwardRef<PreviewRef, {}>((props, ref) => {
  const nodeRef = useRef<HTMLDivElement>(null);
  const { filename, code, lang, highlight, lines } = useEditor();

  const [mdxSource, setMdxSource] =
    useState<Awaited<ReturnType<typeof serialize>>>();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function convert() {
      const data = await serialize(
        toMarkdown(code, { lang, highlight, lineNumbers: lines }),
        {
          mdxOptions: {
            rehypePlugins: [rehypePrism],
          },
        }
      );
      setMdxSource(data);
    }

    convert()
      .catch((e) => console.log(e))
      .finally(() => setLoading(false));
  }, [code, lang, highlight, lines]);

  function exportAsPng() {
    if (!nodeRef.current) return;
    toPng(nodeRef.current, { cacheBust: true, quality: 1, pixelRatio: 1 }).then(
      (dataUrl) => {
        download(dataUrl, `${filename}.png`);
      }
    );
  }

  function exportAsSvg() {
    if (!nodeRef.current) return;
    toSvg(nodeRef.current, { cacheBust: true, quality: 1 }).then((dataUrl) => {
      download(dataUrl, `${filename}.svg`);
    });
  }

  useImperativeHandle(ref, () => ({
    exportAsPng,
    exportAsSvg,
  }));

  if (loading) return "Loading...";
  return (
    <div className="p-5 font-code flex flex-col gap-4 items-center justify-center h-full overflow-y-scroll select-none">
      <div
        ref={nodeRef}
        className="prose prose-zinc dark:prose-invert dark:prose-code:text-neutral-200 prose-code:text-neutral-700 prose-pre:font-code dark:prose-code:bg-neutral-900 dark:prose-pre:bg-neutral-900 prose-code:bg-neutral-100 prose-pre:bg-neutral-100 prose-pre:rounded-t-none prose-pre:rounded-lg max-w-[98%] min-w-[65%] prose-code:whitespace-pre-wrap max-h-full"
      >
        <Topbar filename={filename} />
        {mdxSource && <MDXRemote {...mdxSource} />}
        <p className="opacity-0 my-1 text-xs -mt-4">Made by Nisab</p>
      </div>
    </div>
  );
});

Preview.displayName = "PreviewRoot";

function Topbar({ filename }: { filename: string }) {
  return (
    <div className="flex items-center gap-4 h-11 px-6 rounded-t-lg -mb-7 dark:bg-neutral-800 bg-neutral-200">
      <div className="flex items-center gap-1">
        <CircleIcon className="w-[0.6rem] h-[0.6rem] fill-current text-green-500" />
        <CircleIcon className="w-[0.6rem] h-[0.6rem] fill-current text-orange-500" />
        <CircleIcon className="w-[0.6rem] h-[0.6rem] fill-current text-red-500" />
      </div>
      <div className="text-sm">{filename}</div>
    </div>
  );
}

export type PreviewRef = {
  exportAsPng: () => void;
  exportAsSvg: () => void;
};

export default Preview;
