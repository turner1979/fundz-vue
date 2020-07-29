<template>
  <div class="fdz-add-fund-form">
    <form autocomplete="off">
    <p><strong>Add New Fund</strong></p>
    <div
      class="fdz-add-fund-form__row"
      :class="{ 'valid' : true }">
        <input type="text" name="fundName" placeholder="Name" maxlength="20" />
        <FdzMessage v-bind:options="fundNameErrorMessageOptions" />
    </div>
    <div
      class="fdz-add-fund-form__row"
      :class="{ 'valid' : false }">
        <input type="text" name="fundTarget" placeholder="Target" maxlength="12" />
        <FdzMessage v-bind:options="fundTargetErrorMessageOptions" />
    </div>
    <div class="fdz-add-fund-form__row">
      TODO: choose colour
    </div>
    <FdzButton v-bind:options="submitButtonOptions" />
  </form>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import FdzButton from '../components/FdzButton.vue'
import FdzMessage from '../components/FdzMessage.vue'
import { FdzButtonModel } from '../models/fdz-button.model'
import { FdzMessageModel } from '../models/fdz-message.model'

@Component({
  components: {
    FdzButton,
    FdzMessage
  }
})
export default class FdzAddFundForm extends Vue {
  fundNameErrorMessageOptions: FdzMessageModel = {
    text: [
      'Must be at least 2 characters long.'
    ],
    type: 'error'
  };

  fundTargetErrorMessageOptions: FdzMessageModel = {
    text: [
      'Must be at least 1 character long.',
      'Must be number (whole numbers only)'
    ],
    type: 'error'
  };

  submitButtonOptions: FdzButtonModel = { text: 'Add', type: 'submit' };
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
