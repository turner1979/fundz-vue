<template>
  <div class="fdz-tabs">

  <div class="fdz-tabs__tabs" v-if="options.tabs">
    <div
      class="fdz-tabs__tabs-tab"
      v-bind:class="{ 'fdz-tabs__tabs-tab--active' : options.activeIndex === index }"
      v-for="(tab, index) in options.tabs"
      :key="tab.id"
      @click="onTabClick(index);">
        <i v-if="tab.iconClass" :class="tab.iconClass"></i>
        <span>{{ tab.name }}</span>
    </div>
  </div>
  <div class="fdz-tabs__content">
    <slot></slot>
  </div>

</div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import { FdzTabsModel } from '../models/fdz-tabs.model'

@Component
export default class FdzTabs extends Vue {
  @Prop() options!: FdzTabsModel

  onTabClick (index: number): void {
    this.options.activeIndex = index
    this.$emit('tab-change', index)
  }
}
</script>

<style scoped lang="scss">
@import '@/styles/fdz-styles';

$taBg: $colourGallery;
$tabRadius: 4px;

.fdz-tabs {

  .fdz-tabs__tabs {
    display: flex;
    justify-content: flex-start;
    align-items: center;

    .fdz-tabs__tabs-tab {
      border: 1px solid darken($taBg,10%);
      border-right: none;
      background: $taBg;
      padding: 16px;
      cursor: pointer;

      span {
        @include fdz-font(14);
        display: none;
      }

      i + span {
        margin-left: 16px;
      }

      &.fdz-tabs__tabs-tab--active {
        background: $colourWhite;
        border-bottom: 1px solid $colourWhite;
      }

      &:first-child {
        border-top-left-radius: $tabRadius;
      }

      &:last-child {
        border-right: 1px solid darken($taBg,10%);
        border-top-right-radius: $tabRadius;
      }
    }
  }

  .fdz-tabs__content {
    margin-top: -1px;
    border: 1px solid darken($taBg,10%);
    border-top-right-radius: $tabRadius;
    border-bottom-left-radius: $tabRadius;
    border-bottom-right-radius: $tabRadius;
    padding: 16px;
  }

  @include breakpoint('small') {
    .fdz-tabs__tabs {
      .fdz-tabs__tabs-tab span {
        display: inline;
      }
    }
  }
}
</style>
