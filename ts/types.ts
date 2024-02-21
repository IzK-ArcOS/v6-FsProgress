import { ReadableStore } from "$types/writable";

export interface FileOperation {
  type: "quantity" | "size" | "none";
  icon: string;
  caption: string;
  subtitle: string;
  done: number;
  max: number;
  cancel?: () => void;
  waiting: boolean;
  working: boolean;
  errors: number;
}

export interface FileProgressMutator {
  progress: ReadableStore<FileOperation>;
  mutateMax: (mutator: number) => void;
  mutDone: (mutator: number) => void;
  mutErr: (mutator: number) => void;
  setMax: (value: number) => void;
  setDone: (value: number) => void;
  setErrors: (value: number) => void;
  updateCaption: (caption: string) => void;
  updSub: (subtitle: string) => void;
  setWait: (waiting: boolean) => void;
  setWork: (waiting: boolean) => void;
}
