<script lang="ts">
  let {
    name,
    type,
    player,
  }: { name: string; type: 'human' | 'computer'; player: 1 | 2 } = $props();
</script>

<div>
  <h1>Player {player} {name} setup</h1>
</div>
