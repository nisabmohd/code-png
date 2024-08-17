import {
  defaultCode,
  defaultFilename,
  defaultLang,
  LangKeys,
} from "@/lib/utils";
import { create } from "zustand";

type State = {
  filename: string;
  code: string;
  lang: LangKeys;
  highlight: string;
  lines: boolean;
};

type Action = {
  setData: (data: Partial<State>) => void;
};

const useEditor = create<State & Action>((set) => ({
  filename: defaultFilename,
  code: defaultCode,
  lang: defaultLang,
  highlight: "",
  lines: true,
  setData: (data) => set(data),
}));

export default useEditor;
