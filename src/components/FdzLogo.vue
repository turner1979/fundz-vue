<template>
  <div class="fdz-logo" v-bind:class="{ 'fdz-logo--alt' : alt }">
    <div class="fdz-logo__text">
      <h1>fundz</h1>
    </div>
    <div class="fdz-logo__colours">
      <div
        class="fdz-logo__colour"
        v-for="colour in colours"
        :key="colour.name"
        v-bind:style="{ background: colour.colour }"></div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import { FDZ_COLOURS_CONFIG } from '../config'

@Component
export default class FdzLogo extends Vue {
  @Prop() alt!: boolean;
  colours = FDZ_COLOURS_CONFIG;
}
</script>

<style scoped lang="scss">
@import '@/styles/FdzStyles';

.fdz-logo {
  .fdz-logo__text {
    display: flex;
    justify-content: center;
    align-items: center;

    h1 {
      @include fdz-font(16, $colourMineShaft, 600);
      margin: 0;
    }
  }

  .fdz-logo__colours {
    display: flex;
    justify-content: center;
    align-items: center;

    .fdz-logo__colour {
      width: 20px;
      height: 4px;
    }
  }

  &.fdz-logo--alt {
    .fdz-logo__text {
      h1 {
        @include fdz-font(32, $colourMineShaft, 600);
      }
    }
  }
}
</style>
