<template>
  <div class="fdz-edit-fund-form">
    <template v-if="editFundSuccessMessageVisible">
      <fdz-message class="fdz-edit-fund-form__msg" v-bind:options="editFundSuccessMessageOptions"></fdz-message>
      <a @click="onEditFundSuccessBack">Back To Form</a>
    </template>
    <template v-else>
      <template v-if="loading">
        <FdzLoading />
      </template>
      <template v-else>
        <form class="fdz-edit-fund-form__form" @submit.prevent="editFund" autocomplete="off">
        <p><strong>Edit Fund</strong></p>
        <div
          class="fdz-edit-fund-form__form-row"
          :class="{ 'valid' : editFundFormGroup.controls.fundName.valid }">
          <input type="text" name="fundName" v-model="editFundFormGroup.controls.fundName.value" :placeholder="fund.name" />
          <FdzMessage
            v-if="editFundFormGroup.controls.fundName.invalid"
            v-bind:options="fundNameErrorMessageOptions"></FdzMessage>
        </div>
        <div
          class="fdz-edit-fund-form__form-row"
          :class="{ 'valid' : editFundFormGroup.controls.fundTarget.valid }">
          <input type="text" name="fundTarget" v-model="editFundFormGroup.controls.fundTarget.value" :placeholder="fund.target" maxlength="10" />
          <fdz-message
            v-if="editFundFormGroup.controls.fundTarget.invalid && editFundFormGroup.controls.fundTarget.dirty"
            v-bind:options="fundTargetErrorMessageOptions"></fdz-message>
          <FdzMessage v-if="editFundFormGroup.controls.fundTarget.invalid" v-bind:options="{
              text: ['Target must be greater or equal to fund contributions of £XXX'],
              type: 'error'
            }"></FdzMessage>
        </div>
        <div class="fdz-edit-fund-form__form-row">
          <div class="fdz-edit-fund-colours">
            <FdzInputRadioColour
              v-for="colour in colours"
              :key="colour.colour"
              name="colour"
              v-bind:colour="colour"
              :value="editFundFormGroup.controls.fundColour.value"
              @change="changeColour" />
          </div>
        </div>
        <FdzButton v-bind:options="editSubmitButtonOptions" />
      </form>
      </template>
    </template>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import { IFormGroup, RxFormBuilder, minLength, required, digit, FormBuilderConfiguration } from '@rxweb/reactive-forms'
import { FDZ_COLOURS } from '../config'
import FdzButton from '../components/FdzButton.vue'
import FdzInputRadioColour from '../components/FdzInputRadioColour.vue'
import FdzLoading from '../components/FdzLoading.vue'
import FdzMessage from '../components/FdzMessage.vue'
import { FdzButtonModel, FdzColourModel, FdzMessageModel, FdzFundModel } from '../models'
import { FdzFundService } from '../services'

const fundService = new FdzFundService()

class EditFundFormModel {
  @required({ message: 'Fund name is required' })
  @minLength({ value: 2, message: 'Must be at least 2 characters long.' })
  fundName!: string

  @required({ message: 'Fund Target is required' })
  @minLength({ value: 1, message: 'Must be at least 1 character long.' })
  @digit({ message: 'Must be number (whole numbers only)' })
  fundTarget!: string

  @required() fundColour!: FdzColourModel
}

@Component({
  components: {
    FdzButton,
    FdzInputRadioColour,
    FdzLoading,
    FdzMessage
  }
})
export default class FdzEditFundForm extends Vue {
  @Prop() fund!: FdzFundModel

  loading = false
  colours: FdzColourModel[] = FDZ_COLOURS;
  editFundFormGroup!: IFormGroup<EditFundFormModel>
  editFundSuccessMessageOptions: FdzMessageModel = { text: ['Fund details edited successfully'], type: 'success' }
  editFundSuccessMessageVisible = false
  editSubmitButtonOptions: FdzButtonModel = { text: 'Edit', type: 'submit' }
  formBuilder: RxFormBuilder = new RxFormBuilder()
  formBuilderConfig = new FormBuilderConfiguration()
  fundNameErrorMessageOptions: FdzMessageModel = { text: ['Must be at least 1 characters long.'], type: 'error' };
  fundTargetErrorMessageOptions: FdzMessageModel = {
    text: [
      'Must be at least 1 characters long.',
      'Must be number (whole numbers only)'
    ],
    type: 'error'
  }

  constructor () {
    super()
    if (typeof this.fund !== 'undefined') {
      this.formBuilderConfig.propsConfig = {
        fundName: { defaultValue: this.fund.name },
        fundTarget: { defaultValue: this.fund.target },
        fundColour: { defaultValue: this.fund.colour }
      }
      this.editFundFormGroup = this.formBuilder.formGroup(
        EditFundFormModel,
        this.formBuilderConfig
      ) as IFormGroup<EditFundFormModel>
    }
  }

  changeColour (newValue: FdzColourModel) {
    this.editFundFormGroup.controls.fundColour.setValue(newValue)
    this.editFundFormGroup.updateValueAndValidity()
  }

  editFund () {
    if (this.editFundFormGroup.valid) {
      this.loading = true
      fundService.editFund(
        this.fund,
        this.editFundFormGroup.controls.fundColour.value,
        this.editFundFormGroup.controls.fundName.value,
        this.editFundFormGroup.controls.fundTarget.value
      ).then(() => {
        this.loading = false
        this.editFundSuccessMessageVisible = true
      }).catch(() => {
        // Real world app would display error message in the UI if promise is rejected
        console.log('an error occurred')
      })
    }
  }

  onEditFundSuccessBack () {
    this.editFundSuccessMessageVisible = false
  }
}
</script>

<style scoped lang="scss">
@import '@/styles/fdz-styles';

.fdz-edit-fund-form {

  .fdz-edit-fund-form__form {
    width: 100%;
    max-width: 500px;
  }

  p {
    @include fdz-font(14);
    margin: 0 0 16px 0;

    strong {
      @include fdz-font(14, #222, 600);
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

  .fdz-edit-fund-form__form-row {
    margin-bottom: 16px;
    @include formInput();
  }

  .fdz-edit-fund-colours {
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }

  .fdz-edit-fund-form__msg + a {
    margin-top: 16px;
  }

}
</style>
