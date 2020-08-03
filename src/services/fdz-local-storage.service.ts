import { LsKeys } from '../enums'
import { FdzFundModel } from '../models'

export class FdzLocalStorageService {
  getFunds (): FdzFundModel[] {
    const funds: FdzFundModel[] = []
    if (localStorage && localStorage.getItem(LsKeys.Funds) !== null) {
      const str = localStorage.getItem(LsKeys.Funds)
      if (str) {
        JSON.parse(str).map((fund: FdzFundModel) => funds.push(fund))
      }
    }
    return funds
  }

  saveFunds (funds: FdzFundModel[]): void {
    if (localStorage) {
      localStorage.setItem(LsKeys.Funds, JSON.stringify(funds))
    }
  }
}
