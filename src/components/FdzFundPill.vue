<template>
  <div class="fdz-fund-pill" v-bind:class="[ 'fdz-fund-pill--' + typeClass ]">
    <p v-if="options.text">{{ options.text }}</p>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import { FdzFundPillModel } from '../models/fdz-fund-pill.model'

@Component
export default class FdzFundPill extends Vue {
  @Prop() options!: FdzFundPillModel

  get typeClass (): string {
    return this.options.text.toLowerCase().replace(' ', '-')
  }
}
</script>

<style scoped lang="scss">
@import '@/styles/fdz-styles';

$base: $colourAstra;
$inProgress: $colourFrenchPass;
$complete: $colourReef;

.fdz-fund-pill {
  @include pillStyle();

  &.fdz-fund-pill--in-progress {
    @include pillStyle($inProgress);
  }

  &.fdz-fund-pill--complete {
    @include pillStyle($complete);
  }

}
</style>
