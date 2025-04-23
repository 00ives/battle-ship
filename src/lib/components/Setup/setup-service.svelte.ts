import { writable } from "svelte/store";

type GameConfig = {
  playerInfo: {
    name: string;
  };
  playerStats?: {
    wins: number;
    losses: number;
    ties: number;
  };
  numberOfShips: number;
  opponentType: string;
  boardSize: number;
  numberOfSquares: number;
};

export const createSetupService = () => {

  const getDefaultGameConfig = (): GameConfig => ({



    playerInfo: {
      name: '',
    },
    playerStats: {
      wins: 0,
      losses: 0,
      ties: 0,
    },
    numberOfShips: 2,
    opponentType: 'computer',
    boardSize: 6,
    numberOfSquares: 36
  }
  );
  const gameConfig = writable<GameConfig>(getDefaultGameConfig());
  let gameConfigTest = $state({
    value: {
      playerInfo: {
        name: '',
      },
      playerStats: {
        wins: 0,
        losses: 0,
        ties: 0,
      },
      numberOfShips: 2,
      opponentType: 'computer',
      boardSize: 6,
      numberOfSquares: 36,
    }
  })

  // const setPlayerName = (name: string) => {

  //   gameConfigTest = { ...gameConfigTest, playerInfo: { ...gameConfigTest.playerInfo, name } }
  // }

  // const getPlayerName = () => gameConfigTest.playerInfo.name

  const setBoardSize = (value: string) => {
    const numberOfSquares = +value
    if (!numberOfSquares && typeof numberOfSquares !== 'number') {
      return
    }
    const sidelength = Math.sqrt(numberOfSquares)

    // gameConfigTest = { ...gameConfigTest, boardSize: { ...gameConfigTest.boardSize, numberOfSquares, x: sidelength, y: sidelength } }
    // gameConfigTest.boardSize = sidelength
    /**
     * getting closer, I need to continue reading the file https://dev.to/mandrasch/svelte-5-share-state-between-components-for-dummies-4gd2
     */
  }

  // const getBoardSize = () => gameConfigTest.boardSize

  $inspect(gameConfigTest);

  return {
    gameConfig,
    gameConfigTest,
    // setPlayerName,
    // getPlayerName,
    // setBoardSize,
    // getBoardSize,
    // get gameConfigTest {
    //   return gameConfigTest
    // }
  }
}

export type SetupService = ReturnType<typeof createSetupService>