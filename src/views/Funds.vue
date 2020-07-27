<template>
  <div class="fdz-funds">
    <FdzHeader />
    <FdzContentContainer>
      <FdzVersion />
    </FdzContentContainer>
  </div>
</template>

<script lang="ts">
import FdzContentContainer from '../components/FdzContentContainer.vue'
import FdzHeader from '../components/FdzHeader.vue'
import FdzVersion from '../components/FdzVersion.vue'

export default {
  name: 'Funds',
  components: {
    FdzContentContainer,
    FdzHeader,
    FdzVersion
  }
}
</script>

<style scoped lang="scss">
@import '@/styles/fdz-styles';

.fdz-funds {
  height: 100%;
}
</style>
