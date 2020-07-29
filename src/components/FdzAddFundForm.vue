<template>
  <div class="fdz-add-fund-form">
    <form autocomplete="off">
    <p><strong>Add New Fund</strong></p>
    <div class="fdz-add-fund-form__row">
      <input type="text" name="fundName" placeholder="Name" maxlength="20" v-model="fundName" v-on:keyup="isValidFundName" />
      <FdzMessage v-if="formErrors.fundName" v-bind:options="fundNameErrorMessageOptions" />
    </div>
    <div class="fdz-add-fund-form__row">
      <input
        type="text"
        name="fundTarget"
        placeholder="Target"
        maxlength="12"
        v-model="fundTarget"
        v-on:keyup="isValidFundTarget"
        v-money="moneyConfig" />
      <FdzMessage v-if="formErrors.fundTarget" v-bind:options="fundTargetErrorMessageOptions" />
    </div>
    <div class="fdz-add-fund-form__row">
      TODO: choose colour
    </div>
    <FdzButton v-bind:options="submitButtonOptions" @click.native="addFund" />
  </form>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { VMoney } from 'v-money'
import FdzButton from '../components/FdzButton.vue'
import FdzMessage from '../components/FdzMessage.vue'
import { FdzButtonModel } from '../models/fdz-button.model'
import { FdzMessageModel } from '../models/fdz-message.model'
import { FdzFundService } from '../services/fdz-fund.service'

const fundService = new FdzFundService()

@Component({
  components: {
    FdzButton,
    FdzMessage
  },
  directives: {
    money: VMoney
  }
})
export default class FdzAddFundForm extends Vue {
  formErrors = {
    fundName: false,
    fundTarget: false
  };

  fundName = '';
  fundTarget = '';
  moneyConfig = { thousands: ',', precision: 0 }

  fundNameErrorMessageOptions: FdzMessageModel = {
    text: ['Must be at least 2 characters long.'],
    type: 'error'
  };

  fundTargetErrorMessageOptions: FdzMessageModel = {
    text: ['Must be at least 1 character long.', 'Must be number (whole numbers only)'],
    type: 'error'
  };

  submitButtonOptions: FdzButtonModel = { text: 'Add', type: 'button' };

  addFund (): void {
    if (this.isFormValid()) {
      const rawfundTarget = parseInt(this.fundTarget.split(',').join(''), 10)
      const token = Math.random().toString(36).substr(2)
      fundService.addFund({
        id: token,
        colour: { name: 'redSalsa', colour: '#F94144' },
        current: 0,
        name: this.fundName,
        target: rawfundTarget
      }).then(() => {
        // fund added
        console.log('fund added')
      }).catch(() => {
        // TODO: add error message to ui
        console.log('an error occurred')
      })
    }
  }

  isFormValid (): boolean {
    return Object.keys(this.formErrors).every(k => this.formErrors[k] === false)
  }

  isValidFundName (): void {
    this.formErrors.fundName = !(this.fundName.length >= 2 && this.fundName.length <= 20)
  }

  isValidFundTarget (): void {
    this.formErrors.fundTarget = !(this.fundTarget.length >= 1 && this.fundTarget.length <= 13)
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
