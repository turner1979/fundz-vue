<template>
  <div class="fdz-input-colour">

    <label class="radio">
      <input type="radio" :value="label" :name="name" v-model="radioButtonValue">
      <span>{{ label }}</span>
    </label>

  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import { FdzColour } from '../models/fdz-colour.model'

@Component
export default class FdzInputColour extends Vue {
  @Prop() label!: string;
  @Prop() name!: string;
  @Prop() value!: string;

  get radioButtonValue() {
    return this.value
  }

  set radioButtonValue(label: string) {
    this.$emit('change', label)
  }
}
</script>

<style scoped lang="scss">
@import '@/styles/fdz-styles';
/*
.fdz-input-colour {
  display: flex;
  justify-content: flex-start;
  align-items: center;

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
*/
</style>
