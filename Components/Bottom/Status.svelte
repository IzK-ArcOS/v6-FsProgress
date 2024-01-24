<script lang="ts">
  import { Runtime } from "$apps/FsProgress/ts/runtime";

  export let runtime: Runtime;

  const { Progress } = runtime;
</script>

<div class="status">
  <span
    class="material-icons-round warning"
    class:active={$Progress.errors}
    title="{$Progress.errors} Error(s)"
  >
    warning
  </span>
  <span
    class="material-icons-round working"
    class:active={$Progress.working}
    title="Writing data indicator"
  >
    storage
  </span>
  <span
    class="material-icons-round waiting"
    class:active={$Progress.waiting}
    title="Cooldown indicator"
  >
    hourglass_top
  </span>
</div>
