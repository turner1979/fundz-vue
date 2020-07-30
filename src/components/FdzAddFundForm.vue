<template>
  <div class="fdz-add-fund-form">
    <form  @submit.prevent="addFund" autocomplete="off">
    <p><strong>Add New Fund</strong></p>
    <div class="fdz-add-fund-form__row">
      <input
        type="text"
        name="fundName"
        placeholder="Name"
        maxlength="20"
        v-model="addFundFormGroup.props.fundName" />
      <FdzMessage
        v-if="addFundFormGroup.controls.fundName.errors && addFundFormGroup.controls.fundName.dirty"
        v-bind:options="{ text: [addFundFormGroup.controls.fundName.errorMessage], type: 'error' }" />
    </div>
    <div class="fdz-add-fund-form__row">
      <input
        type="text"
        name="fundTarget"
        placeholder="Target"
        maxlength="10"
        v-model="addFundFormGroup.props.fundTarget" />
      <FdzMessage
        v-if="addFundFormGroup.controls.fundTarget.errors && addFundFormGroup.controls.fundTarget.dirty"
        v-bind:options="{ text: [addFundFormGroup.controls.fundTarget.errorMessage], type: 'error' }" />
    </div>
    <div class="fdz-add-fund-form__row">

      <FdzInputRadioColour name="options" label="1" :value="selectedValue" @change="changeValue" />
      <FdzInputRadioColour name="options" label="2" :value="selectedValue" @change="changeValue" />
      <FdzInputRadioColour name="options" label="3" :value="selectedValue" @change="changeValue" />

      {{ selectedValue }}

    </div>
    <FdzButton v-bind:options="submitButtonOptions" />
  </form>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { FDZ_COLOURS } from '../config/fdz-colours'
import FdzButton from '../components/FdzButton.vue'
import FdzInputRadioColour from '../components/FdzInputRadioColour.vue'
import FdzMessage from '../components/FdzMessage.vue'
import { FdzButtonModel } from '../models/fdz-button.model'
import { FdzFundService } from '../services/fdz-fund.service'
import { IFormGroup, RxFormBuilder, minLength, required, digit } from '@rxweb/reactive-forms'
import { FdzColour } from '../models/fdz-colour.model'

const fundService = new FdzFundService()

class NewFund {
  @required({ message: 'Fund name is required' })
  @minLength({ value: 2, message: 'Must be at least 2 characters long.' })
  fundName!: string

  @required({ message: 'Fund Target is required' })
  @minLength({ value: 1, message: 'Must be at least 1 character long.' })
  @digit({ message: 'Must be number (whole numbers only)' })
  fundTarget!: string
}

@Component({
  components: {
    FdzButton,
    FdzInputRadioColour,
    FdzMessage
  }
})
export default class FdzAddFundForm extends Vue {
  constructor () {
    super()
    this.addFundFormGroup = this.formBuilder.formGroup(NewFund) as IFormGroup<NewFund>
  }

  addFundFormGroup: IFormGroup<NewFund>
  colours: FdzColour[] = FDZ_COLOURS;
  formBuilder: RxFormBuilder = new RxFormBuilder()
  selectedValue = '1'
  submitButtonOptions: FdzButtonModel = { text: 'Add', type: 'submit' }

  addFund (): void {
    if (this.addFundFormGroup.valid) {
      // TODO: create token service
      const token = Math.random().toString(36).substr(2)
      fundService.addFund({
        id: token,
        colour: { name: 'redSalsa', colour: '#F94144' },
        current: 0,
        name: this.addFundFormGroup.value.fundName,
        target: parseInt(this.addFundFormGroup.value.fundTarget, 10)
      }).then(() => {
        this.addFundFormGroup.resetForm()
        this.$emit('fund-added', true)
      }).catch(() => {
        // TODO: add error message to ui
        console.log('an error occurred')
      })
    }
  }

  changeValue (newValue: string) {
    this.selectedValue = newValue
  }
}
</script>

<style scoped lang="scss">
@import '@/styles/fdz-styles';

.fdz-add-fund-form {

  p {
    @include fdz-font(14);
    margin: 0 0 16px 0;
  }

  .fdz-add-fund-form__row {
    margin-bottom: 16px;
    min-width: 250px;
    @include formInput();
  }

  @include breakpoint('small') {
    .fdz-add-fund-form__row {
      min-width: 450px;
    }
  }

}
</style>
