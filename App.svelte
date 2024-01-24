<script lang="ts">
  import Bottom from "./Components/Bottom.svelte";
  import Top from "./Components/Top.svelte";
  import "./css/main.css";
  import { Runtime } from "./ts/runtime";

  export let runtime: Runtime;

  const { Progress } = runtime;
</script>

{#if $Progress}
  <Top {runtime} />
  <Bottom {runtime} />
{/if}
