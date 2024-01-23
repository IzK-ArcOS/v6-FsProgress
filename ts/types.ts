import { ReadableStore } from "$types/writable";

export interface FileOperation {
  type: "quantity" | "size" | "none";
  icon: string;
  caption: string;
  subtitle: string;
  done: number;
  max: number;
  cancel?: () => void;
}

export interface FileProgressMutator {
  progress: ReadableStore<FileOperation>;
  mutateMax: (mutator: number) => void;
  mutateDone: (mutator: number) => void;
  setDone: (value: number) => void;
  setMax: (value: number) => void;
  updateCaption: (caption: string) => void;
  updateSubtitle: (subtitle: string) => void;
}