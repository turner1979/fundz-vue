<template>
  <div class="fdz-footer">
    <p>Copyright &copy; {{ year === startYear ? startYear : startYear + ' - ' + year }}</p>
    <a href="http://www.scottturner.co.uk" target="_blank">www.scottturner.co.uk</a>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class FdzFooter extends Vue {
  startYear = 2020
  year = new Date().getFullYear()
}
</script>

<style scoped lang="scss">
@import '@/styles/fdz-styles';

.fdz-footer {
  text-align: center;

  p, a {
    @include fdz-font(14);
    margin-bottom: 0;
  }

  a {
    text-decoration: underline;
    &:hover {
      text-decoration: none;
    }
  }
}
</style>
