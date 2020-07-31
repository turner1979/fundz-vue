import { store } from '../store/store'
import { LsKeys } from '../enums'
import { FdzFundModel } from '../models'

export class FdzFundService {
  getFund (id: string): FdzFundModel {
    return store.funds.filter(f => f.id === id)[0]
  }

  addFund (fund: FdzFundModel): Promise<void> {
    return new Promise((resolve) => {
      setTimeout(() => {
        store.funds.push(fund)
        if (localStorage) {
          localStorage.setItem(LsKeys.Funds, JSON.stringify(store.funds))
        }
        resolve()
      }, 500)
    })
  }

  deleteFund (fund: FdzFundModel): Promise<void> {
    return new Promise((resolve) => {
      setTimeout(() => {
        store.funds = store.funds.filter(f => f.id !== fund.id)
        if (localStorage) {
          localStorage.setItem(LsKeys.Funds, JSON.stringify(store.funds))
        }
        resolve()
      }, 500)
    })
  }
}
