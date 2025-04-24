<script lang="ts">
  import { useApp } from '$lib/providers/app';
  import classNames from 'classnames';
  import { v4 as uuid } from 'uuid';

  let {
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
      })
    );
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
      })
    );
  });

  const handleDefenseClick = (
    e: Event,
    defenseSquare: Record<string, unknown>
  ) => {
    const updatedSquares = defendingGridSquares.map((square) => {
      if (square.id === defenseSquare.id) {
        return { ...square, hit: true };
      }
      return square;
    });
    defendingGridSquares = [...updatedSquares];
  };

  const handleAttackClick = (
    e: Event,
    attackSquare: Record<string, unknown>
  ) => {
    const updatedSquares = attackingGridSquares.map((square) => {
      if (square.id === attackSquare.id) {
        return { ...square, hit: true };
      }
      return square;
    });
    attackingGridSquares = [...updatedSquares];
  };
</script>

<div
  class="flex flex-row justify-center items-center w-full h-auto bg-emerald-700 border-indigo-900 border-2"
>
  <div class=" flex flex-col justify-center items-center h-full w-auto gap-2">
    <div
      class={classNames(
        'grid bg-indigo-200 border-b-blue-950 border-2 w-auto h-1/2 gap-4',
        {
          'grid-rows-6': gameConfigTest.value.boardSize === 6,
          'grid-cols-6': gameConfigTest.value.boardSize === 6,
          'grid-rows-8': gameConfigTest.value.boardSize === 8,
          'grid-cols-8': gameConfigTest.value.boardSize === 8,
          'grid-rows-10': gameConfigTest.value.boardSize === 10,
          'grid-cols-10': gameConfigTest.value.boardSize === 10,
        }
      )}
    >
      {#each defendingGridSquares as defenseSquare (defenseSquare.id)}
        <button
          onclick={(e: Event) => {
            handleDefenseClick(e, defenseSquare);
          }}
          id={defenseSquare.id}
          type="button"
          class="flex items-center justify-center w-5 h-5 bg-indigo-100 border-b-blue-950 border-2 rounded"
          >{!defenseSquare.hit
            ? ''
            : defenseSquare.occupied
              ? 'O'
              : 'X'}</button
        >
      {/each}
    </div>
    <div
      class={classNames(
        'grid  bg-indigo-400 border-b-blue-950 border-2 w-auto h-1/2 gap-4',
        {
          'grid-rows-6': gameConfigTest.value.boardSize === 6,
          'grid-cols-6': gameConfigTest.value.boardSize === 6,
          'grid-rows-8': gameConfigTest.value.boardSize === 8,
          'grid-cols-8': gameConfigTest.value.boardSize === 8,
          'grid-rows-10': gameConfigTest.value.boardSize === 10,
          'grid-cols-10': gameConfigTest.value.boardSize === 10,
        }
      )}
    >
      {#each attackingGridSquares as attackSquare (attackSquare.id)}
        <button
          onclick={(e: Event) => {
            handleAttackClick(e, attackSquare);
          }}
          id={attackSquare.id}
          type="button"
          class="flex items-center justify-center w-5 h-5 bg-indigo-300 border-b-blue-950 border-2 rounded"
          >{!attackSquare.hit ? '' : attackSquare.occupied ? 'O' : 'X'}</button
        >
      {/each}
    </div>
  </div>
</div>
