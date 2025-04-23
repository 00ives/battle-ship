<script lang="ts">
  import { useApp } from '$lib/providers/app';
  import { onDestroy, onMount } from 'svelte';
  import { get, writable } from 'svelte/store';
  import { v4 as uuid } from 'uuid';

  let {
    // boardSize = 10,
    numberOfShips,
    shipConfig,
  }: {
    numberOfShips: Number;
    shipConfig: Record<string, string | number>[];
  } = $props();

  const {
    services: { setupService },
  } = useApp();

  const { gameConfigTest } = setupService;
  let boardSize = gameConfigTest.value.boardSize;
  $inspect(gameConfigTest).with((type, gameConfigTest) => {
    if (type === 'update') {
      console.log(1111, 'gameConfigTest', { gameConfigTest });
    }
  });

  let defendingGridSquares = $derived.by(() => {
    return Array.from(
      {
        length: gameConfigTest.value.boardSize * gameConfigTest.value.boardSize,
      },
      (v, i) => ({
        id: uuid(),
        value: i + 1,
        hit: false,
        occupied: Math.random() * 10 >= 7,
      }),
    );
  });

  $inspect(defendingGridSquares).with((type, defendingGridSquaresTest) => {
    if (type === 'update') {
      console.log(1111, 'defendingGridSquaresTest', {
        defendingGridSquaresTest,
      });
    }
  });

  let attackingGridSquares = $derived.by(() => {
    return Array.from(
      {
        length: gameConfigTest.value.boardSize * gameConfigTest.value.boardSize,
      },
      (v, i) => ({
        id: uuid(),
        value: i + 1,
        hit: false,
        occupied: Math.random() * 10 >= 7,
      }),
    );
  });

  const handleDefenseClick = (
    e: Event,
    defenseSquare: Record<string, unknown>,
  ) => {
    const updatedSquares = defendingGridSquares.map((square) => {
      if (square.id === defenseSquare.id) {
        return { ...square, hit: true };
      }
      return square;
    });
    console.log(
      '👽 ~ :53 ~ defenseBoard.update ~ updatedSquares:',
      updatedSquares,
    );
    defendingGridSquares = [...updatedSquares];
  };

  const handleAttackClick = (
    e: Event,
    attackSquare: Record<string, unknown>,
  ) => {
    const updatedSquares = attackingGridSquares.map((square) => {
      if (square.id === attackSquare.id) {
        return { ...square, hit: true };
      }
      return square;
    });
    console.log(
      '👽 ~ :77 ~ defenseBoard.update ~ updatedSquares:',
      updatedSquares,
    );
    attackingGridSquares = [...updatedSquares];
  };
</script>

<div
  class="flex flex-row justify-center items-center w-full h-1/2 bg-emerald-700 border-indigo-900 border-2"
>
  <div class=" flex flex-col justify-center items-center h-full w-1/2 gap-2">
    <div
      class="grid grid-rows-6 grid-cols-6 bg-indigo-200 border-b-blue-950 border-2 w-1/2 h-1/2 gap-4"
    >
      {#each defendingGridSquares as defenseSquare (defenseSquare.id)}
        <button
          onclick={(e: Event) => {
            handleDefenseClick(e, defenseSquare);
          }}
          id={defenseSquare.id}
          type="button"
          class="w-auto h-auto bg-indigo-100 border-b-blue-950 border-2 rounded"
          >{!defenseSquare.hit
            ? ''
            : defenseSquare.occupied
              ? 'O'
              : 'X'}</button
        >
      {/each}
    </div>
    <div
      class="grid grid-rows-6 grid-cols-6 bg-indigo-400 border-b-blue-950 border-2 w-1/2 h-1/2 gap-4"
    >
      {#each attackingGridSquares as attackSquare (attackSquare.id)}
        <button
          onclick={(e: Event) => {
            handleAttackClick(e, attackSquare);
          }}
          id={attackSquare.id}
          type="button"
          class="w-auto h-auto bg-indigo-300 border-b-blue-950 border-2 rounded"
          >{!attackSquare.hit ? '' : attackSquare.occupied ? 'O' : 'X'}</button
        >
      {/each}
    </div>
  </div>
</div>
