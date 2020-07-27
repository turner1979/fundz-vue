<template>
  <div class="fdz-content-container">
    <div class="fdz-content-container__inner">
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts">
export default {

}
</script>

<style scoped lang="scss">
@import '@/styles/fdz-styles';

.fdz-content-container {
  padding: 76px 16px 32px 16px;
  min-height: 100%;
  background: $colourGallery;

  .fdz-content-container__inner {
    margin: 0 auto;
    max-width: 1200px;
  }
}
</style>
