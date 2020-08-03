<template>
  <div class="fdz-message" v-if="options" :class="[ 'fdz-message--' + options.type ]">
    <p v-for="(text, index) in options.text" :key="index">{{ text }}</p>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import { FdzMessageModel } from '../models'

@Component
export default class FdzMessage extends Vue {
  @Prop() options!: FdzMessageModel
}
</script>

<style scoped lang="scss">
@import '@/styles/FdzStyles';

$error: $colourWatusi;
$info: $colourFrenchPass;
$success: $colourReef;

.fdz-message {
  @include messageStyle();

  &.fdz-message--error {
    @include messageStyle($error);
  }

  &.fdz-message--info {
    @include messageStyle($info);
  }

  &.fdz-message--success {
    @include messageStyle($success);
  }

}
</style>
