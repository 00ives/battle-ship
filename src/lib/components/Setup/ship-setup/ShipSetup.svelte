<script lang="ts">
  /**
        Player 1 i want to have it state to place a ship 
        - it needs to have a direction (horizontal, vertical, diagonal[later])
        - it should have a size of ship
        - it should be in bounds 
    */
</script>

<div class={'flex flex-col h-auto w-auto p-10 bg-amber-50'}>
  <label for="shipDirection">Ship Direction</label>
  <select class={'border-1 rounded-sm w-fit'} name="shipDirection">
    <option>Horizontal</option>
    <option>Vertical</option>
  </select>
  <div class={''}>
    <label for="ship-length">Length of ship</label>
    <input id="2" name="ship-length" type="radio" />
    <label for="ship-length">2 units</label>
    <input id="3" name="ship-length" type="radio" />
    <label for="ship-length">3 units</label>
    <input id="4" name="ship-length" type="radio" />
    <label for="ship-length">4 units</label>
  </div>
  <!-- it want this to by dynamic,
    try to get it so that the direction based on the
     size of ship will  -->
  <!-- or make it so that when the user clicks on a square 
     it will change the colors of the background if the
      config is not proper then warn the user when they
       click with a toast that they must finish configuring  -->
  <!-- <select> </select> -->
</div>
