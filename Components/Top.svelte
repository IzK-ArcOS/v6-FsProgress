<script lang="ts">
  import { Runtime } from "../ts/runtime";
  import Bar from "./Top/Bar.svelte";

  export let runtime: Runtime;

  const { Progress } = runtime;
</script>

<div class="top">
  <div class="display">
    <img src={$Progress.icon} alt="" />
    <div class="context">
      <p class="caption">{$Progress.caption}</p>
      <p class="subtitle">{$Progress.subtitle}</p>
    </div>
  </div>
  <Bar {runtime} />
</div>
