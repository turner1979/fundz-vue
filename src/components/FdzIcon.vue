<template>
  <div class="fdz-icon">
    <i :class="iconClass" v-if="iconClass"></i>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'

@Component
export default class FdzIcon extends Vue {
  @Prop() iconClass!: string;
}
</script>

<style scoped lang="scss">
@import '@/styles/FdzStyles';

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
