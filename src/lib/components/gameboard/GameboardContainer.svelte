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

  //need to get the id of the square being hovered and set the hovering prop to true
  let boat = $state([]);

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
        hovering: false,
        showPreview: false,
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
        hovering: false,
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

  let mode = $state('setShips');

  //TODO: remove hardcoding for size of board and make it dynamic when the size of board changes same with the ship length
  //this is where i left off hardcoded values will make the ship show up and not clear when mouse leaves the area
  const displayShipPreview = (
    id: string,
    e: MouseEvent,
    shipLength = 4,
    rowLength = 6,
    shipDirection = 'horizontal'
  ) => {
    const shipStartingIndex = defendingGridSquares.findIndex(
      (square) => square.id === id
    );
    //section for vertical ships
    if (shipDirection === 'vertical') {
      const endIndex = shipStartingIndex + rowLength * (shipLength - 1);
      // console.log(1111, 'display id,e endIndex', { id, e, endIndex });
      let nextSection = 0;

      if (endIndex >= defendingGridSquares.length) {
        console.log(1111, 'toast');
        return;
      }

      const placeholderShip = defendingGridSquares.map((square, index) => {
        if (
          index === shipStartingIndex + rowLength * nextSection &&
          shipStartingIndex + rowLength * nextSection <
            defendingGridSquares.length &&
          nextSection < shipLength
        ) {
          nextSection++;
          return { ...square, showPreview: true };
        }
        return { ...square };
      });

      // console.log(1111, 'placeholderShip', placeholderShip);

      defendingGridSquares = [...placeholderShip];
    }
    //section for horizontal ships
    if (shipDirection === 'horizontal') {
      const endIndex = shipStartingIndex + shipLength;
      //if endIndex is greater then the  row length toast

      //map the next ship size of values and set showPreview to true
      let nextSection = 0;
      console.log(
        1111,
        'rowLength * Math.floor(shipStartingIndex / rowLength) + 1',
        {
          endIndex,
          rowLength,
          calc: rowLength * (Math.floor(shipStartingIndex / rowLength) + 1),
        }
      );
      if (
        endIndex >
        rowLength * (Math.floor(shipStartingIndex / rowLength) + 1)
      ) {
        console.log(1111, 'returned');
        return;
      }
      const placeholderShip = defendingGridSquares.map((square, index) => {
        if (
          index === shipStartingIndex + nextSection &&
          index < shipStartingIndex + shipLength
        ) {
          nextSection++;
          return { ...square, showPreview: true };
        }
        return { ...square };
      });
      defendingGridSquares = [...placeholderShip];
    }
  };

  const clearShipPreview = (id: string, e: MouseEvent) => {
    // console.log(1111, 'clear id,e', id, e);

    const shipStartIndex = attackingGridSquares.findIndex(
      (square) => square.id === id
    );
    const clearedSquares = defendingGridSquares.map((square) => ({
      ...square,
      showPreview: false,
    }));

    defendingGridSquares = [...clearedSquares];
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
        {@const id = defenseSquare.id}
        <button
          onclick={(e: Event) => {
            handleDefenseClick(e, defenseSquare);
          }}
          onmouseenter={(e: MouseEvent) => {
            if (mode === 'setShips') {
              displayShipPreview(id, e);
            }
          }}
          onmouseleave={(e: MouseEvent) => {
            clearShipPreview(id, e);
          }}
          id={defenseSquare.id}
          type="button"
          class={classNames(
            'flex items-center justify-center w-5 h-5  border-b-blue-950 border-2 rounded hover:bg-rose-300 ',
            {
              'bg-black opacity-60': defenseSquare.showPreview,
              'bg-indigo-100': !defenseSquare.showPreview,
            }
          )}
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
          class="flex items-center justify-center w-5 h-5 bg-indigo-300 border-b-blue-950 border-2 rounded hover:bg-rose-300"
          >{!attackSquare.hit ? '' : attackSquare.occupied ? 'O' : 'X'}</button
        >
      {/each}
    </div>
  </div>
</div>
