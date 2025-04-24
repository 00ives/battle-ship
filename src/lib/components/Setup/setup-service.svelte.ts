import { writable } from 'svelte/store';

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
    numberOfSquares: 36,
  });
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
    },
  });

  return {
    gameConfig,
    gameConfigTest,
  };
};

export type SetupService = ReturnType<typeof createSetupService>;
