<script lang="ts">
  import GameboardContainer from '$lib/components/gameboard/GameboardContainer.svelte';
  import Setup from '$lib/components/Setup/setup.svelte';
  import { useApp } from '$lib/providers/app';

  const { setupService } = useApp().services;
</script>

<Setup />

<GameboardContainer
  numberOfShips={2}
  shipConfig={[
    { id: 1, x: 'a', y: '1', direction: 'horizontal' },
    { id: 2, x: 'a', y: '1', direction: 'vertical' },
  ]}
/>
