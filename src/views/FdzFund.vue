<template>
  <div class="fdz-fund">
    <FdzHeader />
    <FdzContentContainer>
      <FdzVersion class="fdz-fund__version" />
      <div class="fdz-fund__controls">
        <FdzIcon iconClass="fas fa-chevron-left" @click.native="onBackClick" />
      </div>
      <FdzFundCard v-bind:fund="fund" :show-edit="false" @delete-fund="onDeleteFund($event)">
        <FdzLoading v-if="loading" />
        <FdzFundProgress v-else v-bind:fund="fund" />
        <FdzTabs v-bind:options="tabOptions" @tab-change="onTabChange($event)">

          <template v-if="tabOptions.activeIndex === 0">
            <!-- TODO: create overview component (contributions table) -->
            <p><strong>Contributions</strong></p>
            <template v-if="fund.contributions">
              <table>
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Name</th>
                    <th>Amount</th>
                  </tr>
                </thead>
                <tbody>
                  <tr *ngFor="let contribution of fund.contributions">
                    <td>{{ contribution.date }}</td>
                    <td>{{ contribution.name }}</td>
                    <td>£{{ contribution.amount }}</td>
                  </tr>
                </tbody>
              </table>
            </template>
            <template v-else>
              <FdzMessage v-bind:options="{ text: ['This fund has no contributions yet.'], type: 'info' }"></FdzMessage>
            </template>
          </template>

          <template v-if="tabOptions.activeIndex === 1">
            <FdzEditFundForm v-bind:fund="fund" @editing-fund="setLoadingState($event)" />
          </template>

          <template v-if="tabOptions.activeIndex === 2">
            TODO: Add Contribution Form
          </template>

        </FdzTabs>
      </FdzFundCard>
    </FdzContentContainer>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Mixins } from 'vue-property-decorator'
import VueRouter from 'vue-router'
import FdzButton from '../components/FdzButton.vue'
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
import FdzFundMixin from '../mixins/FdzFund.mixin.vue'

import {
  FdzFundModel,
  FdzTabsModel
} from '../models'

Vue.use(VueRouter)

@Component({
  components: {
    FdzButton,
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

  fund: FdzFundModel = this.getFund(this.id)
  loading = false
  tabOptions: FdzTabsModel = {
    activeIndex: 0,
    tabs: [
      { iconClass: 'fas fa-info-circle', name: 'Overview' },
      { iconClass: 'fas fa-pencil-alt', name: 'Edit' },
      { iconClass: 'fas fa-coins', name: 'Add Contribution' }
    ]
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
}
</script>

<style scoped lang="scss">
@import '@/styles/fdz-styles';

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

  p {
    @include fdz-font(14);

    strong {
      @include fdz-font(14, $colourMineShaft, 600);
    }
  }

  a {
    @include fdz-font(14);
    text-decoration: underline;
    display: inline-block;
    cursor: pointer;

    &:hover {
      text-decoration: none;
    }
  }

  table {
    width: 100%;
    text-align: left;
    border: 1px solid darken($tableBorderColour, 10%);

    thead {
      background: $colourBoulder;
      border: 1px solid $colourBoulder;
      tr {
        th {
          @include fdz-font(14, $colourWhite, 600);
          padding: 8px;
          &:nth-child(3) {
            text-align: right;
          }
        }
      }
    }

    tbody {
      tr {
        background: lighten($tableBorderColour, 10%);
        td {
          @include fdz-font(14);
          padding: 8px;
          &:nth-child(1) {
            width: 25%;
          }
          &:nth-child(2) {
            width: 50%;
          }
          &:nth-child(3) {
            width: 25%;
            text-align: right;
          }
        }

        &:nth-child(even) {
          background: $tableBorderColour;
        }
      }

    }
  }

}
</style>
