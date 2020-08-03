<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'

@Component
export default class FdzTokenHelperMixin extends Vue {
  generateToken () {
    return Math.random().toString(36).substr(2)
  }
}
</script>
