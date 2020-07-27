<template>
  <div class="fdz-loading">
    <i class="fas fa-2x fa-spinner fa-pulse"></i>
    <p>loading</p>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class FdzLoading extends Vue {

}
</script>

<style scoped lang="scss">
@import '@/styles/fdz-styles';

.fdz-loading {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  i {
    color: $colourMineShaft;
  }

  p {
    @include fdz-font(14);
  }

}
</style>
