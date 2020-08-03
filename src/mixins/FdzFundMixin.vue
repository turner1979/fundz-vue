<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { FdzLsKeysEnum } from '../enums'
import { FdzColourModel, FdzFundModel } from '../models'
import { store } from '../store/store'

@Component
export default class FdzFundMixin extends Vue {
  getFund (id: string): FdzFundModel {
    return store.funds.filter(f => f.id === id)[0]
  }

  addNewFund (fund: FdzFundModel): Promise<void> {
    return new Promise((resolve) => {
      setTimeout(() => {
        store.funds.push(fund)
        this.saveFundsToLocalStorage(store.funds)
        resolve()
      }, 500)
    })
  }

  editFund (fund: FdzFundModel, colour: FdzColourModel, name: string, target: number): Promise<void> {
    return new Promise((resolve) => {
      setTimeout(() => {
        fund.colour = colour
        fund.name = name
        fund.target = target
        this.saveFundsToLocalStorage(store.funds)
        resolve()
      }, 500)
    })
  }

  deleteFund (fund: FdzFundModel): Promise<void> {
    return new Promise((resolve) => {
      setTimeout(() => {
        store.funds = store.funds.filter(f => f.id !== fund.id)
        this.saveFundsToLocalStorage(store.funds)
        resolve()
      }, 500)
    })
  }

  saveFundsToLocalStorage (funds: FdzFundModel[]): void {
    if (localStorage) {
      localStorage.setItem(FdzLsKeysEnum.Funds, JSON.stringify(funds))
    }
  }
}
</script>
