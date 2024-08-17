"use client";

import { useRef } from "react";
import Editor from "@/components/editor";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import Preview, { PreviewRef } from "@/components/preview";

export default function EditorWrapper({ urlCode }: { urlCode?: string }) {
  const ref = useRef<PreviewRef>(null);

  function exportAs(format: "png" | "svg") {
    if (!ref.current) return;
    format == "png" ? ref.current.exportAsPng() : ref.current.exportAsSvg();
  }

  return (
    <div className="h-screen">
      <ResizablePanelGroup className="h-full w-full" direction="horizontal">
        <ResizablePanel className="p-5" minSize={35} defaultSize={35}>
          <Editor urlCode={urlCode} exportAs={exportAs} />
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={55} minSize={45}>
          <Preview ref={ref} />
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}

//  TODO: Mobile responsive
