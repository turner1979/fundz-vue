import Vue from 'vue'
import { LsKeys } from '@/enums/ls-keys.enum'
import { FdzFundModel } from '@/models/fdz-fund.model'

// Get funds data from localstorage
const funds: FdzFundModel[] = []
if (localStorage && localStorage.getItem(LsKeys.Funds) !== null) {
  const str = localStorage.getItem(LsKeys.Funds)
  if (str) {
    JSON.parse(str).map((fund: FdzFundModel) => funds.push(fund))
  }
}

// Funds from local storage are set in simple store (vuex could be used for larger apps)
export const store = Vue.observable({ funds })