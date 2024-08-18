import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import useEditor from "@/store/editor";
import { Button } from "./ui/button";
import { useEffect } from "react";
import useMounted from "./use-mounted";
import { useTheme } from "next-themes";
import { Link2Icon, ListOrderedIcon } from "lucide-react";
import { LangKeys, LangOptions } from "@/lib/utils";
import { useToast } from "@/components/ui/use-toast";

export default function Editor({
  urlCode,
  exportAs,
}: {
  urlCode?: string;
  exportAs: (format: "png" | "svg") => void;
}) {
  const mounted = useMounted();
  let { filename, code, highlight, lines, lang, setData } = useEditor();
  const { setTheme, resolvedTheme } = useTheme();
  const { toast } = useToast();

  useEffect(() => {
    if (!urlCode) return;
    setData({
      code: decodeURIComponent(urlCode),
    });
  }, [urlCode, setData]);

  function generateUrlAndCopy() {
    const decoded = encodeURIComponent(code);
    navigator.clipboard.writeText(
      `https://code-png.vercel.app/editor?urlCode=${decoded}`
    );
    toast({
      title: "Url copied to clipboard",
    });
  }

  if (!mounted) return null;

  return (
    <div className="font-code flex flex-col gap-4 h-full p-5">
      <Textarea
        value={code}
        onChange={(e) => setData({ code: e.target.value })}
        spellCheck="false"
        className="resize-none md:h-[78.5%] h-[50vh]"
        placeholder="code snippet"
      />
      <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
        <Input
          value={filename}
          onChange={(e) => setData({ filename: e.target.value })}
          placeholder="filename"
        />
        <Input
          value={highlight}
          onChange={(e) => setData({ highlight: e.target.value })}
          placeholder="Highlight line (ex: 1,3,4)"
        />
        <Select
          value={lang}
          onValueChange={(val) => setData({ lang: val as LangKeys })}
        >
          <SelectTrigger>
            <SelectValue placeholder="Language" />
          </SelectTrigger>
          <SelectContent className="font-code">
            {LangOptions.map((item) => (
              <SelectItem key={item.lang} value={item.lang}>
                {item.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={resolvedTheme} onValueChange={setTheme}>
          <SelectTrigger>
            <SelectValue placeholder="Theme" />
          </SelectTrigger>
          <SelectContent className="font-code">
            <SelectItem value="light">Light</SelectItem>
            <SelectItem value="dark">Dark</SelectItem>
          </SelectContent>
        </Select>
        <Button
          onClick={() => setData({ lines: !lines })}
          variant={lines ? "secondary" : "outline"}
        >
          <ListOrderedIcon className="w-4 h-4 mr-3" />
          Show Lines
        </Button>
        <Button variant="outline" disabled={!code} onClick={generateUrlAndCopy}>
          <Link2Icon className="w-4 h-4 mr-3" />
          Copy URL
        </Button>
        <Button
          variant="outline"
          disabled={!code}
          onClick={() => exportAs("svg")}
        >
          Export as SVG
        </Button>
        <Button
          variant="outline"
          disabled={!code}
          onClick={() => exportAs("png")}
        >
          Export as PNG
        </Button>
      </div>
    </div>
  );
}
