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
      <FdzMessage v-bind:options="{ text: ['Error Message'], type: 'error' }" />
      <FdzMessage v-bind:options="{ text: ['Info Message'], type: 'info' }" />
      <FdzMessage v-bind:options="{ text: ['Success Message'], type: 'success' }" />
      <div class="fdz-funds__grid">
        <FdzFundCard v-for="fund in funds" v-bind:fund="fund" :key="fund.id"></FdzFundCard>
      </div>
    </FdzContentContainer>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import FdzContentContainer from '../components/FdzContentContainer.vue'
import FdzFundCard from '../components/FdzFundCard.vue'
import FdzHeader from '../components/FdzHeader.vue'
import FdzIcon from '../components/FdzIcon.vue'
import FdzLoading from '../components/FdzLoading.vue'
import FdzMessage from '../components/FdzMessage.vue'
import FdzModal from '../components/FdzModal.vue'
import FdzVersion from '../components/FdzVersion.vue'
import { FdzFundModel } from '../models/fdz-fund.model'

@Component({
  components: {
    FdzContentContainer,
    FdzFundCard,
    FdzHeader,
    FdzIcon,
    FdzLoading,
    FdzMessage,
    FdzModal,
    FdzVersion
  }
})
export default class FdzFunds extends Vue {
  addFundModalVisible = false;

  funds: FdzFundModel[] = [
    {
      id: 'rdk0c4fi61',
      colour: {
        name: 'redSalsa',
        colour: '#F94144'
      },
      current: 0,
      name: 'Ferrari',
      target: 90000
    },
    {
      id: 'wewweue',
      colour: {
        name: 'queenBlue',
        colour: '#577590'
      },
      current: 20000,
      name: 'Aston Martin',
      target: 100000
    }
  ];

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
