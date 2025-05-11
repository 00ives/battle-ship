<script lang="ts">
  import GameboardContainer from '$lib/components/gameboard/GameboardContainer.svelte';
  import Setup from '$lib/components/Setup/setup.svelte';
  import ShipSetup from '$lib/components/Setup/ship-setup/ShipSetup.svelte';
  import { useApp } from '$lib/providers/app';
  //test
  const { setupService } = useApp().services;
</script>

<Setup />
<div>
  <ShipSetup />
  <GameboardContainer
    numberOfShips={2}
    shipConfig={[
      { id: 1, x: 'a', y: '1', direction: 'horizontal' },
      { id: 2, x: 'a', y: '1', direction: 'vertical' },
    ]}
  />
</div>
