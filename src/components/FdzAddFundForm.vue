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
      <div class="fdz-add-fund-colours">
        <FdzInputRadioColour
          v-for="colour in colours"
          :key="colour.colour"
          name="colour"
          v-bind:colour="colour"
          :value="addFundFormGroup.controls.fundColour.value" @change="changeColour" />
      </div>
    </div>
    <FdzButton v-bind:options="submitButtonOptions" />
  </form>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { IFormGroup, RxFormBuilder, minLength, required, digit } from '@rxweb/reactive-forms'
import { FDZ_COLOURS } from '../config'
import FdzButton from '../components/FdzButton.vue'
import FdzInputRadioColour from '../components/FdzInputRadioColour.vue'
import FdzMessage from '../components/FdzMessage.vue'
import { FdzFundService, FdzTokenService } from '../services'
import { FdzButtonModel, FdzColourModel } from '../models'

const fundService = new FdzFundService()
const tokenService = new FdzTokenService()

class AddFundFormModel {
  @required({ message: 'Fund name is required' })
  @minLength({ value: 2, message: 'Must be at least 2 characters long.' })
  fundName!: string

  @required({ message: 'Fund Target is required' })
  @minLength({ value: 1, message: 'Must be at least 1 character long.' })
  @digit({ message: 'Must be number (whole numbers only)' })
  fundTarget!: string

  @required() fundColour: FdzColourModel = FDZ_COLOURS[0]
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
    this.addFundFormGroup = this.formBuilder.formGroup(AddFundFormModel) as IFormGroup<AddFundFormModel>
  }

  addFundFormGroup: IFormGroup<AddFundFormModel>
  colours: FdzColourModel[] = FDZ_COLOURS;
  formBuilder: RxFormBuilder = new RxFormBuilder()
  selectedValue = '1'
  submitButtonOptions: FdzButtonModel = { text: 'Add', type: 'submit' }

  addFund (): void {
    if (this.addFundFormGroup.valid) {
      fundService.addFund({
        id: tokenService.generateToken(),
        colour: this.addFundFormGroup.controls.fundColour.value,
        current: 0,
        name: this.addFundFormGroup.value.fundName,
        target: parseInt(this.addFundFormGroup.value.fundTarget, 10)
      }).then(() => {
        this.addFundFormGroup.resetForm()
        this.$emit('fund-added', true)
      }).catch(() => {
        // Real world app would display error message in the UI if promise is rejected
        console.log('an error occurred')
      })
    }
  }

  changeColour (newValue: FdzColourModel) {
    this.addFundFormGroup.controls.fundColour.value = newValue
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

  .fdz-add-fund-colours {
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }

  @include breakpoint('small') {
    .fdz-add-fund-form__row {
      min-width: 450px;
    }
  }

}
</style>
