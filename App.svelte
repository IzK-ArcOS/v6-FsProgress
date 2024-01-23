<script lang="ts">
  import Titlebar from "$state/Desktop/Components/ProcessRenderer/Window/Titlebar.svelte";
  import { formatBytes } from "$ts/bytes";
  import { App } from "$types/app";
  import { ReadableStore } from "$types/writable";
  import "./css/main.css";
  import { Runtime } from "./ts/runtime";

  export let runtime: Runtime;
  export let appMutator: ReadableStore<App>;

  const { Progress } = runtime;

  let canceling = false;

  async function cancel() {
    canceling = true;

    await $Progress.cancel();

    runtime.process.handler.kill(runtime.pid, true);
  }
</script>

{#if $Progress}
  <Titlebar app={appMutator} pid={runtime.pid} />
  <div class="top">
    <div class="display">
      <img src={$Progress.icon} alt="" />
      <div class="context">
        <p class="caption">{$Progress.caption}</p>
        <p class="subtitle">{$Progress.subtitle}</p>
      </div>
    </div>
    <div class="bar">
      <div
        class="inner"
        style="--max: {$Progress.max}; --done: {$Progress.done}"
      />
    </div>
  </div>
  <div class="bottom">
    <p class="status">
      {#if $Progress.type == "quantity"}
        {$Progress.done} / {$Progress.max} done
      {:else if $Progress.type == "size"}
        {formatBytes($Progress.done)} / {formatBytes($Progress.max)} done
      {/if}
    </p>
    <button
      class="cancel"
      disabled={!$Progress.cancel || canceling}
      on:click={cancel}
    >
      Cancel
    </button>
  </div>
{/if}
