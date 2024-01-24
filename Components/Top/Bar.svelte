<script lang="ts">
  import { Runtime } from "$apps/FsProgress/ts/runtime";

  export let runtime: Runtime;

  export let { Progress } = runtime;
</script>

<div class="bar">
  <div class="inner" style="--max: {$Progress.max}; --done: {$Progress.done}" />
</div>
