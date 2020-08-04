<template>
  <div class="fdz-add-contribution-form">
    <form v-if="fund" class="fdz-add-contribution-form__form" @submit.prevent="onAddContribution" autocomplete="off">
      <p><strong>Add Contribution</strong></p>
      <div
        class="fdz-add-contribution-form__form-row"
        :class="{ 'valid' : addContributionFormGroup.controls.date.valid && addContributionFormGroup.controls.date.dirty }">
        <input type="text" name="date" v-model="addContributionFormGroup.controls.date.value" placeholder="Date DD/MM/YYYY" maxlength="10" />
        <template v-if="addContributionFormGroup.controls.date.errors && addContributionFormGroup.controls.date.dirty">
          <template v-if="addContributionFormGroup.controls.date.errors.required">
            <FdzMessage v-bind:options="{
              text: [addContributionFormGroup.controls.date.errors.required.message],
              type: 'error'
            }"></FdzMessage>
          </template>
          <template v-if="addContributionFormGroup.controls.date.errors.dateFormat">
            <FdzMessage v-bind:options="{
              text: [addContributionFormGroup.controls.date.errors.dateFormat.message],
              type: 'error'
            }"></FdzMessage>
          </template>
        </template>
      </div>
      <div
        class="fdz-add-contribution-form__form-row"
        :class="{ 'valid' : addContributionFormGroup.controls.name.valid && addContributionFormGroup.controls.name.dirty }">
        <input type="text" v-model="addContributionFormGroup.controls.name.value" placeholder="Name" maxlength="20" />
        <template v-if="addContributionFormGroup.controls.name.errors && addContributionFormGroup.controls.name.dirty">
          <template v-if="addContributionFormGroup.controls.name.errors.required">
            <FdzMessage v-bind:options="{
              text: [addContributionFormGroup.controls.name.errors.required.message],
              type: 'error'
            }"></FdzMessage>
          </template>
        </template>
      </div>
      <div
        class="fdz-add-contribution-form__form-row"
        :class="{ 'valid' : addContributionFormGroup.controls.amount.valid && addContributionFormGroup.controls.amount.dirty }">
        <input type="text" v-model="addContributionFormGroup.controls.amount.value" placeholder="Amount" maxlength="10" />
        <template v-if="addContributionFormGroup.controls.amount.errors && addContributionFormGroup.controls.amount.dirty">
          <template v-if="addContributionFormGroup.controls.amount.errors.required">
            <FdzMessage v-bind:options="{
              text: [addContributionFormGroup.controls.amount.errors.required.message],
              type: 'error'
            }"></FdzMessage>
          </template>
          <template v-if="addContributionFormGroup.controls.amount.errors.digit">
            <FdzMessage v-bind:options="{
              text: [addContributionFormGroup.controls.amount.errors.digit.message],
              type: 'error'
            }"></FdzMessage>
          </template>
          <template v-if="addContributionFormGroup.controls.amount.errors.maxNumber">
            <FdzMessage v-bind:options="{
              text: [addContributionFormGroup.controls.amount.errors.maxNumber.message],
              type: 'error'
            }"></FdzMessage>
          </template>
        </template>
      </div>
      <FdzButton v-bind:options="{ text: 'Add', type: 'Submit' }" />
    </form>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Mixins } from 'vue-property-decorator'
import { IFormGroup, RxFormBuilder, minLength, maxLength, required, digit, pattern, FormBuilderConfiguration } from '@rxweb/reactive-forms'
import FdzButton from '../components/FdzButton.vue'
import FdzMessage from '../components/FdzMessage.vue'
import FdzFundMixin from '../mixins/FdzFundMixin.vue'
import { FdzFundModel, FdzMessageModel } from '../models'

class AddContributionForm {
  @required({ message: 'Amount is required' })
  @digit({ message: 'Must be number (whole numbers only)' })
  @minLength({ value: 1 })
  @maxLength({ value: 10 })
  amount!: string

  @required({ message: 'Date is required' })
  @pattern({
    expression: { dateFormat: /^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/ },
    message: 'Must be valid date in DD/MM/YYYY format'
  })
  date!: string

  @required({ message: 'Name is required' })
  name!: string
}

@Component({
  components: {
    FdzButton,
    FdzMessage
  }
})
export default class FdzAddFundContributionForm extends Mixins(FdzFundMixin) {
  @Prop() fund!: FdzFundModel

  addContributionFormGroup!: IFormGroup<AddContributionForm>
  addContributionSuccessMessageVisible = false;
  addContributionSuccessMessageOptions: FdzMessageModel = { text: ['Contribution added successfully'], type: 'success' }
  formBuilder: RxFormBuilder = new RxFormBuilder()
  formBuilderConfig = new FormBuilderConfiguration()

  constructor () {
    super()
    if (typeof this.fund !== 'undefined') {
      this.formBuilderConfig.dynamicValidation = {
        amount: {
          maxNumber: {
            value: this.fund.target - this.fund.current,
            message: `Max contribution amount must be £${this.fund.target - this.fund.current} or less`
          }
        }
      }
      this.addContributionFormGroup = this.formBuilder.formGroup(
        AddContributionForm,
        this.formBuilderConfig
      ) as IFormGroup<AddContributionForm>
    }
  }

  onAddContribution () {
    if (this.addContributionFormGroup.valid) {
      this.$emit('adding-contribution', true)
      this.addContribution(this.fund, {
        amount: parseInt(this.addContributionFormGroup.controls.amount.value, 10),
        date: this.addContributionFormGroup.controls.date.value,
        name: this.addContributionFormGroup.controls.name.value
      }).then(() => {
        this.addContributionSuccessMessageVisible = true
        this.$emit('adding-contribution', false)
        this.$emit('added-contribution', true)
      }).catch(() => {
        // Real world app would display error message in the UI if promise is rejected
        console.log('an error occurred')
      })
    }
  }

  onAddContributionSuccess () {
    this.addContributionSuccessMessageVisible = false
  }
}
</script>

<style scoped lang="scss">
@import '@/styles/FdzStyles';

.fdz-add-contribution-form {

  p {
    @include fdz-font(14);

    strong {
      @include fdz-font(14, $colourMineShaft, 600)
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

  .fdz-add-contribution-form__form {
    width: 100%;
    max-width: 500px;

    .fdz-add-contribution-form__form-row {
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

  .fdz-add-contribution-form__msg + a {
    margin-top: 16px;
  }

}
</style>
