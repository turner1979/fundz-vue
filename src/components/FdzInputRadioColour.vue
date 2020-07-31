<template>
  <div class="fdz-input-colour">

    <label
      class="fdz-input-colour__option"
      :style="{ background: colour.colour }">
        <i v-if="colour.colour === value.colour" class="fas fa-check"></i>
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
import { FdzColourModel } from '../models'

@Component
export default class FdzInputColour extends Vue {
  @Prop() colour!: FdzColourModel;
  @Prop() name!: string;
  @Prop() value!: FdzColourModel;

  get radioButtonValue () {
    return this.value
  }

  set radioButtonValue (value: FdzColourModel) {
    this.$emit('change', value)
  }
}
</script>

<style scoped lang="scss">
@import '@/styles/fdz-styles';

.fdz-input-colour {

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
