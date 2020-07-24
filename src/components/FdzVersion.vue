<template>
  <div class="fdz-version">
    <div class="fdz-version__logo"></div>
    <p>This version of the fundz app was built with <strong>Vue v?.?.?</strong></p>
  </div>
</template>

<script lang="ts">
export default {

}
</script>

<style scoped lang="scss">
@import '@/styles/fdz-styles';

.fdz-version {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  border-radius: 8px;
  padding: 8px;
  background: $colourWhite;

  .fdz-version__logo {
    background: url(../assets/vue-logo.svg) no-repeat center center;
    width: 64px;
    height: 64px;
  }

  p {
    @include fdz-font(14);
    strong {
      @include fdz-font(14, $colourMineShaft, 600);
    }
  }
}
</style>
