<template>
  <div class="fdz-footer">
    <p>Copyright &copy; TODO: year</p>
    <a href="http://www.scottturner.co.uk" target="_blank">www.scottturner.co.uk</a>
  </div>
</template>

<script lang="ts">
export default {

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
