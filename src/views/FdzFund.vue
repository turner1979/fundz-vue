<template>
  <div class="fdz-fund">
    <FdzHeader />
    <FdzContentContainer>
      <FdzVersion class="fdz-fund__version" />
      <div class="fdz-fund__controls">
        <FdzIcon iconClass="fas fa-chevron-left" @click.native="onBackClick" />
      </div>
      <template v-if="fund">
        <FdzFundCard v-bind:fund="fund" :show-edit="false" @delete-fund="onDeleteFund($event)">
          <FdzLoading v-if="loading" />
          <FdzFundProgress v-else v-bind:fund="fund" />
          <FdzTabs v-bind:options="tabOptions" @tab-change="onTabChange($event)">
            <template v-if="tabOptions.activeIndex === 0">
              <FdzContributionsTable v-bind:fund="fund" />
            </template>
            <template v-if="tabOptions.activeIndex === 1">
              <FdzEditFundForm v-bind:fund="fund" @editing-fund="setLoadingState($event)" @edited-fund="activateOverviewTab" />
            </template>
            <template v-if="tabOptions.activeIndex === 2">
              <FdzAddContributionForm v-bind:fund="fund" @adding-contribution="setLoadingState($event)" @added-contribution="activateOverviewTab" />
            </template>
          </FdzTabs>
        </FdzFundCard>
      </template>
      <template v-else>
        <FdzMessage v-bind:options="noFundMessageOptions" />
      </template>
    </FdzContentContainer>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Mixins } from 'vue-property-decorator'
import VueRouter from 'vue-router'
import FdzAddContributionForm from '../components/FdzAddContributionForm.vue'
import FdzButton from '../components/FdzButton.vue'
import FdzContributionsTable from '../components/FdzContributionsTable.vue'
import FdzEditFundForm from '../components/FdzEditFundForm.vue'
import FdzFundCard from '../components/FdzFundCard.vue'
import FdzContentContainer from '../components/FdzContentContainer.vue'
import FdzHeader from '../components/FdzHeader.vue'
import FdzLoading from '../components/FdzLoading.vue'
import FdzIcon from '../components/FdzIcon.vue'
import FdzFundProgress from '../components/FdzFundProgress.vue'
import FdzMessage from '../components/FdzMessage.vue'
import FdzTabs from '../components/FdzTabs.vue'
import FdzVersion from '../components/FdzVersion.vue'
import FdzFundMixin from '../mixins/FdzFundMixin.vue'

import {
  FdzFundModel,
  FdzMessageModel,
  FdzTabsModel
} from '../models'

Vue.use(VueRouter)

@Component({
  components: {
    FdzAddContributionForm,
    FdzButton,
    FdzContributionsTable,
    FdzEditFundForm,
    FdzFundCard,
    FdzContentContainer,
    FdzHeader,
    FdzIcon,
    FdzFundProgress,
    FdzLoading,
    FdzMessage,
    FdzTabs,
    FdzVersion
  }
})
export default class FdzFund extends Mixins(FdzFundMixin) {
  @Prop() id!: string

  fund: FdzFundModel|null = null;
  noFundMessageOptions: FdzMessageModel = { text: [`Fund with id ${this.id} does not exist`], type: 'error' }
  loading = false
  tabOptions: FdzTabsModel = {
    activeIndex: 0,
    tabs: [
      { iconClass: 'fas fa-info-circle', name: 'Overview' },
      { iconClass: 'fas fa-pencil-alt', name: 'Edit' },
      { iconClass: 'fas fa-coins', name: 'Add Contribution' }
    ]
  }

  mounted () {
    this.fund = this.getFund(this.id)
  }

  onBackClick () {
    this.$router.push('/funds')
  }

  onTabChange (index: number): void {
    this.tabOptions.activeIndex = index
  }

  onDeleteFund (fund: FdzFundModel) {
    this.deleteFund(fund).then(() => {
      this.$router.push('/funds')
    }).catch(() => {
      // Real world example would display error message in UI
    })
  }

  setLoadingState (state: boolean) {
    this.loading = state
  }

  activateOverviewTab () {
    this.tabOptions.activeIndex = 0
  }
}
</script>

<style scoped lang="scss">
@import '@/styles/FdzStyles';

$formInputColour: $colourGallery;
$tableBorderColour: $colourGallery;

.fdz-fund {
  height: 100%;

  .fdz-fund__version + .fdz-fund__controls {
    margin-top: 16px;
  }

  .fdz-fund__controls {
    display: flex;
    justify-content: space-between;
    margin-bottom: 16px;
  }

}
</style>
