import { store } from '../store/store'
import { FdzFundModel, FdzColourModel } from '../models'
import { FdzLocalStorageService } from '../services'

export class FdzFundService {
  private _localStorageService = new FdzLocalStorageService()

  getFund (id: string): FdzFundModel {
    return store.funds.filter(f => f.id === id)[0]
  }

  addFund (fund: FdzFundModel): Promise<void> {
    return new Promise((resolve) => {
      setTimeout(() => {
        store.funds.push(fund)
        this._localStorageService.saveFunds(store.funds)
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
        this._localStorageService.saveFunds(store.funds)
        resolve()
      }, 500)
    })
  }

  deleteFund (fund: FdzFundModel): Promise<void> {
    return new Promise((resolve) => {
      setTimeout(() => {
        store.funds = store.funds.filter(f => f.id !== fund.id)
        this._localStorageService.saveFunds(store.funds)
        resolve()
      }, 500)
    })
  }
}
