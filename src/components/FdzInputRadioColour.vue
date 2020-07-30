<template>
  <div class="fdz-input-colour">

    <label
      class="fdz-input-colour__option"
      :style="{ background: colour.colour }">
        <i v-if="colour === value" class="fas fa-check"></i>
        <input
          type="radio"
          :value="colour"
          :name="name"
          v-model="radioButtonValue">
    </label>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import { FdzColour } from '../models/fdz-colour.model'

@Component
export default class FdzInputColour extends Vue {
  @Prop() colour!: FdzColour;
  @Prop() name!: string;
  @Prop() value!: FdzColour;

  get radioButtonValue () {
    return this.value
  }

  set radioButtonValue (value: FdzColour) {
    this.$emit('change', value)
  }
}
</script>

<style scoped lang="scss">
@import '@/styles/fdz-styles';

.fdz-input-colour {
  // display: flex;
  // justify-content: flex-start;
  // align-items: center;

  .fdz-input-colour__option {
    width: 32px;
    height: 32px;
    border-radius: 100%;
    margin-right: 8px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;

    i {
      color: $colourWhite;
    }
  }

  input[type=radio] {
    display: none;
  }

}
</style>
