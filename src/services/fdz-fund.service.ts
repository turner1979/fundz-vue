import { store } from '../store/store'
import { LsKeys } from '../enums'
import { FdzFundModel, FdzColourModel } from '../models'

export class FdzFundService {
  getFund (id: string): FdzFundModel {
    return store.funds.filter(f => f.id === id)[0]
  }

  addFund (fund: FdzFundModel): Promise<void> {
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
      localStorage.setItem(LsKeys.Funds, JSON.stringify(funds))
    }
  }
}
