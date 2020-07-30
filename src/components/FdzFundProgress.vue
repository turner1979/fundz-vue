<template>
  <div class="fdz-fund-progress">
    <div class="fdz-fund-progress__top">
      <FdzFundPill v-bind:options="pillOptions" />
      <p>{{ percentage }}%</p>
    </div>
    <div class="fdz-fund-progress__bar">
      <div class="fdz-fund-progress__bar-current" :style="barStyles"></div>
    </div>
    <div class="fdz-fund-progress__bottom">
      <p>£{{ formattedCurrent }}</p>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Mixins } from 'vue-property-decorator'
import FdzFundPill from '../components/FdzFundPill.vue'
import FdzNumberFormatterMixin from '../mixins/FdzNumberFormatter.mixin.vue'
import { FdzFundModel } from '../models/fdz-fund.model'
import { FdzFundPillModel } from '../models/fdz-fund-pill.model'

@Component({
  components: {
    FdzFundPill
  }
})
export default class FdzFundProgress extends Mixins(FdzNumberFormatterMixin) {
  @Prop() fund!: FdzFundModel;
  percentage = this.getPercentage();

  get barStyles () {
    return {
      background: this.fund.colour.colour,
      width: `${this.percentage}%`
    }
  }

  getPercentage (): number {
    return (100 / this.fund.target) * this.fund.current
  }

  get formattedCurrent () {
    return this.formatCurrency(this.fund.current)
  }

  get pillOptions (): FdzFundPillModel {
    return {
      text: (this.percentage === 100 ? 'Complete' : ((this.percentage > 0) ? 'In Progress' : 'Started'))
    }
  }
}
</script>

<style scoped lang="scss">
@import '@/styles/fdz-styles';

$barHeight: 8px;

.fdz-fund-progress {

  p {
    @include fdz-font(14);
    margin: 0;
  }

  .fdz-fund-progress__top {
    display: flex;
    justify-content: space-between;
    align-items: center;

    p:nth-child(2) {
      @include fdz-font(20, $colourMineShaft, 600);
    }
  }

  .fdz-fund-progress__bar {
    position: relative;
    background: $colourSilver;
    border-radius: $barHeight / 2;
    height: $barHeight;
    margin: 8px 0;

    .fdz-fund-progress__bar-current {
      border-radius: $barHeight / 2;
      height: $barHeight;
    }
  }

  .fdz-fund-progress__bottom {
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }

}
</style>
