<template>
  <div class="fdz-fund">
    <FdzHeader />
    <FdzContentContainer>
      <FdzVersion class="fdz-fund__version" />
      <div class="fdz-fund__controls">
        <FdzIcon iconClass="fas fa-chevron-left" @click.native="onBackClick" />
      </div>
      <FdzFundCard v-bind:fund="fund" :show-edit="false">
        <FdzFundProgress v-bind:fund="fund" />
        <FdzTabs v-bind:options="tabOptions" @tab-change="onTabChange($event)">

          <template v-if="tabOptions.activeIndex === 0">
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

            <!-- TODO: create edit fund components -->
            <template v-if="editFundSuccessMessageVisible">
              <fdz-message v-bind:options="editFundSuccessMessageOptions"></fdz-message>
              <a @click="onEditFundSuccessButton">Back To Form</a>
            </template>
            <template v-else>
              <form class="fdz-fund__form" @submit.prevent="editFund" autocomplete="off">
                <p><strong>Edit Fund</strong></p>
                <div
                  class="fdz-fund__form-row"
                  :class="{ 'valid' : editFundFormGroup.controls.fundName.valid && editFundFormGroup.controls.fundName.dirty }">
                  <input type="text" name="fundName" v-model="editFundFormGroup.controls.fundName.value" placeholder="fund.name" />
                  <fdz-message
                    v-if="editFundFormGroup.controls.fundName.invalid && editFundFormGroup.controls.fundName.dirty"
                    v-bind:options="fundNameErrorMessageOptions"></fdz-message>
                </div>
                <div
                  class="fdz-fund__form-row"
                  :class="{ 'valid' : editFundFormGroup.controls.fundTarget.valid && editFundFormGroup.controls.fundTarget.dirty }">
                  <input type="text" name="fundTarget" v-model="editFundFormGroup.controls.fundTarget.value" placeholder="fund.target" maxlength="10" />
                  <fdz-message
                    v-if="editFundFormGroup.controls.fundTarget.invalid && editFundFormGroup.controls.fundTarget.dirty"
                    v-bind:options="fundTargetErrorMessageOptions"></fdz-message>
                  <fdz-message v-if="editFundFormGroup.controls.fundTarget.invalid" v-bind:options="{
                      text: ['Target must be greater or equal to fund contributions of £' + editFundFormGroup.controls.fundTarget],
                      type: 'error'
                    }"></fdz-message>
                </div>
                <div class="fdz-fund__form-row">
                  TODO: add input radio colour component
                </div>
                <FdzButton v-bind:options="editSubmitButtonOptions" />
              </form>
            </template>

          </template>

          <template v-if="tabOptions.activeIndex === 2">
            TODO: Add Contribution
          </template>

        </FdzTabs>
      </FdzFundCard>
    </FdzContentContainer>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import VueRouter from 'vue-router'
import { FDZ_COLOURS } from '../config'
import { IFormGroup, RxFormBuilder, minLength, required, digit } from '@rxweb/reactive-forms'
import { FdzFundService } from '../services'
import FdzButton from '../components/FdzButton.vue'
import FdzFundCard from '../components/FdzFundCard.vue'
import FdzContentContainer from '../components/FdzContentContainer.vue'
import FdzHeader from '../components/FdzHeader.vue'
import FdzIcon from '../components/FdzIcon.vue'
import FdzFundProgress from '../components/FdzFundProgress.vue'
import FdzMessage from '../components/FdzMessage.vue'
import FdzTabs from '../components/FdzTabs.vue'
import FdzVersion from '../components/FdzVersion.vue'

import {
  FdzButtonModel,
  FdzFundModel,
  FdzMessageModel,
  FdzTabsModel,
  FdzColourModel
} from '../models'

Vue.use(VueRouter)
const fundService = new FdzFundService()

class NewFund {
  @required({ message: 'Fund name is required' })
  @minLength({ value: 2, message: 'Must be at least 2 characters long.' })
  fundName!: string

  @required({ message: 'Fund Target is required' })
  @minLength({ value: 1, message: 'Must be at least 1 character long.' })
  @digit({ message: 'Must be number (whole numbers only)' })
  fundTarget!: string

  @required() fundColour = FDZ_COLOURS[0]
}

@Component({
  components: {
    FdzButton,
    FdzFundCard,
    FdzContentContainer,
    FdzHeader,
    FdzIcon,
    FdzFundProgress,
    FdzMessage,
    FdzTabs,
    FdzVersion
  }
})
export default class FdzFund extends Vue {
  constructor () {
    super()
    this.editFundFormGroup = this.formBuilder.formGroup(NewFund) as IFormGroup<NewFund>
  }

  @Prop() id!: string

  editFundFormGroup: IFormGroup<NewFund>
  colours: FdzColourModel[] = FDZ_COLOURS;
  formBuilder: RxFormBuilder = new RxFormBuilder()
  addContributionSuccessMessageVisible = false
  editFundSuccessMessageOptions: FdzMessageModel = { text: ['Fund details edited successfully'], type: 'success' }
  editFundSuccessMessageVisible = false
  editSubmitButtonOptions: FdzButtonModel = { text: 'Add', type: 'submit' }
  fund: FdzFundModel = fundService.getFund(this.id)

  tabOptions: FdzTabsModel = {
    activeIndex: 0,
    tabs: [
      { iconClass: 'fas fa-info-circle', name: 'Overview' },
      { iconClass: 'fas fa-pencil-alt', name: 'Edit' },
      { iconClass: 'fas fa-coins', name: 'Add Contribution' }
    ]
  }

  mounted () {
    this.editFundFormGroup.controls.fundName.setValue(this.fund.name)
    this.editFundFormGroup.controls.fundTarget.setValue(this.fund.target)
  }

  onBackClick () {
    this.$router.push('/funds')
  }

  onTabChange (index: number): void {
    this.tabOptions.activeIndex = index
    this.editFundSuccessMessageVisible = false
    this.addContributionSuccessMessageVisible = false
  }

  onEditFundSuccessButton (): void {
    this.editFundSuccessMessageVisible = false
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

  fdz-fund-progress + fdz-tabs {
    ::ng-deep {
      > div {
        margin-top: 16px;
      }
    }
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

  fdz-message + a {
    margin-top: 16px;
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

  .fdz-fund__form {
    width: 100%;
    max-width: 500px;

    .fdz-fund__form-row {
      margin-bottom: 16px;
      @include formInput();
    }

    fdz-message + fdz-button {
      ::ng-deep {
        > div {
          margin-top: 16px;
        }
      }
    }
  }

}
</style>
