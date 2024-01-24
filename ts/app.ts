import { ComponentIcon } from "$ts/images/general";
import { App } from "$types/app";
import AppSvelte from "../App.svelte";
import { Runtime } from "./runtime";

export const FsProgress: App = {
  metadata: {
    name: "FsProgress",
    description: "Tells you how far filesystem operations are complete",
    author: "The ArcOS Team",
    version: "1.0.0",
    icon: ComponentIcon,
    noCloseAccelerator: true,
    hidden: true
  },
  runtime: Runtime,
  content: AppSvelte,
  id: "FsProgress",
  size: { w: 400, h: NaN },
  minSize: { w: 400, h: 160 },
  maxSize: { w: 400, h: NaN },
  pos: { x: 300, y: 300 },
  state: {
    minimized: false,
    maximized: false,
    headless: false,
    fullscreen: false,
    resizable: false
  },
  controls: {
    minimize: false,
    maximize: false,
    close: false
  },
  isOverlay: true
}