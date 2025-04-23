<script lang="ts">
  import Player from './Player.svelte';
  import { useApp } from '$lib/providers/app';

  const {
    services: { setupService },
  } = useApp();

  const { gameConfigTest } = setupService;

  let {} = $props();

  let setupGame = $state(true); //TODO:1111 set to false to run from top

  const handleClick = () => {
    setupGame = !setupGame;
  };

  const handleInput = (e: string) => {
    gameConfigTest.value.playerInfo.name = e;
  };

  const handleOnChangeOpponentType = (e: string) => {
    gameConfigTest.value.opponentType = e;
  };

  const handleNumberOfShipsChange = (e: string) => {
    const numberOfShips = +e;
    if (typeof numberOfShips !== 'number') {
      return;
    }
    gameConfigTest.value.numberOfShips = numberOfShips;
  };

  const handleOnChangeBoardSize = (e: string) => {
    const boardSize = +e;
    if (!boardSize && typeof boardSize !== 'number') {
      return;
    }

    const sideLength = Math.sqrt(boardSize);
    gameConfigTest.value.boardSize = sideLength;
  };
</script>

{#if setupGame === false}
  <button type="button" class=" border-2 rounded-sm px-2" onclick={handleClick}>
    Start
  </button>
{/if}

<div>
  {#if setupGame === true}
    <Player
      name={gameConfigTest.value.playerInfo.name}
      type={'human'}
      player={1}
    />
    <h2>
      <form class="flex flex-col w-1/8">
        <label for="playerName"> Enter Name: </label>
        <input
          oninput={(e) => {
            handleInput(e.currentTarget.value);
          }}
          name="playerName"
          type="text"
          class="flex flex-1 bg-amber-700 border-2 px-2 rounded-sm"
        />

        <label for="numberOfShips"> Select number of ships: </label>
        <select
          name="numberOfShips"
          class="flex w-15 bg-amber-700 border-2 px-2 rounded-sm"
          onchange={(e) => handleNumberOfShipsChange(e.currentTarget.value)}
        >
          <option value={2}>2</option>
          <option value={3}>3</option>
          <option value={4}>4</option>
          <option value={5}>5</option>
        </select>
        <label for="opponent-type"> Select opponent type: </label>
        <div class="flex flex-row">
          <input
            value="player"
            type="radio"
            id="player"
            name="opponent-type"
            class="flex w-1/5 bg-amber-700 border-2 px-2 rounded-sm"
            onchange={(e) => {
              handleOnChangeOpponentType(e.currentTarget.value);
            }}
          />
          <label for="player"> Player </label>
          <input
            value="computer"
            type="radio"
            id="computer"
            name="opponent-type"
            class="flex w-1/5 bg-amber-700 border-2 px-2 rounded-sm"
            onchange={(e) => {
              handleOnChangeOpponentType(e.currentTarget.value);
            }}
          />
          <label for="computer"> Computer </label>
        </div>
        <label for="board-size"> Board size: </label>
        <div class="flex flex-row">
          <input
            value={36}
            type="radio"
            id="sm"
            name="board-size"
            class="flex w-1/5 bg-amber-700 border-2 px-2 rounded-sm"
            onchange={(e) => {
              handleOnChangeBoardSize(e.currentTarget.value);
            }}
          />
          <label for="player"> 6x6 </label>
          <input
            value={64}
            type="radio"
            id="md"
            name="board-size"
            class="flex w-1/5 bg-amber-700 border-2 px-2 rounded-sm"
            onchange={(e) => {
              handleOnChangeBoardSize(e.currentTarget.value);
            }}
          />
          <label for="computer"> 8x8 </label>
          <input
            value={100}
            type="radio"
            id="lg"
            name="board-size"
            class="flex w-1/5 bg-amber-700 border-2 px-2 rounded-sm"
            onchange={(e) => {
              handleOnChangeBoardSize(e.currentTarget.value);
            }}
          />
          <label for="computer"> 10x10 </label>
        </div>
      </form>
    </h2>

    <div class="flex flex-row gap-2">
      <!-- TODO:1111 i want to create next section page, maybe plan out what I want one each page -->
      <!-- <button type="button" class=' border-2 rounded-sm px-2 my-2 ' onclick={handleNext}>
            Next
        </button> -->
      <button
        type="button"
        class=" border-2 rounded-sm px-2 my-2"
        onclick={handleClick}
      >
        Quit
      </button>
    </div>
  {/if}
</div>
