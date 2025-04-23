<script lang="ts">
  import ServiceProvider from '$lib/providers/ServiceProvider.svelte';
  import '../app.css';

  let { children } = $props();
</script>

<ServiceProvider>
  {@render children()}
</ServiceProvider>
