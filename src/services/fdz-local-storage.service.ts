import { LsKeys } from '../enums'
import { FdzFundModel } from '../models'

export class FdzLocalStorageService {
  getFunds () {
    // TODO
  }

  saveFunds (funds: FdzFundModel[]) {
    if (localStorage) {
      localStorage.setItem(LsKeys.Funds, JSON.stringify(funds))
    }
  }
}
