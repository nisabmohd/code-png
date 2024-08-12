"use client";

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

export default function Editor() {
  const { filename, code, setData } = useEditor();

  return (
    <div className="font-code flex flex-col gap-4">
      <Input
        value={filename}
        onChange={(e) => setData({ filename: e.target.value })}
        placeholder="filename"
      />
      <Textarea
        value={code}
        onChange={(e) => setData({ code: e.target.value })}
        spellCheck="false"
        rows={20}
        placeholder="code snippet"
      />
      <Select>
        <SelectTrigger>
          <SelectValue placeholder="Language" />
        </SelectTrigger>
        <SelectContent className="font-code">
          <SelectItem value="light">Light</SelectItem>
          <SelectItem value="dark">Dark</SelectItem>
          <SelectItem value="system">System</SelectItem>
        </SelectContent>
      </Select>
      <Select>
        <SelectTrigger>
          <SelectValue placeholder="Theme" />
        </SelectTrigger>
        <SelectContent className="font-code">
          <SelectItem value="light">Light</SelectItem>
          <SelectItem value="dark">Dark</SelectItem>
          <SelectItem value="system">System</SelectItem>
        </SelectContent>
      </Select>
      <Button>Export Image</Button>
    </div>
  );
}

// TODO:
// - lang
// - theme
// - dark mode
// - padding
// - add line numbers
// - highlight lines
