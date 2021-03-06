<template>
  <div class="fdz-fund-card">
    <div class="fdz-fund-card__top" :style="cardColour">
      <div>
        <p v-if="fund.name">
          <strong>{{ fund.name }}</strong>
        </p>
        <p v-if="fund.target">
          <i class="fas fa-bullseye"></i>
          <span>£{{ formattedTarget }}</span>
        </p>
      </div>
      <div class="fdz-fund-card__actions">
        <div v-if="showEdit" class="fdz-fund-card__action" @click="onEditFund">
          <i class="fas fa-pencil-alt"></i>
        </div>
        <div class="fdz-fund-card__action"  @click="onDeleteFund">
          <i class="fas fa-trash-alt"></i>
        </div>
      </div>
    </div>

    <div class="fdz-fund-card__bottom">
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Mixins } from 'vue-property-decorator'
import FdzNumberFormatterMixin from '../mixins/FdzNumberFormatterMixin.vue'
import { FdzFundModel } from '../models'

@Component
export default class FdzFundCard extends Mixins(FdzNumberFormatterMixin) {
  @Prop() fund!: FdzFundModel;
  @Prop({ default: true }) showEdit!: boolean;

  get formattedTarget () {
    return this.formatCurrency(this.fund.target)
  }

  onEditFund () {
    this.$emit('edit-fund', this.fund)
  }

  onDeleteFund () {
    this.$emit('delete-fund', this.fund)
  }

  get cardColour () {
    return {
      background: this.fund.colour.colour
    }
  }
}
</script>

<style scoped lang="scss">
@import '@/styles/FdzStyles';

.fdz-fund-card {
  background: $colourWhite;
  border-radius: 8px;
  box-shadow: 0px 15px 36px -13px rgba(0,0,0,0.29);

  p {
    @include fdz-font(14, $colourWhite);
    margin: 0;
  }

  .fdz-fund-card__top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
    padding: 16px;

    p:first-child {
      margin-bottom: 8px;
    }

    p:nth-child(2) {
      @include fdz-font(20, $colourWhite);
      display: flex;
      justify-content: flex-start;
      align-items: center;

      span {
        margin-left: 8px;
      }
    }
  }

  .fdz-fund-card__bottom {
    padding: 16px;
  }

  .fdz-fund-card__actions {
    display: flex;
    justify-content: space-between;
    align-items: center;

    .fdz-fund-card__action {
      cursor: pointer;
      width: 36px;
      height: 36px;
      border: 1px solid $colourWhite;
      border-radius: 100%;
      display: flex;
      justify-content: center;
      align-items: center;

      i {
        color: $colourWhite;
      }

      &:hover {
        border: 1px solid $colourMineShaft;
        i {
          color: $colourMineShaft;
        }
      }

      + .fdz-fund-card__action {
        margin-left: 8px;
      }
    }

  }

}
</style>
