import { AppRuntime } from "$ts/apps/runtime";
import { WarningIcon } from "$ts/images/dialog";
import { Process } from "$ts/process";
import { createErrorDialog } from "$ts/process/error";
import { Plural as P, sleep } from "$ts/util";
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

    if (!args.length || !store || !store.get || !store.set) {
      stop();
      return;
    }

    let errorNotified = false;

    store.subscribe(async (v) => {
      this.Progress.set(v);
      this.setWindowTitle(v.caption);
      this.setWindowIcon(v.icon);

      if (v.done >= v.max && !v.errors) {
        await sleep(350);

        stop();
      }

      if (v.done >= v.max && v.errors && !errorNotified) {
        errorNotified = true;
        createErrorDialog(
          {
            title: "Errors Occured",
            message: `${v.errors} ${P("Error", v.errors)} occured while <b>${
              v.caption
            }</b> was running.`,
            buttons: [
              {
                caption: "Okay",
                action() {
                  stop();
                },
                suggested: true,
              },
            ],
            image: WarningIcon,
            sound: "arcos.dialog.warning",
          },
          this.process.parentPid || 0,
          !!this.process.parentPid
        );
      }
    });
  }
}
