<template>
  <div class="fdz-header">
    <FdzLogo />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import FdzLogo from '../components/FdzLogo.vue'

@Component({
  components: {
    FdzLogo
  }
})
export default class FdzHeader extends Vue {

}
</script>

<style scoped lang="scss">
@import '@/styles/FdzStyles';

.fdz-header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  padding: 0 16px;
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: $colourWhite;
  z-index: 1;
}

</style>
