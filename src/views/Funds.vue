<template>
  <div class="fdz-funds">
    <FdzHeader />
    <FdzContentContainer>
      <FdzVersion class="fdz-funds__version" />
      <div class="fdz-funds__controls">
        <FdzIcon iconClass="fas fa-chevron-left" @click.native="onClick" />
        <FdzIcon iconClass="fas fa-plus" />
      </div>
    </FdzContentContainer>
  </div>
</template>

<script lang="ts">
import FdzContentContainer from '../components/FdzContentContainer.vue'
import FdzHeader from '../components/FdzHeader.vue'
import FdzIcon from '../components/FdzIcon.vue'
import FdzVersion from '../components/FdzVersion.vue'

export default {
  name: 'Funds',
  components: {
    FdzContentContainer,
    FdzHeader,
    FdzIcon,
    FdzVersion
  },
  methods: {
    onClick: function () {
      this.$router.push({ path: '/' })
    }
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
