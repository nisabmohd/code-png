import dynamic from "next/dynamic";

const EditorWrapper = dynamic(() => import("@/components/editor-wrapper"), {
  ssr: false,
});

export default function EditorPage(props: {
  searchParams: { urlCode?: string };
}) {
  return <EditorWrapper urlCode={props.searchParams.urlCode} />;
}
