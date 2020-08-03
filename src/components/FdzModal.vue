<template>
  <div class="fdz-modal">
    <div class="fdz-modal__overlay"></div>
    <div class="fdz-modal__content">
      <div class="fdz-modal_close" @click="onClose()">
        <FdzIcon iconClass="fas fa-times" />
      </div>
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import FdzIcon from '../components/FdzIcon.vue'

@Component({
  components: {
    FdzIcon
  }
})
export default class FdzModal extends Vue {
  onClose () {
    this.$emit('modalClose', true)
  }
}
</script>

<style scoped lang="scss">
@import '@/styles/FdzStyles';

.fdz-modal {

  .fdz-modal__overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    z-index: 1;
  }

  .fdz-modal_close {
    position: absolute;
    top: -16px;
    right: -16px;
  }

  .fdz-modal__content {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: $colourWhite;
    border-radius: 4px;
    padding: 16px;
    z-index: 2;
  }

  @include breakpoint('small') {
    .fdz-modal__content {
      padding: 32px;
    }
  }

}
</style>
