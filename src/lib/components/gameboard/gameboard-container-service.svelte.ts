import { get, writable } from "svelte/store"
import type { SetupService } from "../Setup/setup-service.svelte"

export const createGameboardContainerService = (setupService: SetupService) => {
    //TODO:1111 there has to be an easier way than this
    const gameConfig = get(setupService.gameConfig)
    // const boardSize = writable<number>(gameConfig.boardSize.x)
    const boardSizeTest = $state(gameConfig)




    return { boardSizeTest }
}
export type GameboardContainerService = ReturnType<typeof createGameboardContainerService> 