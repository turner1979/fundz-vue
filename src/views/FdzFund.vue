<template>
  <div class="fdz-fund">
    <FdzHeader />
    <FdzContentContainer>
      <FdzVersion class="fdz-fund__version" />
      <div class="fdz-fund__controls">
        <FdzIcon iconClass="fas fa-chevron-left" @click.native="onBackClick" />
      </div>
      <FdzFundCard v-bind:fund="fund" :show-edit="false">
        <FdzFundProgress v-bind:fund="fund" />
        TODO: tabs
      </FdzFundCard>
    </FdzContentContainer>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import VueRouter from 'vue-router'
import FdzFundCard from '../components/FdzFundCard.vue'
import FdzContentContainer from '../components/FdzContentContainer.vue'
import FdzHeader from '../components/FdzHeader.vue'
import FdzIcon from '../components/FdzIcon.vue'
import FdzFundProgress from '../components/FdzFundProgress.vue'
import FdzVersion from '../components/FdzVersion.vue'
import { FdzFundModel } from '../models/fdz-fund.model'

@Component({
  components: {
    FdzFundCard,
    FdzContentContainer,
    FdzHeader,
    FdzIcon,
    FdzFundProgress,
    FdzVersion
  }
})
export default class FdzFund extends Vue {
  @Prop() id!: string

  // TODO: retrieve correct fund based on the id prop, fund data hardcoded for now
  fund: FdzFundModel = {
    id: 'rdk0c4fi61',
    colour: {
      name: 'redSalsa',
      colour: '#F94144'
    },
    current: 0,
    name: 'Ferrari',
    target: 90000
  }

  onBackClick () {
    this.$router.push('/funds')
  }
}
</script>

<style scoped lang="scss">
@import '@/styles/fdz-styles';

.fdz-fund {
  height: 100%;

  .fdz-fund__version + .fdz-fund__controls {
    margin-top: 16px;
  }

  .fdz-fund__controls {
    display: flex;
    justify-content: space-between;
    margin-bottom: 16px;
  }
}
</style>
