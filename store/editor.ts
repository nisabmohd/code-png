import { defaultCode, defaultFilename, defaultLang, Lang } from "@/lib/utils";
import { create } from "zustand";

type State = {
  filename: string;
  code: string;
  lang: Lang;
};

type Action = {
  setData: (data: Partial<State>) => void;
};

const useEditor = create<State & Action>((set) => ({
  filename: defaultFilename,
  code: defaultCode,
  lang: defaultLang,
  setData: (data) => set(data),
}));

export default useEditor;
