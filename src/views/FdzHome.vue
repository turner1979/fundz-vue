<template>
  <div class="fdz-home">
    <div class="fdz-home__content">
      <FdzLogo class="fdz-home__logo" alt />
      <FdzVersion class="fdz-home__version" />
      <router-link class="fdz-home__button" :to="{ name: 'funds' }">
        <FdzButton text="View App" type="button" />
      </router-link>
      <FdzFooter />
    </div>
  </div>
</template>

<script>
import FdzButton from '@/components/FdzButton.vue'
import FdzFooter from '@/components/FdzFooter.vue'
import FdzLogo from '@/components/FdzLogo.vue'
import FdzVersion from '@/components/FdzVersion.vue'

export default {
  name: 'Home',
  components: {
    FdzButton,
    FdzFooter,
    FdzLogo,
    FdzVersion
  }
}
</script>

<style scoped lang="scss">
.fdz-home {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  .fdz-home__content {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 100%;

    .fdz-home__logo {
      margin-bottom: 16px;;
    }

    .fdz-home__button {
      width: 100%;
      max-width: 300px;
    }

    .fdz-home__version {
      margin: 0 16px 0;
    }

  }
}
</style>
