import { store } from '../store/store'
import { LsKeys } from '../enums/ls-keys.enum'
import { FdzFundModel } from '../models/fdz-fund.model'

export class FdzFundService {
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
