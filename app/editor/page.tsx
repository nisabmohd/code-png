import dynamic from "next/dynamic";
import Editor from "@/components/editor";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";

const Preview = dynamic(() => import("@/components/preview"), { ssr: false });

export default function EditorPage() {
  return (
    <div className="h-screen">
      <ResizablePanelGroup className="h-full w-full" direction="horizontal">
        <ResizablePanel className="p-5" minSize={25} defaultSize={35}>
          <Editor />
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={65} minSize={45}>
          <Preview />
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}
