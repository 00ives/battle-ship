
import type { GameboardContainerService } from "$lib/components/gameboard/gameboard-container-service.svelte"
import type { SetupService } from "$lib/components/Setup/setup-service.svelte"
import { getContext } from "svelte"

export const useApp = () => ({
    features: '',
    services: {
        setupService: getContext<SetupService>('setupService'),
        gameboardContainerService: getContext<GameboardContainerService>('gameboardContainerService')

    }
})