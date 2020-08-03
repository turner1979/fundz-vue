<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'

@Component
export default class FdzNumberFormatterMixin extends Vue {
  formatCurrency (n: number): string {
    return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  }
}
</script>
