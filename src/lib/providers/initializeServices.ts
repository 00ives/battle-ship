import { createGameboardContainerService } from "$lib/components/gameboard/gameboard-container-service.svelte"
import { createSetupService } from "$lib/components/Setup/setup-service.svelte"

export const initializeServices = () => {

    const setupService = createSetupService()
    const gameboardContainerService = createGameboardContainerService(setupService)

    return { setupService, gameboardContainerService }

}