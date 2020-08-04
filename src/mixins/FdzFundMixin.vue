<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { FdzLsKeysEnum } from '../enums'
import { FdzColourModel, FdzFundModel, FdzFundContributionModel } from '../models'
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

  addContribution (fund: FdzFundModel, contribution: FdzFundContributionModel): Promise<void> {
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        if (!fund.contributions) {
          fund.contributions = []
        }
        fund.contributions.push(contribution)
        fund.current = this.getContributionsTotalValue(fund)
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

  getContributionsTotalValue (fund: FdzFundModel): number {
    let totalContributions = 0
    if (typeof fund.contributions !== 'undefined') {
      fund.contributions.map((contribution) => { totalContributions += Number(contribution.amount) })
    }
    return totalContributions
  }
}
</script>
