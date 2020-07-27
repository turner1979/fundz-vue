<template>
  <div class="fdz-button" v-if="options">
    <button v-if="options.text && options.type" v-bind:type="options.type">{{ options.text }}</button>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import { FdzButtonModel } from '../models/fdz-button.model'

@Component
export default class FdzButton extends Vue {
  @Prop() options!: FdzButtonModel
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
