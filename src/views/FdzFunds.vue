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
        <FdzAddFundForm @fund-added="onSetAddFundModalVisible(false)" />
      </FdzModal>

      <FdzLoading v-if="loading"></FdzLoading>
      <div v-else class="fdz-funds__grid">
        <FdzFundCard
          v-for="fund in funds"
          v-bind:fund="fund"
          :key="fund.id"
          @edit-fund="onEditFund($event)"
          @delete-fund="onDeleteFund($event)">
          <FdzFundProgress v-bind:fund="fund" />
        </FdzFundCard>
      </div>

      <FdzFooter />

    </FdzContentContainer>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import VueRouter from 'vue-router'
import { store } from '../store/store'
import FdzAddFundForm from '../components/FdzAddFundForm.vue'
import FdzContentContainer from '../components/FdzContentContainer.vue'
import FdzFooter from '../components/FdzFooter.vue'
import FdzFundCard from '../components/FdzFundCard.vue'
import FdzFundProgress from '../components/FdzFundProgress.vue'
import FdzHeader from '../components/FdzHeader.vue'
import FdzIcon from '../components/FdzIcon.vue'
import FdzLoading from '../components/FdzLoading.vue'
import FdzMessage from '../components/FdzMessage.vue'
import FdzModal from '../components/FdzModal.vue'
import FdzVersion from '../components/FdzVersion.vue'
import { FdzFundModel } from '../models'
import { FdzFundService } from '../services'

Vue.use(VueRouter)
const fundService = new FdzFundService()

@Component({
  components: {
    FdzAddFundForm,
    FdzContentContainer,
    FdzFooter,
    FdzFundCard,
    FdzFundProgress,
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

  funds: FdzFundModel[] = store.funds;
  loading = false;

  onBackClick (): void {
    this.$router.push('/')
  }

  onSetAddFundModalVisible (state: boolean) {
    this.addFundModalVisible = state
  }

  onEditFund (fund: FdzFundModel) {
    this.$router.push({ name: 'fund', params: { id: fund.id } })
  }

  onDeleteFund (fund: FdzFundModel) {
    this.loading = true
    fundService.deleteFund(fund).then(() => {
      this.loading = false
      this.funds = store.funds
    }).catch(() => {
      // Real world example would display error message in UI
    })
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
