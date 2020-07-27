<template>
  <div class="fdz-icon">
    <i :class="iconClass"></i>
  </div>
</template>

<script lang="ts">
export default {
  props: ['iconClass']
}
</script>

<style scoped lang="scss">
@import '@/styles/fdz-styles';

$iconColour: $colourWhite;
$bg: $colourMineShaft;

.fdz-icon {
  background: $bg;
  border-radius: 4px;
  width: 32px;
  height: 32px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  i {
    color: $iconColour;
  }

  &:hover {
    background: lighten($bg, 20%);
  }

}
</style>
