<template>
  <div class="fdz-funds">
    <FdzHeader />
    <FdzContentContainer>
      <FdzVersion class="fdz-funds__version" />
      <div class="fdz-funds__controls">
        <FdzIcon iconClass="fas fa-chevron-left" @click.native="onBackClick" />
        <FdzIcon iconClass="fas fa-plus" @click.native="onSetAddFundModalVisible(true)" />
      </div>
      <FdzModal v-if="addFundModalVisible" @modalClose="onSetAddFundModalVisible(false)">
        modal content
      </FdzModal>
      <FdzLoading></FdzLoading>
    </FdzContentContainer>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import FdzContentContainer from '../components/FdzContentContainer.vue'
import FdzHeader from '../components/FdzHeader.vue'
import FdzIcon from '../components/FdzIcon.vue'
import FdzLoading from '../components/FdzLoading.vue'
import FdzModal from '../components/FdzModal.vue'
import FdzVersion from '../components/FdzVersion.vue'

@Component({
  components: {
    FdzContentContainer,
    FdzHeader,
    FdzIcon,
    FdzLoading,
    FdzModal,
    FdzVersion
  }
})
export default class FdzFunds extends Vue {
  addFundModalVisible = false;

  onBackClick (): void {
    console.log('TODO: route to home view')
  }

  onSetAddFundModalVisible (state: boolean) {
    this.addFundModalVisible = state
  }
}
</script>

<style scoped lang="scss">
@import '@/styles/fdz-styles';

.fdz-funds {
  height: 100%;

  .fdz-funds__version + .fdz-funds__controls {
    margin-top: 16px;
  }

  .fdz-funds__controls {
    display: flex;
    justify-content: space-between;
    margin-bottom: 16px;
  }

  .fdz-funds__grid {
    display: grid;
    column-gap: 16px;
    row-gap: 16px;
    margin-bottom: 32px;
  }

  @include breakpoint('small') {
    .fdz-funds__grid {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  @include breakpoint('medium-large') {
    .fdz-funds__grid {
      grid-template-columns: repeat(3, 1fr);
    }
  }

}
</style>
