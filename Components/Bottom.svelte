<script lang="ts">
  import { formatBytes } from "$ts/bytes";
  import { Runtime } from "../ts/runtime";
  import Status from "./Bottom/Status.svelte";

  export let runtime: Runtime;

  const { Progress } = runtime;

  let canceling = false;

  async function cancel() {
    canceling = true;

    await $Progress.cancel();

    runtime.process.handler.kill(runtime.pid, true);
  }
</script>

<div class="bottom">
  <p class="status">
    {#if $Progress.type == "quantity"}
      {$Progress.done} / {$Progress.max} done
    {:else if $Progress.type == "size"}
      {formatBytes($Progress.done)} / {formatBytes($Progress.max)} done
    {/if}
  </p>
  <Status {runtime} />

  <button
    class="cancel"
    disabled={!$Progress.cancel || canceling}
    on:click={cancel}
  >
    Cancel
  </button>
</div>
