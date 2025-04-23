<script lang="ts">
  import type { SetupService } from '$lib/components/Setup/setup-service.svelte';
  import { setContext } from 'svelte';
  import { initializeServices } from './initializeServices';

  import type { GameboardContainerService } from '$lib/components/gameboard/gameboard-container-service.svelte';

  const { setupService, gameboardContainerService } = initializeServices();

  setContext<GameboardContainerService>(
    'gameboardContainerService',
    gameboardContainerService,
  );
  setContext<SetupService>('setupService', setupService);
</script>

<slot />
