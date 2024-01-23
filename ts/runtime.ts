import { AppRuntime } from "$ts/apps/runtime";
import { Process } from "$ts/process";
import { sleep } from "$ts/util";
import { Store } from "$ts/writable";
import type { App, AppMutator } from "$types/app";
import { ReadableStore } from "$types/writable";
import { FileOperation } from "./types";

export class Runtime extends AppRuntime {
  public Progress = Store<FileOperation>();

  constructor(app: App, mutator: AppMutator, process: Process) {
    super(app, mutator, process);

    function stop() {
      process.handler.kill(process.pid, true);
    }

    const args = process.args;
    const store = args[0] as ReadableStore<FileOperation>;

    if (!args.length || !store || !store.get || !store.set) { stop(); return; }

    store.subscribe(async (v) => {
      this.Progress.set(v);
      this.setWindowTitle(v.caption);
      this.setWindowIcon(v.icon);

      if (v.done >= v.max) {
        await sleep(350);

        stop();
      }
    });
  }
}