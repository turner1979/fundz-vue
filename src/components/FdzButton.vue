<template>
  <div class="fdz-button">
    <button type="type">{{ text }}</button>
  </div>
</template>

<script lang="ts">
export default {
  props: {
    text: String,
    type: String
  }
}
</script>

<style scoped lang="scss">
@import '@/styles/fdz-styles';

.fdz-button {
  width: 100%;

  button {
    width: 100%;
    padding: 12px 16px;
    outline: none;
    border: none;
    background: $colourMineShaft;
    border-radius: 4px;
    cursor:  pointer;
    @include fdz-font(14, $colourWhite);
  }

  &:hover {
    button {
      letter-spacing: 2px;
    }
  }
}
</style>
